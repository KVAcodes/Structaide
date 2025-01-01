/**
 * The Beam class handles the creation of the beam object as well as it's analysis.
 */
import { BeamData } from "./uiInput";
import { BeamElement } from "./beamElement";
import Load from "./load";
import Length from "./length";
import { DistributedLoad } from "./distributedLoad";
import Moment from "./moment";
import Rotation from "./rotation";
import { FlexuralRigidity } from "./flexuralRigidity";
import { YoungModulus } from "./youngModulus";
import { MomentOfInertia } from "./momentOfInertia";

export class Beam {
  private _data: BeamData;
  private elements: BeamElement[];
  private totalDegreesOfFreedom: number;

  /**
   * Constructor for the Beam class.
   *
   * @param {BeamData} data The input data for the beam analysis.
   */
  constructor(data: BeamData) {
    this._data = deepCopy(data);
    this.elements = [];
    this.totalDegreesOfFreedom = this.data.boundaryConditions.length * 2;
    this.resolveUnits();
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
      moment.magnitude = this.data.isMetric
        ? moment.isClockwise
          ? -momentObject.valueInKNm
          : momentObject.valueInKNm
        : moment.isClockwise
        ? -momentObject.valueInLbfIn
        : momentObject.valueInLbfIn;
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
   * @returns {BeamElement[]} The beam elements
   */
  private splitIntoBeamElements(): BeamElement[] {
    const beamElements: BeamElement[] = [];

    for (let i = 0; i < this.data.noOfSpans; i++) {
      const beamElementData = this.createBeamElementData(i);
      this.processPointLoads(beamElementData);
      this.processDistributedLoads(beamElementData);
      this.processMoments(beamElementData);
      beamElements.push(new BeamElement(beamElementData));
    }
    return beamElements;
  }

  /**
   * helper function to splitIntoBeamElements - creates beamElement data
   * @param spanIndex
   * @returns {any} The beam element data
   */
  private createBeamElementData(spanIndex: number): any {
    const elementData: any = {
      isMetric: this.data.isMetric,
      spanNo: spanIndex + 1,
      start: this.data.boundaryConditions[spanIndex].position,
      end: this.data.boundaryConditions[spanIndex + 1].position,
    };
    elementData.length = elementData.end - elementData.start;
    elementData.section = this.createFlexuralRigidity(spanIndex);
    elementData.boundaries = [
      this.data.boundaryConditions[spanIndex],
      this.data.boundaryConditions[spanIndex + 1],
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
   */
  private processPointLoads(beamElementData: any): void {
    if (this.data.loads?.pointLoads?.length) {
      // filter the point loads for the span
      beamElementData.pointLoads = this.data.loads.pointLoads.filter(
        (pointLoad) =>
          this.isLoadWithinElement(
            pointLoad.location,
            beamElementData.start,
            beamElementData.end
          )
      );
      // Remove the filtered point loads from the main list
      this.data.loads.pointLoads = this.data.loads.pointLoads.filter(
        (pointLoad) =>
          !this.isLoadWithinElement(
            pointLoad.location,
            beamElementData.start,
            beamElementData.end
          )
      );
    }
  }

  /**
   * helper function to the splitIntoBeamElements - filters the moments for the span
   * @param beamElementData
   */
  private processMoments(beamElementData: any): void {
    if (this.data.loads?.moments?.length) {
      // filter the moments for the span
      beamElementData.moments = this.data.loads.moments.filter((moment) =>
        this.isLoadWithinElement(
          moment.location,
          beamElementData.start,
          beamElementData.end
        )
      );
      // Remove the filtered moments from the main list
      this.data.loads.moments = this.data.loads.moments.filter(
        (moment) =>
          !this.isLoadWithinElement(
            moment.location,
            beamElementData.start,
            beamElementData.end
          )
      );
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
    const newLoad = { ...load };

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
        if (newLoad.startMag === 0) {
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
        if (newLoad.endMag === 0) {
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
   * getter for the beam data
   * @returns {BeamData} The beam data
   */
  get data(): BeamData {
    return this._data;
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
