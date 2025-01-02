import { YoungModulus } from "../lib/beam/numericCalculations/utils/youngModulus";

describe("Young Modulus class", () => {
  test("Should throw an error with invalid unit input", () => {
    expect(() => new YoungModulus(1, "pascal")).toThrow(
      "Unit 'pascal' is not supported."
    );
  });

  test("Should create a class instance with valid unit input", () => {
    const youngModulus = new YoungModulus(1, "gpa");
    expect(youngModulus).toBeInstanceOf(YoungModulus);
  });

  test("Should convert to each unit accurately from gpa", () => {
    const youngModulus = new YoungModulus(1, 'gpa');
    expect(youngModulus.valueInGPa).toBe(1);
    expect(youngModulus.valueInKPa).toBeCloseTo(1e6);
    expect(youngModulus.valueInMPa).toBeCloseTo(1e3);
    expect(youngModulus.valueInPa).toBeCloseTo(1e9);
    expect(youngModulus.valueInPsi).toBeCloseTo(145037.73773);
    expect(youngModulus.valueInPsf).toBeCloseTo(20885433.788371);
    expect(youngModulus.valueInKsi).toBeCloseTo(145.03773773);
  });

    test("Should convert to each unit accurately from kpa", () => {
        const youngModulus = new YoungModulus(1e6, 'kpa');
        expect(youngModulus.valueInGPa).toBeCloseTo(1);
        expect(youngModulus.valueInKPa).toBe(1e6);
        expect(youngModulus.valueInMPa).toBeCloseTo(1e3);
        expect(youngModulus.valueInPa).toBeCloseTo(1e9);
        expect(youngModulus.valueInPsi).toBeCloseTo(145037.73773);
        expect(youngModulus.valueInPsf).toBeCloseTo(20885433.788371);
        expect(youngModulus.valueInKsi).toBeCloseTo(145.03773773);
    });

    test("Should convert to each unit accurately from mpa", () => {
        const youngModulus = new YoungModulus(1e3, 'mpa');
        expect(youngModulus.valueInGPa).toBeCloseTo(1);
        expect(youngModulus.valueInKPa).toBeCloseTo(1e6);
        expect(youngModulus.valueInMPa).toBe(1e3);
        expect(youngModulus.valueInPa).toBeCloseTo(1e9);
        expect(youngModulus.valueInPsi).toBeCloseTo(145037.73773);
        expect(youngModulus.valueInPsf).toBeCloseTo(20885433.788371);
        expect(youngModulus.valueInKsi).toBeCloseTo(145.03773773);
    });

    test("Should convert to each unit accurately from pa", () => {
        const youngModulus = new YoungModulus(1e9, 'pa');
        expect(youngModulus.valueInGPa).toBeCloseTo(1);
        expect(youngModulus.valueInKPa).toBeCloseTo(1e6);
        expect(youngModulus.valueInMPa).toBeCloseTo(1e3);
        expect(youngModulus.valueInPa).toBe(1e9);
        expect(youngModulus.valueInPsi).toBeCloseTo(145037.73773);
        expect(youngModulus.valueInPsf).toBeCloseTo(20885433.788371);
        expect(youngModulus.valueInKsi).toBeCloseTo(145.03773773);
    });

    test("Should convert to each unit accurately from psi", () => {
        const youngModulus = new YoungModulus(145037.73773, 'psi');
        expect(youngModulus.valueInGPa).toBeCloseTo(1);
        expect(youngModulus.valueInKPa).toBeCloseTo(1e6);
        expect(youngModulus.valueInMPa).toBeCloseTo(1e3);
        expect(youngModulus.valueInPa).toBeCloseTo(1e9);
        expect(youngModulus.valueInPsi).toBeCloseTo(145037.73773);
        expect(youngModulus.valueInPsf).toBeCloseTo(20885433.788371);
        expect(youngModulus.valueInKsi).toBeCloseTo(145.03773773);
    });

    test("Should convert to each unit accurately from psf", () => {
        const youngModulus = new YoungModulus(20885433.788371, 'psf');
        expect(youngModulus.valueInGPa).toBeCloseTo(1);
        expect(youngModulus.valueInKPa).toBeCloseTo(1e6);
        expect(youngModulus.valueInMPa).toBeCloseTo(1e3);
        expect(youngModulus.valueInPa).toBeCloseTo(1e9);
        expect(youngModulus.valueInPsi).toBeCloseTo(145037.73773);
        expect(youngModulus.valueInPsf).toBeCloseTo(20885433.788371);
        expect(youngModulus.valueInKsi).toBeCloseTo(145.03773773);
    });

    test("Should convert to each unit accurately from ksi", () => {
        const youngModulus = new YoungModulus(145.03773773, 'ksi');
        expect(youngModulus.valueInGPa).toBeCloseTo(1);
        expect(youngModulus.valueInKPa).toBeCloseTo(1e6);
        expect(youngModulus.valueInMPa).toBeCloseTo(1e3);
        expect(youngModulus.valueInPa).toBeCloseTo(1e9);
        expect(youngModulus.valueInPsi).toBeCloseTo(145037.73773);
        expect(youngModulus.valueInPsf).toBeCloseTo(20885433.788371);
        expect(youngModulus.valueInKsi).toBeCloseTo(145.03773773);
    });
});
