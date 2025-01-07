/**
 * This modules contains interfaces that define the structure of the input data for the beam analysis.
 */

/**
 * Represents the length of the beam.
 * 
 * @interface
 */
interface BeamLength {
    value: number;
    unit: 'm' | 'cm' | 'mm' | 'km' | 'in' | 'ft' | 'yd';
}

/**
 * Represent the boundary conditions of the beam.
 * 
 * @interface
 */
export interface BoundaryCondition {
    type: "fixed" | "pinned" | "roller" | "internalHinge" | "freeEnd";
    position: number;
    settlement: {
        value: number;
        unit: 'm' | 'cm' | 'mm' | 'km' | 'in' | 'ft' | 'yd';
        direction: 'up' | 'down';
        set: boolean;
    }
    rotation: {
        value: number;
        unit: 'degrees' | 'radians';
        isClockwise: boolean;
        set: boolean;
    }; // NOTE THAT: SETTLEMENT AND ROTATION are values that are caused by the load acting on the beam
       // They are information provided by observation/experiment or assumption
       // They are additional information that aids in the analysis of the beam

}

/**
 * Represents the section properties of the beam.
 * 
 * @interface
 */
interface SectionProperty {
    youngModulus: {
        value: number | null;
        unit: 'pa' | 'kpa' | 'mpa' | 'gpa' | 'psi' | 'psf' | 'ksi';
        coefficient: number;
    };
    momentOfInertia: {
        value: number | null;
        unit: 'm^4' | 'cm^4' | 'mm^4' | 'in^4' | 'ft^4';
        coefficient: number;
    };
}

/**
 * Represents the point loads acting on the beam.
 * 
 * @interface
 */
export interface PointLoads {
    location: number;
    magnitude: number;
    unit: 'n' | 'kn' | 'lbf' | 'kgf' | 'kipf';
}

/**
 * Represents the distributed loads acting on the beam.
 * 
 * @interface
 */
export interface DistributedLoads {
    start: number;
    end: number;
    startMag: number;
    endMag: number;
    unit: 'kn/m' | 'kn/mm' | 'n/mm' | 'n/m' | 'lbf/in' | 'lbf/ft';
}

/**
 * Represents the moments acting on the beam.
 * 
 * @interface
 */
export interface Moments {
    location: number;
    magnitude: number;
    unit: 'kn.m' | 'n.m' | 'kn.mm' | 'kgf.m' | 'lbf.in' | 'lbf.ft' | 'kip.in' | 'kip.ft';
    isClockwise: boolean;
}

/**
 * Represents the loads acting on the beam.
 * 
 * @interface
 */
interface Loads {
    pointLoads: PointLoads[];
    distributedLoads: DistributedLoads[];
    moments: Moments[];
}

/**
 * Represents the input data for the beam analysis.
 * 
 * @interface
 */
export interface BeamData {
    isMetric: boolean;
    isImperial: boolean;
    beamLength: BeamLength;
    boundaryConditions: BoundaryCondition[]; // TODO: make sure input is sorted
    sectionProperties: SectionProperty[];
    loads?: Loads; // TODO: make sure two or more loads/moments are not acting on the same location
    noOfSpans: number;
}