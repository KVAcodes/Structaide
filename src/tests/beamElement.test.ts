import {
  BeamElement,
  BeamElementDataInterface,
} from "@/lib/beam/numericCalculations/utils/beamElement";
import { FlexuralRigidity } from "@/lib/beam/numericCalculations/utils/flexuralRigidity";
import Matrix from "@/lib/beam/numericCalculations/utils/matrices";

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
          },
          rotation: {
            value: 0,
            unit: "radians",
            isClockwise: false,
          },
        },
        {
          type: "pinned",
          position: 5,
          settlement: {
            value: 0,
            unit: "m",
            direction: "down",
          },
          rotation: {
            value: 0,
            unit: "radians",
            isClockwise: false,
          },
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
});
