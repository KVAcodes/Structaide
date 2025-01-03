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
    displacements: [ -0.006153846153846156, 0.00730769230769231, -0.02557692307692308 ],
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
    displacements: [1/464, 1/402],
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
      }
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
    reactions: [8.31, 7.75, 26.6, 0,  33.69, 0,  24.4, -16.53],
  }
}

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
  }
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
      }
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
      }
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
        }
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
  }
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
      }
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
  }
}

// Example 8
export const beam8: Example = {
  beam: {
    isMetric: true,
    isImperial: false,
    beamLength: {
      value: 7,
      unit: 'm'
    },
    boundaryConditions: [
      {
        type: 'pinned',
        position: 0,
        settlement: {
          value: 0,
          unit: 'mm',
          direction: 'down',
          set: false
        },
        rotation: {
          value: 0,
          unit: 'radians',
          isClockwise: false,
          set: false
        }
      },
      {
        type: 'pinned',
        position: 3,
        settlement: {
          value: 0,
          unit: 'mm',
          direction: 'down',
          set: false
        },
        rotation: {
          value: 0,
          unit: 'radians',
          isClockwise: false,
          set: false
        }
      },
      {
        type: 'fixed',
        position: 7,
        settlement: {
          value: 0,
          unit: 'mm',
          direction: 'down',
          set: false
        },
        rotation: {
          value: 0,
          unit: 'radians',
          isClockwise: false,
          set: false
        }
      }
    ],
    sectionProperties: [
      {
        youngModulus: {
          value: null,
          unit: 'pa',
          coefficient: 1
        },
        momentOfInertia: {
          value: null,
          unit: 'mm^4',
          coefficient: 1
        }
      },
      {
        youngModulus: {
          value: null,
          unit: 'pa',
          coefficient: 1
        },
        momentOfInertia: {
          value: null,
          unit: 'mm^4',
          coefficient: 1
        }
      }
    ],
    loads: {
      pointLoads: [
        {
          location: 1.5,
          magnitude: 48,
          unit: 'kn'
        },

      ],
      distributedLoads: [
        {
          start: 3,
          end: 7,
          startMag: 15,
          endMag: 15,
          unit: 'kn/m'
        }
      ],
      moments: []
    },
    noOfSpans: 2
  },
  result: {
    displacements: [-15.25, 3.5],
    reactions: [16.16666, 0, 63.1458, 0, 28.6875, -18.25]
  }
}

// Example 9
export const beam9: Example = {
  beam: {
    isMetric: true,
    isImperial: false,
    beamLength: {
      value: 14,
      unit: 'm'
    },
    boundaryConditions: [
      {
        type: 'pinned',
        position: 0,
        settlement: {
          value: 0,
          unit: 'mm',
          direction: 'down',
          set: false
        },
        rotation: {
          value: 0,
          unit: 'radians',
          isClockwise: false,
          set: false
        }
      },
      {
        type: 'pinned',
        position: 5,
        settlement: {
          value: 0,
          unit: 'mm',
          direction: 'down',
          set: false
        },
        rotation: {
          value: 0,
          unit: 'radians',
          isClockwise: false,
          set: false
        }
      },
      {
        type: 'pinned',
        position: 9,
        settlement: {
          value: 0,
          unit: 'mm',
          direction: 'down',
          set: false
        },
        rotation: {
          value: 0,
          unit: 'radians',
          isClockwise: false,
          set: false
        }
      },
      {
        type: 'fixed',
        position: 14,
        settlement: {
          value: 0,
          unit: 'mm',
          direction: 'down',
          set: false
        },
        rotation: {
          value: 0,
          unit: 'radians',
          isClockwise: false,
          set: false
        }
      }
    ],
    sectionProperties: [
      {
        youngModulus: {
          value: null,
          unit: 'pa',
          coefficient: 1
        },
        momentOfInertia: {
          value: null,
          unit: 'mm^4',
          coefficient: 1
        }
      },
      {
        youngModulus: {
          value: null,
          unit: 'pa',
          coefficient: 1
        },
        momentOfInertia: {
          value: null,
          unit: 'mm^4',
          coefficient: 1
        }
      },
      {
        youngModulus: {
          value: null,
          unit: 'pa',
          coefficient: 1
        },
        momentOfInertia: {
          value: null,
          unit: 'mm^4',
          coefficient: 1
        }
      }
    ],
    loads: {
      pointLoads: [
        {
          location: 12,
          magnitude: 12.5,
          unit: 'kn'
        },
      ],
      distributedLoads: [],
      moments: [
        {
          location: 2,
          magnitude: 25,
          unit: 'kn.m',
          isClockwise: true,
        },
        {
          location: 7,
          magnitude: 20,
          unit: 'kn.m',
          isClockwise: true
        },
      ]
    },
    noOfSpans: 3
  },
  result: {
    displacements: [-0.2804, 8.0608, -2.7947],
    reactions: [-5.3327, 0, -0.1925, 0, 9.2544, 0, 8.7707, -10.1178]
  }
}