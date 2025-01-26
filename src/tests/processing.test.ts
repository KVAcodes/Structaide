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
    beam24,
    beam25,
    beam26,
    beam27,
    beam28,
  } from "../lib/beam/numericCalculations/testQuestions/Examples";
import { Beam } from "@/lib/beam/numericCalculations/utils/beam";

describe("processBeam", () => {
    test.only("beam23 passes", () => {
      const beam = new Beam(processBeam(beam23.beam));
      beam.beamElements.forEach((element) => {
        console.log(element.localForces.matrixData.flat());
        console.log(element.getData().boundaries);
      });
      console.log(beam.solvedDisplacements);
      console.log(beam.reactions.matrixData.flat());

    });

    test("beam24 passes", () => {
      const beam = new Beam(processBeam(beam24.beam));
      beam.beamElements.forEach((element) => {
        console.log(element.localForces.matrixData.flat());
        console.log(element.getData().boundaries);
      });
      console.log(beam.solvedDisplacements);
      console.log(beam.reactions.matrixData.flat());
    });

    test("beam25 passes", () => {
      const beam = new Beam(processBeam(beam25.beam));
      beam.beamElements.forEach((element) => {
        console.log(element.localForces.matrixData.flat());
        console.log(element.getData().boundaries);
      });
      console.log(beam.solvedDisplacements);
      console.log(beam.reactions.matrixData.flat());
    });

    test("beam26 passes", () => {
      const beam = new Beam(processBeam(beam26.beam));
      beam.beamElements.forEach((element) => {
        console.log(element.localForces.matrixData.flat());
        console.log(element.getData().boundaries);
      });
      console.log(beam.solvedDisplacements);
      console.log(beam.reactions.matrixData.flat());
    });

    test("beam27 passes", () => {
      const beam = new Beam(processBeam(beam27.beam));
      beam.beamElements.forEach((element) => {
        console.log(element.localForces.matrixData.flat());
        console.log(element.getData().boundaries);
      });
      console.log(beam.solvedDisplacements);
      console.log(beam.reactions.matrixData.flat());
    });

    test("beam28 passes", () => {
      const beam = new Beam(processBeam(beam28.beam));
      beam.beamElements.forEach((element) => {
        console.log(element.localForces.matrixData.flat());
        console.log(element.getData().boundaries);
      });
      console.log(beam.solvedDisplacements);
      console.log(beam.reactions.matrixData.flat());
    });
});
