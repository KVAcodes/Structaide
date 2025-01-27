/**
 * The Beam class handles the creation of the beam object as well as it's analysis.
 */
import { BeamData, Moments, PointLoads } from "./uiInput";
import { BeamElement } from "./beamElement";
import Load from "./load";
import Length from "./length";
import { DistributedLoad } from "./distributedLoad";
import Moment from "./moment";
import Rotation from "./rotation";
import { FlexuralRigidity } from "./flexuralRigidity";
import { YoungModulus } from "./youngModulus";
import { MomentOfInertia } from "./momentOfInertia";
import Matrix from "./matrices";
import { conjugateGradient } from "./numericalMethods";

export class Beam {
  private _data: BeamData;
  private elements: BeamElement[];
  private totalDegreesOfFreedom: number;
  private globalStiffnessMatrix: Matrix;
  private globalNodalForceVector: Matrix;
  private globalEquivalentForceVector: Matrix;
  private globalDisplacementVector: Matrix;
  private unknownDisplacements: (1 | null)[]; // Helps the global Displacement vector keep track of the displacements to be solved for, 1 for unknown, null for known
  public reactions: Matrix; // The reactions at the supports
  public solvedDisplacements: number[]; // The solved displacements
  /**
   * Constructor for the Beam class.
   *
   * @param {BeamData} data The input data for the beam analysis.
   */
  constructor(data: BeamData, iteration: number = 1) {
    this._data = deepCopy(data);
    this.elements = [];
    this.totalDegreesOfFreedom = this.data.boundaryConditions.length * 2;
    this.globalStiffnessMatrix = new Matrix(
      this.totalDegreesOfFreedom,
      this.totalDegreesOfFreedom,
      0
    );
    this.globalNodalForceVector = new Matrix(this.totalDegreesOfFreedom, 1, 0);
    this.globalEquivalentForceVector = new Matrix(
      this.totalDegreesOfFreedom,
      1,
      0
    );
    this.globalDisplacementVector = new Matrix(
      this.totalDegreesOfFreedom,
      1,
      0
    );
    this.reactions = new Matrix(this.totalDegreesOfFreedom, 1, 0);
    this.solvedDisplacements = [];
    this.resolveUnits();
    this.elements = this.splitIntoBeamElements(iteration);
    this.assembleGlobalStiffnessMatrix();
    this.assembleGlobalNodalForceVector();
    this.assembleGlobalEquivalentForceVector();
    this.assembleGlobalDisplacementVector();
    this.unknownDisplacements = this.populateUnknownDisplacements();
    this.solveForUnknownDisplacements();
    this.parseLocalDisplacementVector();
  }

  /**
   * Resolves the units to the base units for the beam analysis.
   */
  private resolveUnits(): void {
    this.resolveBeamLength();
    this.resolveLoadingUnits();
    this.resolveBoundaryConditions();
  }

  /**
   * helper function - resolves the beamLength unit to the base unit
   */
  private resolveBeamLength(): void {
    const beamLengthObject = new Length(
      this.data.beamLength.value,
      this.data.beamLength.unit
    );
    this.data.beamLength.value = this.data.isMetric
      ? beamLengthObject.meters
      : beamLengthObject.inches;
  }

  /**
   * helper function - resolves Loading units to base units
   */
  private resolveLoadingUnits(): void {
    // for point loads
    this.data.loads?.pointLoads?.forEach((load) => {
      // magnitude resolution
      const loadObject = new Load(load.magnitude, load.unit);
      load.magnitude = this.data.isMetric
        ? loadObject.valueInKN
        : loadObject.valueInLbf;
      // position resolution
      const positionObject = new Length(
        load.location,
        this.data.beamLength.unit
      );
      load.location = this.data.isMetric
        ? positionObject.meters
        : positionObject.inches;
    });
    // for distributed loads
    this.data.loads?.distributedLoads?.forEach((load) => {
      // magnitude resolution
      let loadObject = new DistributedLoad(load.startMag, load.unit);
      load.startMag = this.data.isMetric
        ? loadObject.valueInKNperM
        : loadObject.valueInLbPerIn;
      loadObject = new DistributedLoad(load.endMag, load.unit);
      load.endMag = this.data.isMetric
        ? loadObject.valueInKNperM
        : loadObject.valueInLbPerIn;
      // postion resolution
      const startPositionObject = new Length(
        load.start,
        this.data.beamLength.unit
      );
      load.start = this.data.isMetric
        ? startPositionObject.meters
        : startPositionObject.inches;
      const endPositionObject = new Length(load.end, this.data.beamLength.unit);
      load.end = this.data.isMetric
        ? endPositionObject.meters
        : endPositionObject.inches;
    });
    // for moments
    this.data.loads?.moments?.forEach((moment) => {
      // magnitude resolution
      const momentObject = new Moment(moment.magnitude, moment.unit);
      if (this.data.isMetric) {
        moment.magnitude = moment.isClockwise
          ? -momentObject.valueInKNm
          : momentObject.valueInKNm;
      } else {
        moment.magnitude = moment.isClockwise
          ? -momentObject.valueInLbfIn
          : momentObject.valueInLbfIn;
      }
      // position resolution
      const positionObject = new Length(
        moment.location,
        this.data.beamLength.unit
      );
      moment.location = this.data.isMetric
        ? positionObject.meters
        : positionObject.inches;
    });
  }

  /**
   * helper function - resolves Boundary Conditions units to base units
   */
  private resolveBoundaryConditions(): void {
    this.data.boundaryConditions.forEach((boundaryCondition) => {
      // position resolution
      const positionObject = new Length(
        boundaryCondition.position,
        this.data.beamLength.unit
      );
      boundaryCondition.position = this.data.isMetric
        ? positionObject.meters
        : positionObject.inches;
      // settlement resolution
      const settlementObject = new Length(
        boundaryCondition.settlement.value,
        boundaryCondition.settlement.unit
      );
      boundaryCondition.settlement.value = this.data.isMetric
        ? boundaryCondition.settlement.direction === "down"
          ? -settlementObject.meters
          : settlementObject.meters
        : boundaryCondition.settlement.direction === "down"
        ? -settlementObject.inches
        : settlementObject.inches;
      // rotation resolution
      const rotationObject = new Rotation(
        boundaryCondition.rotation.value,
        boundaryCondition.rotation.unit
      );
      boundaryCondition.rotation.value = boundaryCondition.rotation.isClockwise
        ? -rotationObject.valueInRadians
        : rotationObject.valueInRadians;
    });
  }

  /**
   * Creates the beam Elements
   *
   * @param {number} iteration first or second iteration for internal hinges
   * @returns {BeamElement[]} The beam elements
   */
  private splitIntoBeamElements(iteration: number): BeamElement[] {
    const beamElements: BeamElement[] = [];
    const pointLoads = deepCopy(this.data.loads?.pointLoads);
    const moments = deepCopy(this.data.loads?.moments);

    for (let i = 0; i < this.data.noOfSpans; i++) {
      const beamElementData = this.createBeamElementData(i, iteration);
      this.processPointLoads(beamElementData, pointLoads);
      this.processDistributedLoads(beamElementData);
      this.processMoments(beamElementData, moments);
      beamElements.push(new BeamElement(beamElementData));
    }
    return beamElements;
  }


  // how to handle internalHinges:
  // set a global lookout "iteration" variable
  // if the iteration is 1(1st iteration), when the creating beam data:
  //  any element with internalHinge at the right end of it should have a rightReleased stiffness matrix
  // any element with internalHinge at the left end of it should have a Normal stiffness matrix
  // if the iteration is 2(2nd iteration), when creating beam data:
  // any element with internalHinge at the left end of it should have a leftReleased stiffness matrix
  // any element with internalHinge at the right end of it should have a Normal stiffness matrix

  /**
   * helper function to splitIntoBeamElements - creates beamElement data
   * @param spanIndex
   * @param iteration
   * @returns {any} The beam element data
   */
  private createBeamElementData(spanIndex: number, iteration: number): any {
    const elementData: any = {
      isMetric: this.data.isMetric,
      spanNo: spanIndex + 1,
    };
    const leftBoundary = deepCopy(this.data.boundaryConditions[spanIndex]);
    const rightBoundary = deepCopy(this.data.boundaryConditions[spanIndex + 1]);
    if (iteration === 1) {
      if (leftBoundary.type === "internalHinge") {
        leftBoundary.type = "midSpan";
        elementData.start = leftBoundary.position;
      } else {
        elementData.start = leftBoundary.position;
      }
      elementData.end = rightBoundary.position;
    } else if (iteration === 2) {
      if (rightBoundary.type === "internalHinge") {
        rightBoundary.type = "midSpan";
        elementData.end = rightBoundary.position;
      } else {
        elementData.end = rightBoundary.position;
      }
      elementData.start = leftBoundary.position;
    }
    elementData.length = elementData.end - elementData.start;
    elementData.section = this.createFlexuralRigidity(spanIndex);
    elementData.boundaries = [
      leftBoundary,
      rightBoundary
    ];

    return elementData;
  }

  /**
   * helper function to createBeamElementData - creates a flexural rigidity object
   * @param spanIndex
   * @returns {any} The flexural rigidity object
   */
  public createFlexuralRigidity(spanIndex: number): FlexuralRigidity {
    const options: any = {};
    const sectionProperties = this.data.sectionProperties[spanIndex];

    options.YoungModulusObject = sectionProperties.youngModulus.value
      ? new YoungModulus(
          sectionProperties.youngModulus.value,
          sectionProperties.youngModulus.unit
        )
      : undefined;
    options.CoefficientOfE = sectionProperties.youngModulus.coefficient;

    options.MomentOfInertiaObject = sectionProperties.momentOfInertia.value
      ? new MomentOfInertia(
          sectionProperties.momentOfInertia.value,
          sectionProperties.momentOfInertia.unit
        )
      : undefined;
    options.CoefficientOfI = sectionProperties.momentOfInertia.coefficient;

    return new FlexuralRigidity(options);
  }

  /**
   * helper function to splitIntoBeamElements - filters the point loads for the span
   * @param beamElementData
   * @param pointLoads
   */
  private processPointLoads(
    beamElementData: any,
    pointLoads: PointLoads[] | undefined
  ): void {
    if (pointLoads?.length) {
      // filter the point loads for the span
      beamElementData.pointLoads = pointLoads.filter((pointLoad) =>
        this.isLoadWithinElement(
          pointLoad.location,
          beamElementData.start,
          beamElementData.end
        )
      );
      // Remove the filtered point loads from the main list: IN PLACE
      for (let i = 0; i < pointLoads.length; i++) {
        if (
          this.isLoadWithinElement(
            pointLoads[i].location,
            beamElementData.start,
            beamElementData.end
          )
        ) {
          pointLoads.splice(i, 1);
          i--;
        }
      }

    } 
  }

  /**
   * helper function to the splitIntoBeamElements - filters the moments for the span
   * @param beamElementData
   */
  private processMoments(
    beamElementData: any,
    moments: Moments[] | undefined
  ): void {
    if (moments?.length) {
      // filter the moments for the span
      beamElementData.moments = moments.filter((moment) =>
        this.isLoadWithinElement(
          moment.location,
          beamElementData.start,
          beamElementData.end
        )
      );
      // Remove the filtered moments from the main list IN PLACE
      for (let i = 0; i < moments.length; i++) {
        if (
          this.isLoadWithinElement(
            moments[i].location,
            beamElementData.start,
            beamElementData.end
          )
        ) {
          moments.splice(i, 1);
          i--;
        }
      }
    }
  }

  /**
   * helper function to processPointLoads - return true if the point load is within the span
   * @param position
   * @param start
   * @param end
   * @returns {boolean} True if the point load is within the span
   */
  private isLoadWithinElement(
    position: number,
    start: number,
    end: number
  ): boolean {
    return position >= start && position <= end;
  }

  /**
   * helper function to splitIntoBeamElements - filters the distributed loads for the span
   * @param beamElementData
   */
  private processDistributedLoads(beamElementData: any): void {
    if (this.data.loads?.distributedLoads?.length) {
      const filteredLoads = this.data.loads.distributedLoads.filter((load) =>
        this.isDistributedLoadRelevant(
          load,
          beamElementData.start,
          beamElementData.end
        )
      );
      // trim the distributed loads to the span
      beamElementData.distributedLoads = filteredLoads.map((load) =>
        this.trimDistributedLoad(
          load,
          beamElementData.start,
          beamElementData.end
        )
      );
    }
  }

  /**
   * helper function to processDistributedLoads - return true if the distributed load is within the span
   * @param load
   * @param start
   * @param end
   */
  private isDistributedLoadRelevant(
    load: any,
    start: number,
    end: number
  ): boolean {
    return (
      (load.start >= start && load.end <= end) ||
      (load.start >= start && load.end > end && load.start < end) ||
      (load.start < start && load.end <= end && load.end > start) ||
      (load.start < start && load.end > end)
    );
  }

  /**
   * helper function to processDistributedLoads - trims the distributed load to the span
   * @param load
   * @param start
   * @param end
   */
  private trimDistributedLoad(load: any, start: number, end: number): any {
    const newLoad = deepCopy(load);

    if (load.start >= start && load.end <= end) {
      return newLoad;
    }

    if (load.start >= start && load.end > end && load.start < end) {
      newLoad.end = end;
      this.adjustLoadMagnitude(newLoad, load, "end");
    } else if (load.start < start && load.end <= end && load.end > start) {
      newLoad.start = start;
      this.adjustLoadMagnitude(newLoad, load, "start");
    } else if (load.start < start && load.end > end) {
      newLoad.start = start;
      newLoad.end = end;
      this.adjustLoadMagnitude(newLoad, load, "both");
    }

    return newLoad;
  }

  /**
   * helper function to trimDistributedLoad - adjusts the magnitude for the trimmed distributed load
   * @param newLoad
   * @param originalLoad
   * @param adjustType
   */
  private adjustLoadMagnitude(
    newLoad: any,
    originalLoad: any,
    adjustType: "start" | "end" | "both"
  ): void {
    // UDLs need no adjustment
    if (newLoad.startMag == newLoad.endMag) return; // expects on numeric values

    const x2 = originalLoad.end - originalLoad.start;

    if (adjustType === "end" || adjustType === "both") {
      if (newLoad.startMag < newLoad.endMag) {
        if (originalLoad.startMag === 0) {
          const x1 = newLoad.end - originalLoad.start;
          const y2 = originalLoad.endMag;
          newLoad.endMag = (x1 * y2) / x2;
        } else {
          const x1 = newLoad.end - originalLoad.start;
          const y2 = originalLoad.endMag - newLoad.startMag;
          const y1 = (x1 * y2) / x2;
          newLoad.endMag = newLoad.startMag + y1;
        }
      } else if (newLoad.startMag > newLoad.endMag) {
        if (originalLoad.endMag === 0) {
          const x1 = originalLoad.end - newLoad.end;
          const y2 = originalLoad.startMag;
          newLoad.endMag = (x1 * y2) / x2;
        } else {
          const x1 = originalLoad.end - newLoad.end;
          const y2 = originalLoad.startMag - originalLoad.endMag;
          const y1 = (x1 * y2) / x2;
          newLoad.endMag = originalLoad.endMag + y1;
        }
      }
    }

    if (adjustType === "start" || adjustType === "both") {
      if (newLoad.startMag < newLoad.endMag) {
        if (originalLoad.startMag === 0) {
          const x1 = newLoad.start - originalLoad.start;
          const y2 = originalLoad.endMag;
          newLoad.startMag = (x1 * y2) / x2;
        } else {
          const x1 = newLoad.start - originalLoad.start;
          const y2 = originalLoad.endMag - originalLoad.startMag;
          const y1 = (x1 * y2) / x2;
          newLoad.startMag = originalLoad.startMag + y1;
        }
      } else if (newLoad.startMag > newLoad.endMag) {
        if (originalLoad.endMag === 0) {
          const x1 = originalLoad.end - newLoad.start;
          const y2 = originalLoad.startMag;
          newLoad.startMag = (x1 * y2) / x2;
        } else {
          const x1 = originalLoad.end - newLoad.start;
          const y2 = originalLoad.startMag - newLoad.endMag;
          const y1 = (x1 * y2) / x2;
          newLoad.startMag = newLoad.endMag + y1;
        }
      }
    }
  }

  /**
   * Assembles the global stiffness matrix for the beam
   */
  private assembleGlobalStiffnessMatrix(): void {
    // Loop through each beam element
    this.elements.forEach((element) => {
      let localStiffnessMatrix = element.stiffnessMatrices.normal;
      if (element.stiffnessMatrices.leftReleased) {
        localStiffnessMatrix = element.stiffnessMatrices.leftReleased;
      } else if (element.stiffnessMatrices.rightReleased) {
        localStiffnessMatrix = element.stiffnessMatrices.rightReleased;
      }
      // Get the global DOF indices for the element
      const globalDOF = element.dofLabels.global;

      // Assemble the local stiffness matrix into the global stiffness matrix
      for (let i = 0; i < localStiffnessMatrix.rows; i++) {
        for (let j = 0; j < localStiffnessMatrix.cols; j++) {
          const globalI = globalDOF[i];
          const globalJ = globalDOF[j];
          const localValue = localStiffnessMatrix.get(i, j);

          // Add the local stiffness matrix value to the global stiffness matrix
          const currentGlobalValue =
            this.globalStiffnessMatrix.get(globalI, globalJ) || 0;

          const newValue = currentGlobalValue + localValue;
          this.globalStiffnessMatrix.set(globalI, globalJ, newValue);
        }
      }
    });
  }

  /**
   * Assembles the global nodal force vector for the beam
   *
   */
  private assembleGlobalNodalForceVector(): void {
    this.elements.forEach((element) => {
      const localNodalForceVector = element.localNodalForceVector;
      const globalDOF = element.dofLabels.global;

      if (localNodalForceVector) {
        for (let i = 0; i < localNodalForceVector.rows; i++) {
          const globalI = globalDOF[i];
          const localValue = localNodalForceVector.get(i, 0);

          const currentGlobalValue =
            this.globalNodalForceVector.get(globalI, 0) || 0;

          const newValue = currentGlobalValue + localValue;
          this.globalNodalForceVector.set(globalI, 0, newValue);
        }
      }
    });
  }

  /**
   * Assembles the global equivalent force vector for the beam
   */
  private assembleGlobalEquivalentForceVector(): void {
    this.elements.forEach((element) => {
      const localEquivalentForceVector = element.localEquivalentForceVector;
      const globalDOF = element.dofLabels.global;

      if (localEquivalentForceVector) {
        for (let i = 0; i < localEquivalentForceVector.rows; i++) {
          const globalI = globalDOF[i];
          const localValue = localEquivalentForceVector.get(i, 0);

          const currentGlobalValue =
            this.globalEquivalentForceVector.get(globalI, 0) || 0;

          const newValue = currentGlobalValue + localValue;
          this.globalEquivalentForceVector.set(globalI, 0, newValue);
        }
      }
    });
  }

  /**
   * Assembles the global displacement vector for the beam
   */
  public assembleGlobalDisplacementVector(): void {
    // setting the displacements for each boundary condition
    this.data.boundaryConditions.forEach((boundaryCondition, index) => {
      const globalDOF = [index * 2, index * 2 + 1];

      const verticalDisplacement = boundaryCondition.settlement.value;
      const rotation = boundaryCondition.rotation.value;

      // set known displacements
      this.globalDisplacementVector.set(globalDOF[0], 0, verticalDisplacement);
      this.globalDisplacementVector.set(globalDOF[1], 0, rotation);
    });
  }

  /**
   * Populates the unknownDisplacements array with the unknown displacement positions
   * @returns {(1 | null)[]} The unknown displacements positions
   */
  private populateUnknownDisplacements(): (1 | null)[] {
    const unknowns = new Array(this.totalDegreesOfFreedom).fill(null);

    this.data.boundaryConditions.forEach((boundaryCondition, index) => {
      const globalDOF = [index * 2, index * 2 + 1];
      switch (boundaryCondition.type) {
        case "fixed":
          break;
        case "pinned":
        case "roller":
          if (!boundaryCondition.rotation.set) {
            unknowns[globalDOF[1]] = 1;
          }
          break;
        case "midSpan":
        case "internalHinge":
        case "freeEnd":
          if (!boundaryCondition.settlement.set) {
            unknowns[globalDOF[0]] = 1;
          }
          if (!boundaryCondition.rotation.set) {
            unknowns[globalDOF[1]] = 1;
          }
          break;
      }
    });

    return unknowns;
  }

  /**
   * solves for the unknown displacements
   *
   */
  private solveForUnknownDisplacements(): void {
    // From the Force Displacement equation, F = K * d - F_eq
    // where F is the global nodal force vector, K is the global stiffness matrix, d is the global displacement vector, F_eq is the global equivalent force vector
    // therefore, F + F_eq = K * d

    // F + F_eq
    const globalForceVector = Matrix.add(
      this.globalNodalForceVector,
      this.globalEquivalentForceVector
    );

    // To determine the equations used to determine the unknown displacements,
    // We partition K, d, and (F + F_eq) based on the unknown displacements
    // ...
    // In cases where the displacements for some DOFs are known and non-zero, we need to adjust the global force vector to balance out the equations
    // Adjusting the global force vector would involce subtracting a PRODUCT from it
    // PRODUCT:
    // - The first item of the product is the partition of the rows of the stiffness matrix corresponding to the unknown displacements
    // * The partition of the rows is done such that the columns in the rows corresponding to the unknown displacement are removed
    // - The second item of the product is the partition of the global displacement vector, done such that only the known displacements are retained

    const rowsAndColsToRemove: number[] = [];
    const rowOrColumnToPartition: number[] = []; // for cases where the displacements for a DOF are known and non-zero

    this.unknownDisplacements.forEach((value, index) => {
      if (value !== 1) {
        rowsAndColsToRemove.push(index);
      } else {
        rowOrColumnToPartition.push(index);
      }
    });

    if (rowOrColumnToPartition.length) { // if there are unknown displacements
      const reducedStiffnessMatrix = this.globalStiffnessMatrix.strike(
        rowsAndColsToRemove,
        rowsAndColsToRemove
      );

      let reducedGlobalForceVector = globalForceVector.strike(
        rowsAndColsToRemove,
        []
      );

      // First item of the product
      const partedStiffnessMatrix = this.globalStiffnessMatrix
        .strike(rowsAndColsToRemove, [])
        .strike([], rowOrColumnToPartition);

      // Second item of the product
      const knownDisplacements = this.globalDisplacementVector.strike(
        rowOrColumnToPartition,
        []
      );

      // The product
      const product = Matrix.multiply(
        partedStiffnessMatrix,
        knownDisplacements
      );

      // Adjusting the global force vector by subtracting it from the product
      reducedGlobalForceVector = Matrix.subtract(
        reducedGlobalForceVector,
        product
      );

      // Solve for the unknown displacements using the conjugate gradient method
      const solvedDisplacements = conjugateGradient(
        reducedStiffnessMatrix.matrixData,
        reducedGlobalForceVector.matrixData.flat()
      );
      this.solvedDisplacements = solvedDisplacements;

      // Insert the solved displacements into the global displacement vector
      rowOrColumnToPartition.forEach((globalIndex, idx) => {
        this.globalDisplacementVector.set(
          globalIndex,
          0,
          solvedDisplacements[idx]
        );
      });
    }

    // find the reactions
    // reactions = K * d - (F + F_eq)
    this.reactions = Matrix.subtract(
      Matrix.multiply(
        this.globalStiffnessMatrix,
        this.globalDisplacementVector
      ),
      globalForceVector
    );
  }

  /**
   * getter for the beam data
   * @returns {BeamData} The beam data
   */
  get data(): BeamData {
    return this._data;
  }

  /**
   * getter for the beam elements
   * @returns {BeamElement[]} The beam elements
   */
  get beamElements(): BeamElement[] {
    return this.elements;
  }

  /**
   * parse the global displacement vector to the local element displacement vector
   * 
   */
  public parseLocalDisplacementVector(): void {
    this.elements.forEach((element) => {
      const localDisplacementVector = new Matrix(
        element.dofLabels.local.length,
        1,
        0
      );
      const globalDOF = element.dofLabels.global;
      element.dofLabels.local.forEach((localIndex, index) => {
        localDisplacementVector.set(index, 0, this.globalDisplacementVector.get(globalDOF[localIndex], 0));
      });
      element.setDisplacementVector(localDisplacementVector);
    });
  }

}

/**
 * creates a deep copy of any object
 *
 */
export function deepCopy<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(deepCopy) as unknown as T;
  }

  const copy = {} as T;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      (copy as any)[key] = deepCopy((obj as any)[key]);
    }
  }
  return copy;
}