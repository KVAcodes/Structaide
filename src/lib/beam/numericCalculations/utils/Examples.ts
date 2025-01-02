import { BeamData } from "./uiInput";

// Examples of the input data for the beam analysis.

export const beam1: BeamData = {
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
};
