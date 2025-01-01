import { adaptiveSimpsonsRule, buildFunction, assembleExpression } from "../lib/beam/numericCalculations/utils/calculus"; 

describe("Calculus", () => {
  test("should build a function from an expression", () => {
    const expression = "x ** 2";
    const func = buildFunction(expression);
    expect(func(2)).toBe(4);
  });

  test("should assemble the expression string for the function", () => {
    const p = "x";
    const l = 10;
    const expression = assembleExpression("left", p, l);
    expect(expression).toBe(`(${p} * x * Math.pow(${l} - x, 2)) / Math.pow(${l}, 2)`);
  });

  test("should integrate a function using adaptive Simpson's rule", () => {
    const f = (x: number) => x ** 2;
    const a = 0;
    const b = 1;
    const tol = 1e-6;
    const maxDepth = 20;
    const integral = adaptiveSimpsonsRule(f, a, b, tol, maxDepth);
    expect(integral).toBeCloseTo(1 / 3);
  });

  test.each([
    { p: 10, l: 4, a: 0, b: 4, expected: 13.333333333333334 }, // p is constant(udl)
    { p: 10, l: 4, a: 1, b: 3, expected: 9.1666666666666667 },
    { p: "((20 * (x - 1)) / (4 - 1))", l: 5, a: 1, b: 4, expected: 13.56 },  // p is linearly varying
    { p: "(((20 - 10)*(x - 1)/(4 - 1)) + 10)", l: 5, a: 1, b: 4, expected: 23.28 },  // p is linearly varying
    { p: "(20 * (4 - x) / (4 - 1))", l: 5, a: 1, b: 4, expected: 19.44 },  // p is linearly varying
    { p: "((10 * (4 - x) / (4 - 1)) + 10)", l: 5, a: 1, b: 4, expected: 26.22 },  // p is linearly varying
  ])("particular examples to be encountered", ({p, l, a, b, expected }) => {
    expect(adaptiveSimpsonsRule(buildFunction(assembleExpression("left", p, l)), a, b)).toBeCloseTo(expected);
  });

  test.each([
    {
      expression: "Math.sin(x)",
      a: 0,
      b: Math.PI,
      expected: 2,
    },
    {
      expression: "Math.exp(x)",
      a: 0,
      b: 1,
      expected: Math.E - 1,
    },
    {
      expression: "x * x * x", // x^3
      a: -2,
      b: 2,
      expected: 0, // symmetric about x=0 for x^3
    },
  ])("should integrate various functions correctly", ({ expression, a, b, expected }) => {
    const f = buildFunction(expression);
    const result = adaptiveSimpsonsRule(f, a, b);
    expect(result).toBeCloseTo(expected, 3);
  });

  test("should handle integration over negative intervals", () => {
    const f = (x: number) => x + 1;
    const result = adaptiveSimpsonsRule(f, -3, -1);
    // Integral of (x+1) from -3 to -1 is [0.5*x^2 + x]_(-3 to -1) = (0.5*(-1)^2 + (-1)) - (0.5*(-3)^2 + -3) = (0.5 -1) - (4.5 -3) = -0.5 - 1.5 = -2
    expect(result).toBeCloseTo(-2, 3);
  });
});