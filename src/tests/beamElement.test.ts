import {
  BeamElement,
  BeamElementDataInterface,
} from "@/lib/beam/numericCalculations/utils/beamElement";
import { FlexuralRigidity } from "@/lib/beam/numericCalculations/utils/flexuralRigidity";
import Matrix from "@/lib/beam/numericCalculations/utils/matrices";
import exp from "constants";

describe("BeamElement Class", () => {
  let beamElementData: BeamElementDataInterface;
  beforeEach(() => {
    beamElementData = {
      isMetric: true,
      spanNo: 1,
      start: 0,
      end: 5,
      length: 5,
      section: new FlexuralRigidity({
        CoefficientOfE: 1,
        CoefficientOfI: 1,
      }),
      boundaries: [
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
      pointLoads: [
        {
          location: 0,
          magnitude: 10,
          unit: "kn",
        },
        {
          location: 2.5,
          magnitude: 10,
          unit: "kn",
        },
        {
          location: 5,
          magnitude: 10,
          unit: "kn", 
        }
      ],
      moments: [
        {
          location: 0,
          magnitude: 20,
          unit: "kn.m",
          isClockwise: false,
        },
        {
          location: 5,
          magnitude: -20, // added negative since the moment magnitudes are resolved in beam Object 
          unit: "kn.m",
          isClockwise: true,
        },
        
      ],
    };
  });

  test("BeamElement Class should be defined", () => {
    const beamElement1 = new BeamElement(beamElementData);
    expect(beamElement1).toBeDefined();
  });

  test("setDOFlabels", () => {
    let beamElement1 = new BeamElement(beamElementData);
    expect(beamElement1.dofLabels).toEqual({
      local: [0, 1, 2, 3],
      global: [0, 1, 2, 3],
    });
    beamElementData.spanNo = 2;
    beamElement1 = new BeamElement(beamElementData);
    expect(beamElement1.dofLabels).toEqual({
      local: [0, 1, 2, 3],
      global: [2, 3, 4, 5],
    });
  });

  test("Calculate Stiffness Matrices", () => {
    let beamElement1 = new BeamElement(beamElementData);
    expect(beamElement1.stiffnessMatrices).toEqual({
      normal: expect.any(Matrix),
    });

    beamElementData.boundaries[0].type = "internalHinge";
    beamElement1 = new BeamElement(beamElementData);
    expect(beamElement1.stiffnessMatrices).toEqual({
      normal: expect.any(Matrix),
      leftReleased: expect.any(Matrix),
    });

    beamElementData.boundaries[0].type = "pinned";
    beamElementData.boundaries[1].type = "internalHinge";
    beamElement1 = new BeamElement(beamElementData);
    expect(beamElement1.stiffnessMatrices).toEqual({
      normal: expect.any(Matrix),
      rightReleased: expect.any(Matrix),
    }); 
  });

  test("LocalNodalForceVector", () => {
    let beamElement1 = new BeamElement(beamElementData);
    expect(beamElement1.localNodalForceVector).toEqual(expect.any(Matrix));
    expect(beamElement1.localNodalForceVector.data).toEqual([[-10], [20], [-10], [-20]]);
  });

  test("LocalEquivalentForceVector without only pointLoad", () => {
    let beamElement1 = new BeamElement(beamElementData);
    expect(beamElement1.localEquivalentForceVector).toEqual(expect.any(Matrix));
    expect(beamElement1.localEquivalentForceVector.data).toEqual([[-5], [-6.25], [-5], [6.25]]);
  });

  test("LocalEquivalentForceVector with full span distributed load", () => {
    beamElementData.distributedLoads = [
      {
        start: 0,
        end: 5,
        startMag: 10,
        endMag: 10,
        unit: "kn/m",
      },
    ];
    let beamElement1 = new BeamElement(beamElementData);
    const expected = [[-30], [-27.083333333], [-30], [27.083333333]];
    beamElement1.localEquivalentForceVector.data.forEach((value, index) => {
      expect(value[0]).toBeCloseTo(expected[index][0]);
    });
  });

  test("LocalEquivalentForceVector with partial span distributed load", () => {
    beamElementData.pointLoads = [];
    beamElementData.distributedLoads = [
      {
        start: 0,
        end: 2.5,
        startMag: 10,
        endMag: 10,
        unit: "kn/m",
      },
    ];
    let beamElement1 = new BeamElement(beamElementData);
    const expected = [[-20.3125], [-14.32291667], [-4.6875], [6.510416667]];
    beamElement1.localEquivalentForceVector.data.forEach((value, index) => {
      expect(value[0]).toBeCloseTo(expected[index][0]);
    });
  });

  test("LocalEquivalentForceVector with full span right angled triangular distributed load", () => {
    beamElementData.pointLoads = [];
    beamElementData.distributedLoads = [
      {
        start: 0,
        end: 5,
        startMag: 10,
        endMag: 0,
        unit: "kn/m",
      },
    ];
    let beamElement1 = new BeamElement(beamElementData);
    const expected = [[-17.5], [-12.5], [-7.5], [8.3333333]];
    beamElement1.localEquivalentForceVector.data.forEach((value, index) => {
      expect(value[0]).toBeCloseTo(expected[index][0]);
    });
  });

  test("LocalEquivalentForceVector with full span isoceles triangular distributed load", () => {
    beamElementData.pointLoads = [];
    beamElementData.distributedLoads = [
      {
        start: 0,
        end: 2.5,
        startMag: 0,
        endMag: 10,
        unit: "kn/m",
      },
      {
        start: 2.5,
        end: 5,
        startMag: 10,
        endMag: 0,
        unit: "kn/m",
      }
    ];

    let beamElement1 = new BeamElement(beamElementData);
    const expected = [[-12.5], [-13.02083333], [-12.5], [13.02083333]];
    beamElement1.localEquivalentForceVector.data.forEach((value, index) => {
      expect(value[0]).toBeCloseTo(expected[index][0]);
    });
  });

  test("localEquivalentForceVector with eccentric moment", () => {
    beamElementData.pointLoads = [];
    beamElementData.moments?.push({
      location: 2,
      magnitude: -10,
      unit: "kn.m",
      isClockwise: true,
    });

    let beamElement1 = new BeamElement(beamElementData);
    const expected = [[2.88], [1.2], [-2.88], [3.2]];
    beamElement1.localEquivalentForceVector.data.forEach((value, index) => {
      expect(value[0]).toBeCloseTo(expected[index][0]);
    });

  });
});
