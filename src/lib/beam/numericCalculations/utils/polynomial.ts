/**
 * This module contains the Polynomial class
 */
interface Coefficients {
  A0: number;
  A1: number;
  A2: number;
  A3: number;
  A4: number;
  A5: number;
}

export class Polynomial {
    public coefficients: Coefficients;
    
    /**
     * Constructor for the Polynomial class
     * 
     * @param coefficients - an array of coefficients in the order of A0, A1, A2, A3, A4, A5
     */
    constructor(coefficients: number[] = new Array(6).fill(0)) {
        this.coefficients = {
            A0: coefficients[0],
            A1: coefficients[1],
            A2: coefficients[2],
            A3: coefficients[3],
            A4: coefficients[4],
            A5: coefficients[5],
        };
    }


    /**
     * Adds two or more polynomial objects
     * 
     * @param polynomials - a variable number of polynomial objects
     * @returns {Polynomial} - resulting polynomial
     */
    public static add(...polynomials: Polynomial[]): Polynomial {
        const coefficients = new Array(6).fill(0);
        polynomials.forEach((polynomial) => {
            coefficients[0] += polynomial.coefficients.A0;
            coefficients[1] += polynomial.coefficients.A1;
            coefficients[2] += polynomial.coefficients.A2;
            coefficients[3] += polynomial.coefficients.A3;
            coefficients[4] += polynomial.coefficients.A4;
            coefficients[5] += polynomial.coefficients.A5;
        });
        return new Polynomial(coefficients);
    };
    

    /**
     * evaluates the polynomial at a given x
     * 
     * @param x - the value of x
     * @returns {number} - the value of the polynomial at x
     */
    public evaluate(x: number): number {
        return (
        this.coefficients.A0 +
        this.coefficients.A1 * x +
        this.coefficients.A2 * x ** 2 +
        this.coefficients.A3 * x ** 3 +
        this.coefficients.A4 * x ** 4 +
        this.coefficients.A5 * x ** 5
        );
    }
}
