/**
 * The Flexural Rigidity Class handles calculation of the Flexural Rigidity of a beam element.
 */

import YoungModulus from "./youngModulus";
import MomentOfInertia from "./momentOfInertia";

export interface FlexuralRigidityOptions {
  YoungModulusObject?: YoungModulus;
  MomentOfInertiaObject?: MomentOfInertia;
  CoefficientOfE: number;
  CoefficientOfI: number;
}

export class FlexuralRigidity {
  public valueInKNm2: number;
  public valueInLbin2: number;

  /**
   * Constructor for the FlexuralRigidity class.
   * @param options The options for the FlexuralRigidity class.
   */

  constructor(options: FlexuralRigidityOptions) {
    this.valueInKNm2 = this.safeMultiply([
      options.CoefficientOfE,
      options.CoefficientOfI,
      options.YoungModulusObject?.valueInKPa ?? 1,
      options.MomentOfInertiaObject?.valueInM4 ?? 1,
    ]);

    this.valueInLbin2 = this.safeMultiply([
      options.CoefficientOfE,
      options.CoefficientOfI,
      options.YoungModulusObject?.valueInPsi ?? 1,
      options.MomentOfInertiaObject?.valueInIn4 ?? 1,
    ]);
  }

  /**
   * A function to safely multiply a list of numbers.
   * @param values The list of numbers to multiply.
   * @returns The result of the multiplication.
   */
  private safeMultiply(values: number[]): number {
    return values.reduce((acc, val) => {
      if (!Number.isFinite(acc) || !Number.isFinite(val)) {
        throw new Error("Invalid input for multiplication");
      }
      const result = acc * val;
      if (!Number.isFinite(result)) {
        throw new Error("Numeric overflow in multiplication");
      }
      return result;
    }, 1);
  }
}
