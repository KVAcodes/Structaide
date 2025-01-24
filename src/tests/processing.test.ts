import { processBeam } from "@/lib/beam/numericCalculations/utils/processing";
import { BeamData } from "@/lib/beam/numericCalculations/utils/uiInput";
import {
    beam1,
    beam2,
    beam3,
    beam4,
    beam5,
    beam6,
    beam7,
    beam8,
    beam9,
    beam10,
    beam11,
    beam12,
    beam13,
    beam14,
    beam15,
    beam16,
    beam17,
    beam18,
    beam19,
    beam20,
    beam21,
    beam22,
    beam23,
  } from "../lib/beam/numericCalculations/testQuestions/Examples";
import { Beam } from "@/lib/beam/numericCalculations/utils/beam";

describe("processBeam", () => {
    test("beam23 passes", () => {
      const beam = new Beam(processBeam(beam23.beam));
      beam.beamElements.forEach((element) => {
        console.log(element.localForces.matrixData.flat());
      });
    });
});
