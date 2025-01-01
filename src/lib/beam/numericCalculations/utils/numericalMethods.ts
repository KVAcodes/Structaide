/**
 * This module contain a function that leverages Numerical Methods to solve systems of equations.
 */

/**
 * Helper function: dot product of two vectors
 * @param v1 - First vector
 * @param v2 - Second vector
 * @returns Dot product of the two vectors
 */
function dotProduct(v1: number[], v2: number[]): number {
    return v1.reduce((sum, v1_i, i) => sum + v1_i * v2[i], 0);
}

/**
 * Helper function: matrix-vector multiplication
 * @param A - Matrix
 * @param x - Vector
 * @returns Matrix-vector product
 */
function matVecMul(A: number[][], x: number[]): number[] {
    return A.map(row => dotProduct(row, x));
}

/**
 * Helper function: scalar-vector multiplication
 * @param scalar - Scalar
 * @param v - Vector
 * @returns Scalar-vector product
 */
function scalarVecMul(scalar: number, v: number[]): number[] {
    return v.map(val => scalar * val);
}

/**
 * Helper function: vector addition
 * @param v1 - First vector
 * @param v2 - Second vector
 * @returns Sum of the two vectors
 */
function vecAdd(v1: number[], v2: number[]): number[] {
    return v1.map((v1_i, i) => v1_i + v2[i]);
}

/**
 * Helper function: vector subtraction
 * @param v1 - First vector
 * @param v2 - Second vector
 * @returns Difference of the two vectors
 */
function vecSub(v1: number[], v2: number[]): number[] {
    return v1.map((v1_i, i) => v1_i - v2[i]);
}

/**
 * Helper function: vector norm (magnitude)
 * @param v - Vector
 * @returns Magnitude of the vector
 */
function vecNorm(v: number[]): number {
    return Math.sqrt(dotProduct(v, v));
}

/**
 * Main Conjugate Gradient Method function
 * @param A - Coefficient matrix
 * @param b - Right-hand side vector
 * @param tol - Tolerance
 * @param maxIter - Maximum number of iterations
 * @returns Solution vector
 */
export function conjugateGradient(A: number[][], b: number[], tol: number = 1e-20, maxIter: number = 1000): number[] {
    // Check if the matrix is square
    if (A.some(row => row.length !== A.length)) {
        throw new Error("Matrix A must be square.");
    }

    // Helper function to detect a zero matrix
    function isZeroMatrix(matrix: number[][]): boolean {
        return matrix.every(row => row.every(val => val === 0));
    }

    // If the matrix is zero and b is zero, return the initial guess ([0,0,...])
    if (isZeroMatrix(A) && b.every(val => val === 0)) {
        return new Array(b.length).fill(0);
    }

    // check for 1 unknown equations
    if (A.length === 1 && b.length === 1){
        return [(b[0] / A[0][0])];
    }

    const n = b.length;
    let x = new Array(n).fill(0); // Initial guess: x = 0
    let r = vecSub(b, matVecMul(A, x)); // Initial residual: r_0 = b - A*x_0
    let p = r.slice(); // Initial direction: p_0 = r_0
    let rsOld = dotProduct(r, r); // Initial dot product of r_0 with itself

    for (let i = 0; i < maxIter; i++) {
        const Ap = matVecMul(A, p); // Matrix-vector multiplication A*p_k
        const alpha = rsOld / dotProduct(p, Ap); // Step size: α_k = (r_k^T * r_k) / (p_k^T * A * p_k)

        x = vecAdd(x, scalarVecMul(alpha, p)); // Update solution: x_(k+1) = x_k + α_k * p_k
        r = vecSub(r, scalarVecMul(alpha, Ap)); // Update residual: r_(k+1) = r_k - α_k * A * p_k

        if (vecNorm(r) < tol) { // Check for convergence
            console.log(`Converged in ${i + 1} iterations.`);
            break;
        }

        const rsNew = dotProduct(r, r); // New dot product of residual
        const beta = rsNew / rsOld; // β_k = (r_(k+1)^T * r_(k+1)) / (r_k^T * r_k)
        p = vecAdd(r, scalarVecMul(beta, p)); // Update direction: p_(k+1) = r_(k+1) + β_k * p_k

        rsOld = rsNew; // Update old residual dot product
    }

    if (vecNorm(r) > tol) {
        console.warn("Conjugate gradient did not converge.");
    }

    return x; // Returning the solution vector
}