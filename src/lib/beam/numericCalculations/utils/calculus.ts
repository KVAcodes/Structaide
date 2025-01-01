/**
 * The calculus module contains functions that leverages the Simpson's rule to perform numerical integration.
 */

/**
 * Performs adaptive Simpson's rule integration to achieve a specified tolerance.
 * @param f The function to integrate.
 * @param a The lower bound of integration.
 * @param b The upper bound of integration.
 * @param tol The desired tolerance (default is 1e-6).
 * @param maxDepth The maximum recursion depth (default is 20).
 * @returns The approximate integral value.
 */
export function adaptiveSimpsonsRule(
  f: (x: number) => number,
  a: number,
  b: number,
  tol: number = 1e-6,
  maxDepth: number = 20
): number {
  function adaptiveSimpsonsAux(
    a: number,
    b: number,
    fa: number,
    fm: number,
    fb: number,
    depth: number
  ): number {
    const m = (a + b) / 2;
    const h = b - a;
    const fml = f((a + m) / 2);
    const fmr = f((m + b) / 2);
    const i1 = (h / 6) * (fa + 4 * fm + fb);
    const i2 = (h / 12) * (fa + 4 * fml + 2 * fm + 4 * fmr + fb);
    const error = (i2 - i1) / 15;

    if (depth >= maxDepth) {
      return i2 + error;
    }

    if (Math.abs(error) <= tol) {
      return i2 + error;
    }

    return (
      adaptiveSimpsonsAux(a, m, fa, fml, fm, depth + 1) +
      adaptiveSimpsonsAux(m, b, fm, fmr, fb, depth + 1)
    );
  }

  const fm = f((a + b) / 2);
  return adaptiveSimpsonsAux(a, b, f(a), fm, f(b), 0);
}

/**
 * builds a function using the Function constructor
 * @param expression The expression to build the function from.
 * @returns The function built from the expression.
 *
 */
export function buildFunction(expression: string): (x: number) => number {
  return new Function("x", `return ${expression}`) as (x: number) => number;
}

/**
 * Assembles the expression string for the function to be built for the given values of p and l of the various load cases
 *
 * @param end {"left" | "right"} The end of the element to which the fem is to be found.
 * @param p The load value or expression.
 * @param l The length value.
 * @returns The expression string for the function.
 */
export function assembleExpression(
  end: "left" | "right",
  p: number | string,
  l: number
): string {
  return end === "left"
    ? `(${p} * x * Math.pow(${l} - x, 2)) / Math.pow(${l}, 2)`
    : `(${p} * Math.pow(x, 2) * (${l} - x)) / Math.pow(${l}, 2)`;
}
