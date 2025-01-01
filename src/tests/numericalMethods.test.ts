import { conjugateGradient } from "../lib/beam/numericCalculations/utils/numericalMethods";

describe("Numerical Methods", () => {
  test("Conjugate Gradient Method", () => {
    const A = [[3, -0.1, -0.2], [0.1, 7, -0.3], [0.3, -0.2, 10]];
    const b = [7.85, -19.3, 71.4];
    const x = conjugateGradient(A, b);
    const expected = [3, -2.5, 7];
    x.forEach((val, i) => {
      expect(val).toBeCloseTo(expected[i], 5);
    });
  });

  test("should solve a single-equation system gracefully", () => {
    const A = [[5]];
    const b = [10];
    const x = conjugateGradient(A, b);
    expect(x[0]).toBeCloseTo(2);
  });

  test("should return initial guess for zero matrix (no unique solution)", () => {
    const A = [
      [0, 0],
      [0, 0],
    ];
    const b = [0, 0];
    const x = conjugateGradient(A, b);
    // Expect the solution to remain at the initial guess [0, 0]
    expect(x[0]).toBeCloseTo(0);
    expect(x[1]).toBeCloseTo(0);
  });

  test("should throw or behave consistently for non-square matrix", () => {
    const A = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const b = [7, 8];
    // Behavior depends on how the solver handles invalid inputs
    expect(() => conjugateGradient(A as any, b)).toThrow();
  });
});