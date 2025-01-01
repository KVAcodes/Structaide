import {
  FlexuralRigidityOptions,
  FlexuralRigidity,
} from "../lib/beam/numericCalculations/utils/flexuralRigidity";
import YoungModulus from "../lib/beam/numericCalculations/utils/youngModulus";
import MomentOfInertia from "../lib/beam/numericCalculations/utils/momentOfInertia";

describe("Flexural Rigidity", () => {
  test.each([
    [{
      CoefficientOfE: 1,
      CoefficientOfI: 1,
    }, 1, 1],
    [{
      CoefficientOfE: 1,
      CoefficientOfI: 1,
      YoungModulusObject: new YoungModulus(1, "kPa"),
      MomentOfInertiaObject: new MomentOfInertia(1, "m^4"),
    }, 1, 348454.5587],
    [{
      CoefficientOfE: 1,
      CoefficientOfI: 1,
      YoungModulusObject: new YoungModulus(1, "GPa"),
      MomentOfInertiaObject: new MomentOfInertia(1, "mm^4"),
    }, 10e-6, 0.34845],
    [{
        CoefficientOfE: 1,
        CoefficientOfI: 2,
        YoungModulusObject: new YoungModulus(1, "psi"),
    }, 13.7895, 2],
    [{
        CoefficientOfE: 1,
        CoefficientOfI: 2,
        MomentOfInertiaObject: new MomentOfInertia(1, "in^4"),
    }, 8.324628e-7, 2],
  ] as [FlexuralRigidityOptions, number, number][])(
    "should accurately calculate the metric and imperial values of Flexural Rigidity",
    (options, expectedMetricValue, expectedImperialValue) => {
      const flexuralRigidity = new FlexuralRigidity(options);
      expect(flexuralRigidity.valueInKNm2).toBeCloseTo(expectedMetricValue);
      expect(flexuralRigidity.valueInLbin2).toBeCloseTo(expectedImperialValue);
    }
  );

  test("should throw an error if the multiplication results in a numeric overflow", () => {
    const options: FlexuralRigidityOptions = {
      CoefficientOfE: Number.MAX_VALUE,
      CoefficientOfI: Number.MAX_VALUE,
    };
    expect(() => new FlexuralRigidity(options)).toThrow("Numeric overflow in multiplication");
  });
});
