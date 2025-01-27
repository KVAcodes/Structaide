import { PostProcess } from "@/lib/beam/numericCalculations/utils/postProcessing";
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

describe("PostProcess", () => {
    test("beam25 passes", () => {
        const results = new PostProcess(beam25.beam);
        console.dir(results.postProcessResults, { depth: null });
    });
    test.only("beam12 passes", () => {
        const results = new PostProcess(beam12.beam)
        console.dir(results.postProcessResults, { depth: null });
    });
});
