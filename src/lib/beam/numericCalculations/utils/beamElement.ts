/**
 * The BeamElement Class handles the local operations of the beam element.
 */
import Matrix from "./matrices";
import { FlexuralRigidity } from "./flexuralRigidity";
import {
  BoundaryCondition,
  PointLoads,
  Moments,
  DistributedLoads,
} from "./uiInput";
import {
  adaptiveSimpsonsRule,
  buildFunction,
  assembleExpression,
} from "./calculus";
import { deepCopy } from "./beam";
/**
 * Represents the data been parsed into the beam Elements
 *
 * @interface
 */
export interface BeamElementDataInterface {
  isMetric: boolean;
  spanNo: number;
  start: number;
  end: number;
  length: number;
  section: FlexuralRigidity;
  boundaries: [BoundaryCondition, BoundaryCondition];
  pointLoads?: PointLoads[];
  distributedLoads?: DistributedLoads[];
  moments?: Moments[];
}

/**
 * Represents the possible stiffness Matrices a beam Element can have
 *
 * @interface
 */
interface StiffnessMatrices {
  normal: Matrix;
  leftReleased?: Matrix;
  rightReleased?: Matrix;
}

/**
 * Represents the Mapping of the local degrees of freedom to the global degrees of freedom of the beam Element
 *
 * @interface
 */
export interface DOFMapping {
  local: number[];
  global: number[];
}

export class BeamElement {
  private data: BeamElementDataInterface;
  public storedData: BeamElementDataInterface;
  public dofLabels: DOFMapping;
  public stiffnessMatrices: StiffnessMatrices;
  public localNodalForceVector: Matrix = new Matrix(4, 1);
  public localEquivalentForceVector: Matrix = new Matrix(4, 1);
  public localDisplacementVector: Matrix = new Matrix(4, 1);
  public localForces: Matrix = new Matrix(4, 1);

  constructor(beamElementData: BeamElementDataInterface) {
    this.data = beamElementData;
    this.storedData = deepCopy(beamElementData);
    this.dofLabels = this.setDOFLabels();

    // Initializing stiffnessMatrices with an empty object
    this.stiffnessMatrices = { normal: new Matrix(4, 4) };
    this.calculateStiffnessMatrices();
    this.getNodalForces();
    this.getEquivalentForceVector();
  }

  /**
   * Sets the values for the dofLabels based on the spanIndex]
   *
   * @returns {DOFMapping}
   */
  private setDOFLabels(): DOFMapping {
    const spanIndex = this.data.spanNo - 1;
    return {
      local: [0, 1, 2, 3],
      global: [
        2 * spanIndex,
        2 * spanIndex + 1,
        2 * spanIndex + 2,
        2 * spanIndex + 3,
      ],
    };
  }

  /**
   * Calculates the local stiffness matrices of the beam element
   */
  private calculateStiffnessMatrices(): void {
    const L = this.data.length;
    const EI = this.data.isMetric
      ? this.data.section.valueInKNm2
      : this.data.section.valueInLbin2;

    this.stiffnessMatrices.normal = this.calculateNormalStiffnessMatrix(L, EI);

    if (this.isNodeReleased("left")) {
      this.stiffnessMatrices.leftReleased =
        this.calculateLeftReleasedStiffnessMatrix(L, EI);
    }

    if (this.isNodeReleased("right")) {
      this.stiffnessMatrices.rightReleased =
        this.calculateRightReleasedStiffnessMatrix(L, EI);
    }
  }

  /**
   * Helper function to calculateStiffnessMatrices
   *
   * @param L - length of the beamElement
   * @param EI - Flexural Rigidity value of the beam Element
   * @returns the regular beam element stiffness matrix
   */
  private calculateNormalStiffnessMatrix(L: number, EI: number): Matrix {
    return Matrix.fromArray([
      [
        EI * (12 / L ** 3),
        EI * (6 / L ** 2),
        EI * (-12 / L ** 3),
        EI * (6 / L ** 2),
      ],
      [EI * (6 / L ** 2), EI * (4 / L), EI * (-6 / L ** 2), EI * (2 / L)],
      [
        EI * (-12 / L ** 3),
        EI * (-6 / L ** 2),
        EI * (12 / L ** 3),
        EI * (-6 / L ** 2),
      ],
      [EI * (6 / L ** 2), EI * (2 / L), EI * (-6 / L ** 2), EI * (4 / L)],
    ]);
  }

  /**
   * helper function to calculateStiffnessMatrices - returns true if node is released
   *
   * @param node - the node to check if it is released
   * @returns true if the node is released and false otherwise
   */
  private isNodeReleased(node: "left" | "right"): boolean {
    const boundaryCondition = this.data.boundaries[node === "left" ? 0 : 1];
    return boundaryCondition.type === "internalHinge";
  }

  /**
   * Helper function to calculateStiffnessMatrices
   *
   * @param L - length of the beamElement
   * @param EI - Flexural Rigidity value of the beam Element
   * @returns the left released beam element stiffness matrix
   */
  private calculateLeftReleasedStiffnessMatrix(L: number, EI: number): Matrix {
    return Matrix.fromArray([
      [EI * (3 / L ** 3), 0, EI * (-3 / L ** 3), EI * (3 / L ** 2)],
      [0, 0, 0, 0],
      [EI * (-3 / L ** 3), 0, EI * (3 / L ** 3), EI * (-3 / L ** 2)],
      [EI * (3 / L ** 2), 0, EI * (-3 / L ** 2), EI * (3 / L)],
    ]);
  }

  /**
   * Helper function to calculateStiffnessMatrices
   *
   * @param L - length of the beamElement
   * @param EI - Flexural Rigidity value of the beam Element
   * @returns - the right released beam element stiffness matrix
   */
  private calculateRightReleasedStiffnessMatrix(L: number, EI: number): Matrix {
    return Matrix.fromArray([
      [EI * (3 / L ** 3), EI * (3 / L ** 2), EI * (-3 / L ** 3), 0],
      [EI * (3 / L ** 2), EI * (3 / L), EI * (-3 / L ** 2), 0],
      [EI * (-3 / L ** 3), EI * (-3 / L ** 2), EI * (3 / L ** 3), 0],
      [0, 0, 0, 0],
    ]);
  }

  /**
   * Constructs the local nodal force vector of the beam element
   * The Form of the local nodal force vector is [f1, m1, f2, m2]
   * where f1 and f2 are the forces at the left and right nodes respectively
   * and m1 and m2 are the moments at the left and right nodes respectively
   *
   * Nodal forces/moments exist at the exact location of the boundaryconditions/nodes
   */
  private getNodalForces(): void {
    let nodalForce1: any = this.data?.pointLoads?.find(
      (pointLoad) => pointLoad.location === this.data.start
    );
    let nodalForce2: any = this.data?.pointLoads?.find(
      (pointLoad) => pointLoad.location === this.data.end
    );
    let nodalMoment1: any = this.data?.moments?.find(
      (moment) => moment.location === this.data.start
    );
    let nodalMoment2: any = this.data?.moments?.find(
      (moment) => moment.location === this.data.end
    );

    // remove found pointLoads and moments from the array
    if (nodalForce1) {
      this.data.pointLoads = this.data.pointLoads?.filter(
        (pointLoad) => pointLoad !== nodalForce1
      );
    }
    if (nodalForce2) {
      this.data.pointLoads = this.data.pointLoads?.filter(
        (pointLoad) => pointLoad !== nodalForce2
      );
    }
    if (nodalMoment1) {
      this.data.moments = this.data.moments?.filter(
        (moment) => moment !== nodalMoment1
      );
    }
    if (nodalMoment2) {
      this.data.moments = this.data.moments?.filter(
        (moment) => moment !== nodalMoment2
      );
    }

    const nodalForcesArray: number[][] = [
      [nodalForce1 ? -nodalForce1.magnitude : 0],
      [nodalMoment1 ? nodalMoment1.magnitude : 0],
      [nodalForce2 ? -nodalForce2.magnitude : 0],
      [nodalMoment2 ? nodalMoment2.magnitude : 0],
    ];

    this.localNodalForceVector = Matrix.fromArray(nodalForcesArray);
  }

  /**
   * Constructs the local equivalent force vector of the beam element
   * The Equivalent force vector is the effect of the forces within the span of the element on the nodes
   * The Form of the local equivalent force vector is [f1, m1, f2, m2]
   * where f1 and f2 are the effects of the element's forces on the nodes(negative of the Fixed end reactions)
   * and m1 and m2 are the rotational effects of the element's forces at the nodes(negative of the fixed end moments)
   */
  private getEquivalentForceVector(): void {
    // finding the simply supported reactions
    const [f1, f2] = this.applyEquilibriumEquations();
    // finding the fixed end moments
    let [m1, m2] = this.findFixedEndMoments();

    if (this.isNodeReleased("left")) {
      m1 = 0;
    }
    if (this.isNodeReleased("right")) {
      m2 = 0;
    }
    // forming the Equivalent force vector
    const equivalentForcesArray: number[][] = [[f1], [-m1], [f2], [-m2]];

    this.localEquivalentForceVector = Matrix.fromArray(equivalentForcesArray);
  }

  /**
   * helper function to getEquivalentForceVector
   * Applies the equilibrium equations to find the Fixed end reactions (f1, f2)
   * sign convention: downward forces and counterclockwise moments are positive
   */
  private applyEquilibriumEquations(): [number, number] {
    let f1: number;
    let f2: number;

    // checking if the element has a free end
    // if (this.data.boundaries[0].type === "freeEnd") {
    //   return [0, -this.summationofVerticalForces()];
    // }
    // if (this.data.boundaries[1].type === "freeEnd") {
    //   return [-this.summationofVerticalForces(), 0];
    // }

    // ∑(Ma) + f2*L  = 0; f2 = -∑(Ma)/L
    // NOTE: ∑(Ma) is the summation of moments at the left end including the Fixed end moments
    let [m1, m2] = this.findFixedEndMoments();
    if (this.isNodeReleased("left")) {
      m1 = 0;
    }
    if (this.isNodeReleased("right")) {
      m2 = 0;
    }
    f2 = -(this.summationOfMomentsAtLeftEnd() + m1 + m2) / this.data.length;

    // ∑(Fy) = 0; f1 = ∑(Fy) - f2
    f1 = this.summationofVerticalForces() - f2;

    return [-f1, -f2];
  }

  /**
   * helper function to applyEquilibriumEquations
   * ∑(Fy)
   */
  private summationofVerticalForces(): number {
    let sum: number = 0;
    // for point loads
    this.data.pointLoads?.forEach((load) => {
      sum += load.magnitude;
    });
    // for distributed loads
    this.data.distributedLoads?.forEach((load) => {
      if (load.startMag === load.endMag) {
        // for uniform distributed loads
        sum += load.startMag * (load.end - load.start);
      } else {
        // for non-uniform distributed loads
        if (load.startMag < load.endMag) {
          if (load.startMag === 0) {
            // for triangular loads
            const base = load.end - load.start;
            const height = load.endMag;
            const area = (base * height) / 2;
            sum += area;
          } else {
            // for trapezoidal loads
            const base = load.end - load.start;
            const triheight = load.endMag - load.startMag;
            const recheight = load.startMag;
            const triarea = (base * triheight) / 2;
            const recarea = base * recheight;
            sum += triarea + recarea;
          }
        }
        if (load.startMag > load.endMag) {
          if (load.endMag === 0) {
            // for triangular loads
            const base = load.end - load.start;
            const height = load.startMag;
            const area = (base * height) / 2;
            sum += area;
          } else {
            // for trapezoidal loads
            const base = load.end - load.start;
            const triheight = load.startMag - load.endMag;
            const recheight = load.endMag;
            const triarea = (base * triheight) / 2;
            const recarea = base * recheight;
            sum += triarea + recarea;
          }
        }
      }
    });

    return sum;
  }

  /**
   * helper function to applyEquilibriumEquations
   * ∑(Ma)
   */
  private summationOfMomentsAtLeftEnd(): number {
    let sum: number = 0;

    // for point loads
    this.data.pointLoads?.forEach((load) => {
      sum -= (load.location - this.data.start) * load.magnitude;
    });

    // for distributed loads
    this.data.distributedLoads?.forEach((load) => {
      if (load.startMag === load.endMag) {
        // for uniform distributed loads
        const midLoadpoint = (load.start + load.end) / 2;
        const midLoadToEnd = midLoadpoint - this.data.start;
        sum -= (load.end - load.start) * load.startMag * midLoadToEnd;
      } else {
        // for non-uniform distributed loads
        if (load.startMag < load.endMag) {
          if (load.startMag === 0) {
            const base = load.end - load.start;
            const height = load.endMag;
            const area = (base * height) / 2;
            const centroid = (2 / 3) * base + (load.start - this.data.start);
            sum -= area * centroid;
          } else {
            const base = load.end - load.start;
            const triheight = load.endMag - load.startMag;
            const recheight = load.startMag;
            const triarea = (base * triheight) / 2;
            const recarea = base * recheight;
            const tricentroid = (2 / 3) * base + (load.start - this.data.start);
            const reccentroid = base / 2 + (load.start - this.data.start);
            sum -= triarea * tricentroid + recarea * reccentroid;
          }
        }
        if (load.startMag > load.endMag) {
          if (load.endMag === 0) {
            const base = load.end - load.start;
            const height = load.startMag;
            const area = (base * height) / 2;
            const centroid = (1 / 3) * base + (load.start - this.data.start);
            sum -= area * centroid;
          } else {
            const base = load.end - load.start;
            const triheight = load.startMag - load.endMag;
            const recheight = load.endMag;
            const triarea = (base * triheight) / 2;
            const recarea = base * recheight;
            const tricentroid = (1 / 3) * base + (load.start - this.data.start);
            const reccentroid = base / 2 + (load.start - this.data.start);
            sum -= triarea * tricentroid + recarea * reccentroid;
          }
        }
      }
    });

    // for moments
    this.data.moments?.forEach((moment) => {
      sum += moment.magnitude;
    });

    return sum;
  }

  /**
   * helper function to getEquivalentForceVector
   * Uses integration to find the fixed end moments (m1, m2)
   */
  private findFixedEndMoments(): [number, number] {
    let sum1: number = 0;
    let sum2: number = 0;

    // for point loads
    this.data.pointLoads?.forEach((load) => {
      const a = load.location - this.data.start;
      const b = this.data.end - load.location;
      const l = this.data.length;
      const p = load.magnitude;
      sum1 += (p * a * b * b) / (l * l);
      sum2 -= (p * a * a * b) / (l * l);
    });

    // for distributed loads
    this.data.distributedLoads?.forEach((load) => {
      if (load.startMag === load.endMag) {
        // for uniform distributed loads
        const a = load.start - this.data.start;
        const b = load.end - this.data.start;
        const l = this.data.length;
        const p = load.startMag; // expression for load at x(constant)
        const expressionLeft = assembleExpression("left", p, l);
        const expressionRight = assembleExpression("right", p, l);
        const f1 = buildFunction(expressionLeft);
        const f2 = buildFunction(expressionRight);
        sum1 += adaptiveSimpsonsRule(f1, a, b);
        sum2 -= adaptiveSimpsonsRule(f2, a, b);
      }
      if (load.startMag < load.endMag) {
        if (load.startMag === 0) {
          const a = load.start - this.data.start;
          const b = load.end - this.data.start;
          const l = this.data.length;
          const P = load.endMag;
          const p = `((${P} * (x - ${a})) / (${b} - ${a}))`; // expression for load at x(not a constant)
          const expressionLeft = assembleExpression("left", p, l);
          const expressionRight = assembleExpression("right", p, l);
          const f1 = buildFunction(expressionLeft);
          const f2 = buildFunction(expressionRight);
          sum1 += adaptiveSimpsonsRule(f1, a, b);
          sum2 -= adaptiveSimpsonsRule(f2, a, b);
        } else {
          const a = load.start - this.data.start;
          const b = load.end - this.data.start;
          const l = this.data.length;
          const p1 = load.startMag;
          const p2 = load.endMag;
          const p = `(((${p2} - ${p1}) * (x - ${a}) / (${b} - ${a})) + ${p1})`;
          const expressionLeft = assembleExpression("left", p, l);
          const expressionRight = assembleExpression("right", p, l);
          const f1 = buildFunction(expressionLeft);
          const f2 = buildFunction(expressionRight);
          sum1 += adaptiveSimpsonsRule(f1, a, b);
          sum2 -= adaptiveSimpsonsRule(f2, a, b);
        }
      }
      if (load.startMag > load.endMag) {
        if (load.endMag === 0) {
          const a = load.start - this.data.start;
          const b = load.end - this.data.start;
          const l = this.data.length;
          const P = load.startMag;
          const p = `((${P} * (${b} - x)) / (${b}-${a}))`;
          const expressionLeft = assembleExpression("left", p, l);
          const expressionRight = assembleExpression("right", p, l);
          const f1 = buildFunction(expressionLeft);
          const f2 = buildFunction(expressionRight);
          sum1 += adaptiveSimpsonsRule(f1, a, b);
          sum2 -= adaptiveSimpsonsRule(f2, a, b);
        } else {
          const a = load.start - this.data.start;
          const b = load.end - this.data.start;
          const l = this.data.length;
          const p1 = load.startMag;
          const p2 = load.endMag;
          const p = `(((${p1} - ${p2}) * (${b}-x) / (${b}-${a})) + ${p2})`;
          const expressionLeft = assembleExpression("left", p, l);
          const expressionRight = assembleExpression("right", p, l);
          const f1 = buildFunction(expressionLeft);
          const f2 = buildFunction(expressionRight);
          sum1 += adaptiveSimpsonsRule(f1, a, b);
          sum2 -= adaptiveSimpsonsRule(f2, a, b);
        }
      }
    });

    // for moments
    this.data.moments?.forEach((moment) => {
      const a = moment.location - this.data.start;
      const b = this.data.end - moment.location;
      const l = this.data.length;
      const m = moment.magnitude;
      sum1 += (m * b * (2 * a - b)) / (l * l);
      sum2 += (m * a * (2 * b - a)) / (l * l);
    });

    return [sum1, sum2];
  }

  /**
   * returns the stiffness matrices of the beam element
   * @returns the stiffness matrices of the beam element
   */
  public getStiffnessMatrices(): StiffnessMatrices {
    return this.stiffnessMatrices;
  }

  /**
   * returns the element's data
   * @returns the element's data
   */
  public getData(): BeamElementDataInterface {
    return this.storedData;
  }

  /**
   * setter for the local displacement vector x calculate the local forces
   * @param {Matrix} displacementVector - the local displacement vector
   */
  public setDisplacementVector(displacementVector: Matrix): void {
    if (displacementVector.rows !== 4 || displacementVector.cols !== 1) {
      throw new Error("Invalid dimensions for displacement vector");
    }
    this.localDisplacementVector = displacementVector;
    this.calculateLocalForces();
  }

  /**
   * calculates the local forces of the beam element
   */
  public calculateLocalForces(): void {
    // checks if the local displacement vector has been set
    if (!this.localDisplacementVector) {
      throw new Error("Local displacement vector not set");
    }

    if (this.isNodeReleased("left")) {
      this.localForces = Matrix.subtract(
        Matrix.multiply(
          this.stiffnessMatrices.leftReleased!,
          this.localDisplacementVector
        ),
        this.localEquivalentForceVector
      );
    } else if (this.isNodeReleased("right")) {
      this.localForces = Matrix.subtract(
        Matrix.multiply(
          this.stiffnessMatrices.rightReleased!,
          this.localDisplacementVector
        ),
        this.localEquivalentForceVector
      );
    } else {
      this.localForces = Matrix.subtract(
        Matrix.multiply(
          this.stiffnessMatrices.normal,
          this.localDisplacementVector
        ),
        this.localEquivalentForceVector
      );
    }
  }
}
