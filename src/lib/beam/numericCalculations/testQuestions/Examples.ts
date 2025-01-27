import { BeamData } from "../utils/uiInput";

// Examples of the input data for the beam analysis.

interface Example {
  beam: BeamData;
  result: {
    displacements: number[];
    reactions?: number[];
  };
}

export const beam1: Example = {
  beam: {
    isMetric: true,
    isImperial: false,
    beamLength: {
      value: 18,
      unit: "m",
    },
    boundaryConditions: [
      {
        type: "roller",
        position: 0,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "roller",
        position: 6,
        settlement: {
          value: 10,
          unit: "mm",
          direction: "down",
          set: true,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
      {
        type: "roller",
        position: 12,
        settlement: {
          value: 5,
          unit: "mm",
          direction: "down",
          set: true,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "fixed",
        position: 18,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0.1,
          unit: "radians",
          isClockwise: false,
          set: true,
        },
      },
    ],
    sectionProperties: [
      {
        youngModulus: {
          value: 2e5,
          unit: "pa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: 4e7,
          unit: "mm^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: 2e5,
          unit: "pa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: 4e7,
          unit: "mm^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: 2e5,
          unit: "pa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: 4e7,
          unit: "mm^4",
          coefficient: 1,
        },
      },
    ],
    noOfSpans: 3,
  },
  result: {
    displacements: [
      -0.006153846153846156, 0.00730769230769231, -0.02557692307692308,
    ],
  },
};

// Example 2
export const beam2: Example = {
  beam: {
    isMetric: true,
    isImperial: false,
    beamLength: {
      value: 15,
      unit: "m",
    },
    boundaryConditions: [
      {
        type: "fixed",
        position: 0,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "roller",
        position: 6,
        settlement: {
          value: 10,
          unit: "mm",
          direction: "down",
          set: true,
        },
        rotation: {
          value: 0,
          unit: "degrees",
          isClockwise: true,
          set: false,
        },
      },
      {
        type: "roller",
        position: 9,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "fixed",
        position: 15,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
    ],
    sectionProperties: [
      {
        youngModulus: {
          value: 2e5,
          unit: "mpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: 16e7,
          unit: "mm^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: 2e5,
          unit: "mpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: 16e7,
          unit: "mm^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: 2e5,
          unit: "mpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: 16e7,
          unit: "mm^4",
          coefficient: 1,
        },
      },
    ],
    loads: {
      pointLoads: [
        {
          location: 12,
          magnitude: 50,
          unit: "kn",
        },
      ],
      distributedLoads: [
        {
          start: 0,
          end: 9,
          startMag: 20,
          endMag: 20,
          unit: "kn/m",
        },
      ],
      moments: [],
    },
    noOfSpans: 3,
  },
  result: {
    displacements: [1 / 464, 1 / 402],
  },
};

// Example 3
export const beam3: Example = {
  beam: {
    isMetric: true,
    isImperial: false,
    beamLength: {
      value: 10,
      unit: "m",
    },
    boundaryConditions: [
      {
        type: "fixed",
        position: 0,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "pinned",
        position: 5,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
      {
        type: "fixed",
        position: 10,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
    ],
    sectionProperties: [
      {
        youngModulus: {
          value: null,
          unit: "pa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "mm^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "pa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "mm^4",
          coefficient: 1,
        },
      },
    ],
    loads: {
      pointLoads: [
        {
          location: 2,
          magnitude: 50,
          unit: "kn",
        },
      ],
      distributedLoads: [
        {
          start: 5,
          end: 10,
          startMag: 24,
          endMag: 24,
          unit: "kn/m",
        },
      ],
      moments: [],
    },
    noOfSpans: 2,
  },
  result: {
    displacements: [-16.25],
    reactions: [28.5, 29.5, 77.6, 0, 63.9, -56.5],
  },
};

// Example 4
export const beam4: Example = {
  beam: {
    isMetric: true,
    isImperial: false,
    beamLength: {
      value: 13,
      unit: "m",
    },
    boundaryConditions: [
      {
        type: "fixed",
        position: 0,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "pinned",
        position: 4,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "degrees",
          isClockwise: true,
          set: false,
        },
      },
      {
        type: "pinned",
        position: 9,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "fixed",
        position: 13,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
    ],
    sectionProperties: [
      {
        youngModulus: {
          value: null,
          unit: "pa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "mm^4",
          coefficient: 2,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "pa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "mm^4",
          coefficient: 1.5,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "pa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "mm^4",
          coefficient: 0.8,
        },
      },
    ],
    loads: {
      pointLoads: [
        {
          location: 2,
          magnitude: 20,
          unit: "kn",
        },
        {
          location: 6,
          magnitude: 25,
          unit: "kn",
        },
      ],
      distributedLoads: [
        {
          start: 9,
          end: 13,
          startMag: 12,
          endMag: 12,
          unit: "kn/m",
        },
      ],
      moments: [],
    },
    noOfSpans: 3,
  },
  result: {
    displacements: [-2.2516, -1.3245],
    reactions: [8.31, 7.75, 26.6, 0, 33.69, 0, 24.4, -16.53],
  },
};

// Example 5
export const beam5: Example = {
  beam: {
    isMetric: true,
    isImperial: false,
    beamLength: {
      value: 10,
      unit: "m",
    },
    boundaryConditions: [
      {
        type: "fixed",
        position: 0,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "pinned",
        position: 6,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "degrees",
          isClockwise: true,
          set: false,
        },
      },
      {
        type: "pinned",
        position: 10,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
    ],
    sectionProperties: [
      {
        youngModulus: {
          value: null,
          unit: "pa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "mm^4",
          coefficient: 1.5,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "pa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "mm^4",
          coefficient: 2,
        },
      },
    ],
    loads: {
      pointLoads: [
        {
          location: 2,
          magnitude: 45,
          unit: "kn",
        },
      ],
      distributedLoads: [
        {
          start: 6,
          end: 10,
          startMag: 15,
          endMag: 15,
          unit: "kn/m",
        },
      ],
      moments: [],
    },
    noOfSpans: 2,
  },
  result: {
    displacements: [-4, 12],
    reactions: [32.33, 38, 48.67, 0, 24, 0],
  },
};

// Example 6
export const beam6: Example = {
  beam: {
    isMetric: true,
    isImperial: false,
    beamLength: {
      value: 12,
      unit: "m",
    },
    boundaryConditions: [
      {
        type: "fixed",
        position: 0,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "pinned",
        position: 4,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "degrees",
          isClockwise: true,
          set: false,
        },
      },
      {
        type: "pinned",
        position: 7,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "pinned",
        position: 12,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
    ],
    sectionProperties: [
      {
        youngModulus: {
          value: null,
          unit: "pa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "mm^4",
          coefficient: 2,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "pa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "mm^4",
          coefficient: 1.5,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "pa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "mm^4",
          coefficient: 2,
        },
      },
    ],
    loads: {
      pointLoads: [
        {
          location: 2,
          magnitude: 24,
          unit: "kn",
        },
        {
          location: 10,
          magnitude: 25,
          unit: "kn",
        },
      ],
      distributedLoads: [
        {
          start: 4,
          end: 7,
          startMag: 12,
          endMag: 12,
          unit: "kn/m",
        },
      ],
      moments: [],
    },
    noOfSpans: 3,
  },
  result: {
    displacements: [1.8305, -4.322, 13.411],
    reactions: [13.37, 13.83, 26.14, 0, 33.65, 0, 11.84, 0],
  },
};

// Example 7
export const beam7: Example = {
  beam: {
    isMetric: true,
    isImperial: false,
    beamLength: {
      value: 18,
      unit: "m",
    },
    boundaryConditions: [
      {
        type: "roller",
        position: 0,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "roller",
        position: 10,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "degrees",
          isClockwise: true,
          set: false,
        },
      },
      {
        type: "roller",
        position: 18,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
    ],
    sectionProperties: [
      {
        youngModulus: {
          value: null,
          unit: "pa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "mm^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "pa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "mm^4",
          coefficient: 1,
        },
      },
    ],
    loads: {
      pointLoads: [
        {
          location: 5,
          magnitude: 72,
          unit: "kn",
        },
      ],
      distributedLoads: [
        {
          start: 10,
          end: 18,
          startMag: 36,
          endMag: 36,
          unit: "kn/m",
        },
      ],
      moments: [],
    },
    noOfSpans: 2,
  },
  result: {
    displacements: [-111.667, -226.667, 497.333],
    reactions: [15.7, 0, 225.675, 0, 118.625, 0],
  },
};

// Example 8
export const beam8: Example = {
  beam: {
    isMetric: true,
    isImperial: false,
    beamLength: {
      value: 7,
      unit: "m",
    },
    boundaryConditions: [
      {
        type: "pinned",
        position: 0,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "pinned",
        position: 3,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "fixed",
        position: 7,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
    ],
    sectionProperties: [
      {
        youngModulus: {
          value: null,
          unit: "pa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "mm^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "pa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "mm^4",
          coefficient: 1,
        },
      },
    ],
    loads: {
      pointLoads: [
        {
          location: 1.5,
          magnitude: 48,
          unit: "kn",
        },
      ],
      distributedLoads: [
        {
          start: 3,
          end: 7,
          startMag: 15,
          endMag: 15,
          unit: "kn/m",
        },
      ],
      moments: [],
    },
    noOfSpans: 2,
  },
  result: {
    displacements: [-15.25, 3.5],
    reactions: [16.16666, 0, 63.1458, 0, 28.6875, -18.25],
  },
};

// Example 9
export const beam9: Example = {
  beam: {
    isMetric: true,
    isImperial: false,
    beamLength: {
      value: 14,
      unit: "m",
    },
    boundaryConditions: [
      {
        type: "pinned",
        position: 0,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "pinned",
        position: 5,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "pinned",
        position: 9,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "fixed",
        position: 14,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
    ],
    sectionProperties: [
      {
        youngModulus: {
          value: null,
          unit: "pa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "mm^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "pa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "mm^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "pa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "mm^4",
          coefficient: 1,
        },
      },
    ],
    loads: {
      pointLoads: [
        {
          location: 12,
          magnitude: 12.5,
          unit: "kn",
        },
      ],
      distributedLoads: [],
      moments: [
        {
          location: 2,
          magnitude: 25,
          unit: "kn.m",
          isClockwise: true,
        },
        {
          location: 7,
          magnitude: 20,
          unit: "kn.m",
          isClockwise: true,
        },
      ],
    },
    noOfSpans: 3,
  },
  result: {
    displacements: [-0.2804, 8.0608, -2.7947],
    reactions: [-5.3327, 0, -0.1925, 0, 9.2544, 0, 8.7707, -10.1178],
  },
};

// Example 10
export const beam10: Example = {
  beam: {
    isMetric: true,
    isImperial: false,
    beamLength: {
      value: 7,
      unit: "m",
    },
    boundaryConditions: [
      {
        type: "fixed",
        position: 0,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "pinned",
        position: 4,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "freeEnd",
        position: 7,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
    ],
    sectionProperties: [
      {
        youngModulus: {
          value: null,
          unit: "pa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "mm^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "pa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "mm^4",
          coefficient: 1,
        },
      },
    ],
    loads: {
      pointLoads: [
        {
          location: 2,
          magnitude: 50,
          unit: "kn",
        },
      ],
      distributedLoads: [
        {
          start: 4,
          end: 7,
          startMag: 20,
          endMag: 20,
          unit: "kn/m",
        },
      ],
      moments: [],
    },
    noOfSpans: 2,
  },
  result: {
    displacements: [-65],
    reactions: [0.625, -7.5, 109.375, 0, 0, 0],
  },
};

// Example 11
export const beam11: Example = {
  beam: {
    isMetric: true,
    isImperial: false,
    beamLength: {
      value: 11,
      unit: "m",
    },
    boundaryConditions: [
      {
        type: "fixed",
        position: 0,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "pinned",
        position: 4,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "pinned",
        position: 9,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "freeEnd",
        position: 11,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
    ],
    sectionProperties: [
      {
        youngModulus: {
          value: null,
          unit: "pa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "mm^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "pa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "mm^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "pa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "mm^4",
          coefficient: 1,
        },
      },
    ],
    loads: {
      pointLoads: [
        {
          location: 2,
          magnitude: 72,
          unit: "kn",
        },
        {
          location: 11,
          magnitude: 15,
          unit: "kn",
        },
      ],
      distributedLoads: [
        {
          start: 4,
          end: 9,
          startMag: 24,
          endMag: 24,
          unit: "kn/m",
        },
      ],
      moments: [],
    },
    noOfSpans: 3,
  },
  result: {
    displacements: [-15, 32.5],
    reactions: [30.37, 28.5, 105.83, 0, 70.8, 0, 0, 0],
  },
};

// Example 12
export const beam12: Example = {
  beam: {
    isMetric: true,
    isImperial: false,
    beamLength: {
      value: 13,
      unit: "m",
    },
    boundaryConditions: [
      {
        type: "freeEnd",
        position: 0,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "pinned",
        position: 3,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "pinned",
        position: 9,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "fixed",
        position: 13,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
    ],
    sectionProperties: [
      {
        youngModulus: {
          value: null,
          unit: "pa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "mm^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "pa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "mm^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "pa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "mm^4",
          coefficient: 1,
        },
      },
    ],
    loads: {
      pointLoads: [
        {
          location: 6,
          magnitude: 48,
          unit: "kn",
        },
      ],
      distributedLoads: [
        {
          start: 0,
          end: 3,
          startMag: 12,
          endMag: 12,
          unit: "kn/m",
        },
        {
          start: 9,
          end: 13,
          startMag: 0,
          endMag: 90,
          unit: "kn/m",
        },
      ],
      moments: [],
    },
    noOfSpans: 3,
  },
  result: {
    displacements: [34, -14],
    reactions: [0, 0, 63.33, 0, 69.42, 0, 131.25, -79],
  },
};

// Example 13
export const beam13: Example = {
  beam: {
    isMetric: true,
    isImperial: false,
    beamLength: {
      value: 13,
      unit: "m",
    },
    boundaryConditions: [
      {
        type: "freeEnd",
        position: 0,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "pinned",
        position: 2,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "pinned",
        position: 6,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "pinned",
        position: 10,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "freeEnd",
        position: 13,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
    ],
    sectionProperties: [
      {
        youngModulus: {
          value: null,
          unit: "pa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "mm^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "pa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "mm^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "pa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "mm^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "pa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "mm^4",
          coefficient: 1,
        },
      },
    ],
    loads: {
      pointLoads: [
        {
          location: 0,
          magnitude: 30,
          unit: "kn",
        },
        {
          location: 4,
          magnitude: 20,
          unit: "kn",
        },
      ],
      distributedLoads: [
        {
          start: 6,
          end: 13,
          startMag: 12,
          endMag: 12,
          unit: "kn/m",
        },
      ],
      moments: [],
    },
    noOfSpans: 4,
  },
  result: {
    displacements: [54, -8, -34],
    reactions: [0, 0, 57.25, 0, 1, 0, 75.75, 0, 0, 0],
  },
};

// Example 14
export const beam14: Example = {
  beam: {
    isMetric: true,
    isImperial: false,
    beamLength: {
      value: 10,
      unit: "m",
    },
    boundaryConditions: [
      {
        type: "fixed",
        position: 0,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "pinned",
        position: 4,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "pinned",
        position: 8,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "pinned",
        position: 13,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "freeEnd",
        position: 16,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
    ],
    sectionProperties: [
      {
        youngModulus: {
          value: null,
          unit: "pa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "mm^4",
          coefficient: 3,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "pa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "mm^4",
          coefficient: 2,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "pa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "mm^4",
          coefficient: 2,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "pa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "mm^4",
          coefficient: 1,
        },
      },
    ],
    loads: {
      pointLoads: [
        {
          location: 2,
          magnitude: 40,
          unit: "kn",
        },
        {
          location: 16,
          magnitude: 40,
          unit: "kn",
        },
      ],
      distributedLoads: [
        {
          start: 8,
          end: 13,
          startMag: 48,
          endMag: 48,
          unit: "kn/m",
        },
      ],
      moments: [
        {
          location: 6,
          magnitude: 80,
          unit: "kn.m",
          isClockwise: true,
        },
      ],
    },
    noOfSpans: 4,
  },
  result: {
    displacements: [13.2, -26, 0.5],
    reactions: [34.85, 39.8, -34.45, 0, 147.36, 0, 172.24, 0, 0, 0],
  },
};

// Example 15
export const beam15: Example = {
  beam: {
    isMetric: true,
    isImperial: false,
    beamLength: {
      value: 18,
      unit: "m",
    },
    boundaryConditions: [
      {
        type: "fixed",
        position: 0,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "roller",
        position: 8,
        settlement: {
          value: 10,
          unit: "mm",
          direction: "down",
          set: true,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
      {
        type: "roller",
        position: 18,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
    ],
    sectionProperties: [
      {
        youngModulus: {
          value: 1,
          unit: "kpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: 8000,
          unit: "m^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: 1,
          unit: "kpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: 8000,
          unit: "m^4",
          coefficient: 2.5,
        },
      },
    ],
    loads: {
      pointLoads: [
        {
          location: 12,
          magnitude: 12.5,
          unit: "kn",
        },
      ],
      distributedLoads: [
        {
          start: 0,
          end: 8,
          startMag: 3,
          endMag: 3,
          unit: "kn/m",
        },
      ],
      moments: [],
    },
    noOfSpans: 2,
  },
  result: {
    displacements: [-9.5e-4, 3.475e-3],
    reactions: [13.16, 21.6, 19.57, 0, 3.77, 0],
  },
};

// Example 16
export const beam16: Example = {
  beam: {
    isMetric: true,
    isImperial: false,
    beamLength: {
      value: 20,
      unit: "m",
    },
    boundaryConditions: [
      {
        type: "fixed",
        position: 0,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "pinned",
        position: 10,
        settlement: {
          value: 10,
          unit: "mm",
          direction: "down",
          set: true,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
      {
        type: "pinned",
        position: 20,
        settlement: {
          value: 6,
          unit: "mm",
          direction: "down",
          set: true,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
    ],
    sectionProperties: [
      {
        youngModulus: {
          value: 12,
          unit: "gpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: 125e7,
          unit: "mm^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: 12,
          unit: "gpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: 125e7,
          unit: "mm^4",
          coefficient: 2,
        },
      },
    ],
    loads: {
      pointLoads: [
        {
          location: 5,
          magnitude: 24,
          unit: "kn",
        },
        {
          location: 15,
          magnitude: 12,
          unit: "kn",
        },
      ],
      distributedLoads: [],
      moments: [],
    },
    noOfSpans: 2,
  },
  result: {
    displacements: [1.4e-4, 1.78e-3],
    reactions: [13.926, 39.42, 18.09, 0, 3.984, 0],
  },
};

// Example 17
export const beam17: Example = {
  beam: {
    isMetric: true,
    isImperial: false,
    beamLength: {
      value: 12,
      unit: "m",
    },
    boundaryConditions: [
      {
        type: "fixed",
        position: 0,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "pinned",
        position: 8,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
      {
        type: "fixed",
        position: 12,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
    ],
    sectionProperties: [
      {
        youngModulus: {
          value: 1,
          unit: "kpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: 8000,
          unit: "m^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: 1,
          unit: "kpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: 8000,
          unit: "m^4",
          coefficient: 2,
        },
      },
    ],
    loads: {
      pointLoads: [
        {
          location: 4,
          magnitude: 20,
          unit: "kn",
        },
      ],
      distributedLoads: [],
      moments: [
        {
          location: 8,
          magnitude: 10,
          unit: "kn.m",
          isClockwise: false,
        },
      ],
    },
    noOfSpans: 2,
  },
  result: {
    displacements: [1.5e-3],
    reactions: [11.125, 23, 17.875, 0, -9, 12],
  },
};

// Example 18
export const beam18: Example = {
  beam: {
    isMetric: true,
    isImperial: false,
    beamLength: {
      value: 9,
      unit: "m",
    },
    boundaryConditions: [
      {
        type: "fixed",
        position: 0,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "pinned",
        position: 4,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
      {
        type: "pinned",
        position: 9,
        settlement: {
          value: 0,
          unit: "mm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
    ],
    sectionProperties: [
      {
        youngModulus: {
          value: null,
          unit: "kpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "m^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "kpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "m^4",
          coefficient: 1,
        },
      },
    ],
    loads: {
      pointLoads: [
        {
          location: 2,
          magnitude: 20,
          unit: "kn",
        },
      ],
      distributedLoads: [
        {
          start: 4,
          end: 9,
          startMag: 9.6,
          endMag: 9.6,
          unit: "kn/m",
        },
      ],
      moments: [
        {
          location: 4,
          magnitude: 24,
          unit: "kn.m",
          isClockwise: true,
        },
      ],
    },
    noOfSpans: 2,
  },
  result: {
    displacements: [-27.5, 38.75],
    reactions: [-0.3125, -3.75, 47.0125, 0, 21.3, 0],
  },
};

// Example 19
export const beam19: Example = {
  beam: {
    isMetric: true,
    isImperial: false,
    beamLength: {
      value: 8,
      unit: "m",
    },
    boundaryConditions: [
      {
        type: "fixed",
        position: 0,
        settlement: {
          value: 0.8,
          unit: "cm",
          direction: "down",
          set: true,
        },
        rotation: {
          value: 0.001,
          unit: "radians",
          isClockwise: true,
          set: true,
        },
      },
      {
        type: "pinned",
        position: 4,
        settlement: {
          value: 1.2,
          unit: "cm",
          direction: "down",
          set: true,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
      {
        type: "pinned",
        position: 8,
        settlement: {
          value: 0.9,
          unit: "cm",
          direction: "down",
          set: true,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
    ],
    sectionProperties: [
      {
        youngModulus: {
          value: 1,
          unit: "kpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: 8000,
          unit: "m^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: 1,
          unit: "kpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: 8000,
          unit: "m^4",
          coefficient: 1,
        },
      },
    ],
    loads: {
      pointLoads: [],
      distributedLoads: [],
      moments: [],
    },
    noOfSpans: 2,
  },
  result: {
    displacements: [-2.5e-4, 1.25e-3],
    reactions: [2.25, 3, -3.75, 0, 1.5, 0],
  },
};

// EXAMPLE 20
export const beam20: Example = {
  beam: {
    isMetric: true,
    isImperial: false,
    beamLength: {
      value: 14,
      unit: "m",
    },
    boundaryConditions: [
      {
        type: "fixed",
        position: 0,
        settlement: {
          value: 0,
          unit: "cm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
      {
        type: "pinned",
        position: 6,
        settlement: {
          value: 0,
          unit: "m",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
      {
        type: "pinned",
        position: 10,
        settlement: {
          value: 0.002,
          unit: "m",
          direction: "down",
          set: true,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
      {
        type: "fixed",
        position: 14,
        settlement: {
          value: 0,
          unit: "m",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
    ],
    sectionProperties: [
      {
        youngModulus: {
          value: 1,
          unit: "kpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: 8000,
          unit: "m^4",
          coefficient: 1.5,
        },
      },
      {
        youngModulus: {
          value: 1,
          unit: "kpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: 8000,
          unit: "m^4",
          coefficient: 3,
        },
      },
      {
        youngModulus: {
          value: 1,
          unit: "kpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: 8000,
          unit: "m^4",
          coefficient: 2,
        },
      },
    ],
    loads: {
      pointLoads: [
        {
          location: 2,
          magnitude: 9,
          unit: "kn",
        },
        {
          location: 4,
          magnitude: 18,
          unit: "kn",
        },
      ],
      distributedLoads: [
        {
          start: 6,
          end: 8,
          startMag: 0,
          endMag: 24,
          unit: "kn/m",
        },
        {
          start: 8,
          end: 10,
          startMag: 24,
          endMag: 0,
          unit: "kn/m",
        },
        {
          start: 10,
          end: 14,
          startMag: 18,
          endMag: 18,
          unit: "kn/m",
        },
      ],
      moments: [],
    },
    noOfSpans: 3,
  },
  result: {
    displacements: [-5.281625e-4, 9.155e-5],
    reactions: [10.28, 13.89, 44.145, 0, 50.03, 0, 42.55, -36.73],
  },
};

// EXAMPLE 21
export const beam21: Example = {
  beam: {
    isMetric: true,
    isImperial: false,
    beamLength: {
      value: 14,
      unit: "m",
    },
    boundaryConditions: [
      {
        type: "fixed",
        position: 0,
        settlement: {
          value: 0,
          unit: "m",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
      {
        type: "pinned",
        position: 3,
        settlement: {
          value: 0,
          unit: "m",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
      {
        type: "pinned",
        position: 8,
        settlement: {
          value: 0,
          unit: "m",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
      {
        type: "pinned",
        position: 12,
        settlement: {
          value: 0,
          unit: "cm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
      {
        type: "freeEnd",
        position: 14,
        settlement: {
          value: 0,
          unit: "cm",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
    ],
    sectionProperties: [
      {
        youngModulus: {
          value: null,
          unit: "kpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "m^4",
          coefficient: 1.8,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "kpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "m^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "kpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "m^4",
          coefficient: 1.6,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "kpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "m^4",
          coefficient: 1,
        },
      },
    ],
    loads: {
      pointLoads: [
        {
          location: 1.5,
          magnitude: 16,
          unit: "kn",
        },
        {
          location: 4,
          magnitude: 50,
          unit: "kn",
        },
        {
          location: 6,
          magnitude: 25,
          unit: "kn",
        },
        {
          location: 9,
          magnitude: 48,
          unit: "kn",
        },
      ],
      distributedLoads: [
        {
          start: 0,
          end: 3,
          startMag: 4,
          endMag: 4,
          unit: "kn/m",
        },
        {
          start: 8,
          end: 12,
          startMag: 6,
          endMag: 6,
          unit: "kn/m",
        },
      ],
      moments: [
        {
          location: 14,
          magnitude: 10,
          unit: "kn.m",
          isClockwise: true,
        },
      ],
    },
    noOfSpans: 4,
  },
  result: {
    displacements: [-10.4166, -4.1666, 6.4583],
    reactions: [1.5, -3.5, 76.6, 0, 78.775, 0, 18.125, 0, 0, 0],
  },
};

// EXAMPLE 22
export const beam22: Example = {
  beam: {
    isMetric: true,
    isImperial: false,
    beamLength: {
      value: 6,
      unit: "m",
    },
    boundaryConditions: [
      {
        type: "fixed",
        position: 0,
        settlement: {
          value: 0,
          unit: "m",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
      {
        type: "fixed",
        position: 6,
        settlement: {
          value: 0,
          unit: "m",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
    ],
    sectionProperties: [
      {
        youngModulus: {
          value: null,
          unit: "kpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "m^4",
          coefficient: 1,
        },
      },
    ],
    loads: {
      pointLoads: [
        {
          location: 2,
          magnitude: 18,
          unit: "kn",
        },
        {
          location: 4,
          magnitude: 9,
          unit: "kn",
        },
      ],
      distributedLoads: [],
      moments: [],
    },
    noOfSpans: 1,
  },
  result: {
    displacements: [],
    reactions: [15.667, 20, 11.333, -16],
  },
};

// EXAMPLE 23
// testing internal hinges

export const beam23: Example = {
  beam: {
    isMetric: false,
    isImperial: true,
    beamLength: {
      value: 500,
      unit: "ft",
    },
    boundaryConditions: [
      {
        type: "pinned",
        position: 0,
        settlement: {
          value: 0,
          unit: "m",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
      {
        type: "roller",
        position: 100,
        settlement: {
          value: 0,
          unit: "m",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "internalHinge",
        position: 190,
        settlement: {
          value: 0,
          unit: "m",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
      {
        type: "internalHinge",
        position: 310,
        settlement: {
          value: 0,
          unit: "m",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "roller",
        position: 400,
        settlement: {
          value: 0,
          unit: "m",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
      {
        type: "roller",
        position: 500,
        settlement: {
          value: 0,
          unit: "m",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
    ],
    sectionProperties: [
      {
        youngModulus: {
          value: null,
          unit: "kpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "m^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "kpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "m^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "kpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "m^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "kpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "m^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "kpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "m^4",
          coefficient: 1,
        },
      },
    ],
    loads: {
      pointLoads: [
        {
          location: 220,
          magnitude: 100,
          unit: "kipf",
        },
      ],
      distributedLoads: [
        {
          start: 0,
          end: 500,
          startMag: 2000,
          endMag: 2000,
          unit: "lbf/ft",
        },
      ],
      moments: [],
    },
    noOfSpans: 5,
  },
  result: {
    displacements: [],
    reactions: [],
  },
};

// EXAMPLE 24
// testing internal hinges
export const beam24: Example = {
  beam: {
    isMetric: true,
    isImperial: false,
    beamLength: {
      value: 20,
      unit: "m",
    },
    boundaryConditions: [
      {
        type: "fixed",
        position: 0,
        settlement: {
          value: 0,
          unit: "m",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
      {
        type: "internalHinge",
        position: 5,
        settlement: {
          value: 0,
          unit: "m",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "roller",
        position: 10,
        settlement: {
          value: 0,
          unit: "m",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
      {
        type: "internalHinge",
        position: 15,
        settlement: {
          value: 0,
          unit: "m",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "roller",
        position: 20,
        settlement: {
          value: 0,
          unit: "m",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
    ],
    sectionProperties: [
      {
        youngModulus: {
          value: null,
          unit: "kpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "m^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "kpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "m^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "kpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "m^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "kpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "m^4",
          coefficient: 1,
        },
      },
    ],
    loads: {
      pointLoads: [],
      distributedLoads: [
        {
          start: 0,
          end: 20,
          startMag: 117,
          endMag: 0,
          unit: "kn/m",
        },
      ],
      moments: [],
    },
    noOfSpans: 4,
  },
  result: {
    displacements: [],
    reactions: [],
  },
};

// EXAMPLE 25
// testing internal hinges
export const beam25: Example = {
  beam: {
    isMetric: true,
    isImperial: false,
    beamLength: {
      value: 18,
      unit: "m",
    },
    boundaryConditions: [
      {
        type: "pinned",
        position: 0,
        settlement: {
          value: 0,
          unit: "m",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
      {
        type: "roller",
        position: 9,
        settlement: {
          value: 0,
          unit: "m",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "internalHinge",
        position: 12,
        settlement: {
          value: 0,
          unit: "m",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "roller",
        position: 18,
        settlement: {
          value: 0,
          unit: "m",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
    ],
    sectionProperties: [
      {
        youngModulus: {
          value: null,
          unit: "kpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "m^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "kpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "m^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "kpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "m^4",
          coefficient: 1,
        },
      },
    ],
    loads: {
      pointLoads: [
        {
          location: 15,
          magnitude: 55,
          unit: "kn",
        },
      ],
      distributedLoads: [
        {
          start: 0,
          end: 12,
          startMag: 15,
          endMag: 15,
          unit: "kn/m",
        },
      ],
      moments: [],
    },
    noOfSpans: 3,
  },
  result: {
    displacements: [],
    reactions: [],
  },
};

// EXAMPLE 26
// testing internal hinges
export const beam26: Example = {
  beam: {
    isMetric: true,
    isImperial: false,
    beamLength: {
      value: 18,
      unit: "m",
    },
    boundaryConditions: [
      {
        type: "fixed",
        position: 0,
        settlement: {
          value: 0,
          unit: "m",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
      {
        type: "internalHinge",
        position: 6,
        settlement: {
          value: 0,
          unit: "m",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "roller",
        position: 12,
        settlement: {
          value: 0,
          unit: "m",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
      {
        type: "fixed",
        position: 18,
        settlement: {
          value: 0,
          unit: "m",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
    ],
    sectionProperties: [
      {
        youngModulus: {
          value: null,
          unit: "kpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "m^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "kpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "m^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "kpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "m^4",
          coefficient: 1,
        },
      },
    ],
    loads: {
      pointLoads: [
        {
          location: 6,
          magnitude: 120,
          unit: "kn",
        },
      ],
      distributedLoads: [],
      moments: [],
    },
    noOfSpans: 3,
  },
  result: {
    displacements: [],
    reactions: [],
  },
};

// EXAMPLE 27
// testing internal hinges
export const beam27: Example = {
  beam: {
    isMetric: false,
    isImperial: true,
    beamLength: {
      value: 25,
      unit: "ft",
    },
    boundaryConditions: [
      {
        type: "pinned",
        position: 0,
        settlement: {
          value: 0,
          unit: "m",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
      {
        type: "roller",
        position: 10,
        settlement: {
          value: 0,
          unit: "m",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "internalHinge",
        position: 15,
        settlement: {
          value: 0,
          unit: "m",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
      {
        type: "roller",
        position: 25,
        settlement: {
          value: 0,
          unit: "m",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
    ],
    sectionProperties: [
      {
        youngModulus: {
          value: null,
          unit: "kpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "m^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "kpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "m^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "kpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "m^4",
          coefficient: 1,
        },
      },
    ],
    loads: {
      pointLoads: [
        {
          location: 15,
          magnitude: 12,
          unit: "kipf",
        },
        {
          location: 20,
          magnitude: 24,
          unit: "kipf",
        },
      ],
      distributedLoads: [],
      moments: [],
    },
    noOfSpans: 3,
  },
  result: {
    displacements: [],
    reactions: [],
  },
};

// EXAMPLE 28
export const beam28: Example = {
  beam: {
    isMetric: true,
    isImperial: false,
    beamLength: {
      value: 27,
      unit: "m",
    },
    boundaryConditions: [
      {
        type: "pinned",
        position: 0,
        settlement: {
          value: 0,
          unit: "m",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
      {
        type: "internalHinge",
        position: 4,
        settlement: {
          value: 0,
          unit: "m",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "roller",
        position: 8,
        settlement: {
          value: 0,
          unit: "m",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
      {
        type: "roller",
        position: 18,
        settlement: {
          value: 0,
          unit: "m",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
      {
        type: "internalHinge",
        position: 24,
        settlement: {
          value: 0,
          unit: "m",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: false,
          set: false,
        },
      },
      {
        type: "roller",
        position: 27,
        settlement: {
          value: 0,
          unit: "m",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
    ],
    sectionProperties: [
      {
        youngModulus: {
          value: null,
          unit: "kpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "m^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "kpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "m^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "kpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "m^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "kpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "m^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: null,
          unit: "kpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: null,
          unit: "m^4",
          coefficient: 1,
        },
      },
    ],
    loads: {
      pointLoads: [],
      distributedLoads: [
        {
          start: 0,
          end: 13,
          startMag: 0,
          endMag: 77,
          unit: "kn/m",
        },
        {
          start: 13,
          end: 27,
          startMag: 77,
          endMag: 0,
          unit: "kn/m",
        },
      ],
      moments: [],
    },
    noOfSpans: 5,
  },
  result: {
    displacements: [],
    reactions: [],
  },
};

export const beam29: Example = {
  beam: {
    isMetric: true,
    isImperial: false,
    beamLength: {
      value: 20, // Based on distances between supports shown in diagram
      unit: "m",
    },
    boundaryConditions: [
      {
        type: "freeEnd",
        position: 0,
        settlement: {
          value: 0,
          unit: "m",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
      {
        type: "roller",
        position: 5,
        settlement: {
          value: 0,
          unit: "m",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
      {
        type: "roller",
        position: 10,
        settlement: {
          value: 0,
          unit: "m",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
      {
        type: "roller",
        position: 15,
        settlement: {
          value: 0,
          unit: "m",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
      {
        type: "freeEnd",
        position: 20,
        settlement: {
          value: 0,
          unit: "m",
          direction: "down",
          set: false,
        },
        rotation: {
          value: 0,
          unit: "radians",
          isClockwise: true,
          set: false,
        },
      },
    ],
    sectionProperties: [
      {
        youngModulus: {
          value: 210000,
          unit: "mpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: 8360,
          unit: "cm^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: 210000,
          unit: "mpa",
          coefficient: 1,
        },
        momentOfInertia: { 
          value: 8360,
          unit: "cm^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: 210000,
          unit: "mpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: 8360,
          unit: "cm^4",
          coefficient: 1,
        },
      },
      {
        youngModulus: {
          value: 210000,
          unit: "mpa",
          coefficient: 1,
        },
        momentOfInertia: {
          value: 8360,
          unit: "cm^4",
          coefficient: 1,
        },
      },
    ],
    loads: {
      pointLoads: [
        {
          location: 20,
          magnitude: 30,
          unit: "kn",
        },
      ],
      distributedLoads: [],
      moments: [],
    },
    noOfSpans: 4,
  },
  result: {
    displacements: [],
    reactions: [],
  },
};
