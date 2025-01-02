/**
 * The Matrix class aids in the matrix calculations
 */

export default class Matrix {
  public data: number[][];

  /**
   * Constructor for the matrix
   *
   * @param rows number of rows in the matrix
   * @param cols number of columns in the matrix
   */
  constructor(rows: number, cols: number, fillValue: number = 0) {
    this.data = Array.from({ length: rows }, () => Array(cols).fill(fillValue));
  }

  /**
   * Creates a Matrix object from a 2D array of numbers
   *
   * @static
   * @param array 2D array of numbers
   * @returns Matrix object
   */
  public static fromArray(array: number[][]): Matrix {
    if (!array || array.length === 0) {
        throw new Error('Cannot create matrix from empty array');
    }
    
    if (!array[0]) {
        throw new Error('First row of array is undefined');
    }

    const rows = array.length;
    const cols = array?.[0]?.length;
    const matrix = new Matrix(rows, cols);
    matrix.data = array;
    return matrix;
}

  /**
   * Adds two matrices together
   *
   * @static
   * @param matrixA first matrix
   * @param matrixB second matrix
   * @returns Matrix object
   */
  public static add(matrixA: Matrix, matrixB: Matrix): Matrix {
    if (!matrixA.isSameSize(matrixB)) {
      throw new Error("Matrices are not the same size.");
    }

    const resultData: number[][] = [];

    for (let i = 0; i < matrixA.rows; i++) {
      resultData[i] = [];
      for (let j = 0; j < matrixA.cols; j++) {
        resultData[i][j] = matrixA.data[i][j] + matrixB.data[i][j];
      }
    }

    const resultMatrix = new Matrix(matrixA.rows, matrixA.cols);
    resultMatrix.data = resultData;
    return resultMatrix;
  }

  /**
   * Subtracts two matrices
   *
   * @static
   * @param matrixA first matrix
   * @param matrixB second matrix
   * @returns Matrix object
   */
  public static subtract(matrixA: Matrix, matrixB: Matrix): Matrix {
    if (!matrixA.isSameSize(matrixB)) {
      throw new Error("Matrices are not the same size.");
    }

    const resultData: number[][] = [];

    for (let i = 0; i < matrixA.rows; i++) {
      resultData[i] = [];
      for (let j = 0; j < matrixA.cols; j++) {
        resultData[i][j] = matrixA.data[i][j] - matrixB.data[i][j];
      }
    }

    const resultMatrix = new Matrix(matrixA.rows, matrixA.cols);
    resultMatrix.data = resultData;
    return resultMatrix;
  }

  /**
   * Multiplies two matrices
   *
   * @static
   * @param matrixA first matrix
   * @param matrixB second matrix
   * @returns Matrix object
   */
  public static multiply(matrixA: Matrix, matrixB: Matrix): Matrix {
    if (matrixA.cols !== matrixB.rows) {
      throw new Error("Matrix A columns must match Matrix B rows.");
    }

    const resultData: number[][] = [];

    for (let i = 0; i < matrixA.rows; i++) {
      resultData[i] = [];
      for (let j = 0; j < matrixB.cols; j++) {
        let sum = 0;
        for (let k = 0; k < matrixA.cols; k++) {
          sum += matrixA.data[i][k] * matrixB.data[k][j];
        }
        resultData[i][j] = sum;
      }
    }

    const resultMatrix = new Matrix(matrixA.rows, matrixB.cols);
    resultMatrix.data = resultData;
    return resultMatrix;
  }

  /**
   * Multiplies a matrix by a scalar
   *
   * @param scalar - scalar value
   * @returns Matrix object
   */
  public scalarMultiply(scalar: number): Matrix {
    const resultData: number[][] = [];

    for (let i = 0; i < this.rows; i++) {
      resultData[i] = [];
      for (let j = 0; j < this.cols; j++) {
        resultData[i][j] = this.data[i][j] * scalar;
      }
    }

    const resultMatrix = new Matrix(this.rows, this.cols);
    resultMatrix.data = resultData;
    return resultMatrix;
  }

  /**
   * strikes out specified rows and columns from a matrix
   *
   * @param rowIndices - rows to strike out
   * @param colIndices - columns to strike out
   * @returns Matrix object
   */
  public strike(rowIndices: number[], colIndices: number[]): Matrix {
    const filteredRows = this.data.filter(
      (_, rowIndex) => !rowIndices.includes(rowIndex)
    );
    const filteredData = filteredRows.map((row) =>
      row.filter((_, colIndex) => !colIndices.includes(colIndex))
    );
    return Matrix.fromArray(filteredData);
  }

  /**
   * Checks if two matrices are the same size
   *
   * @param matrix - matrix to compare with
   * @returns boolean
   */
  public isSameSize(matrix: Matrix): boolean {
    return this.rows === matrix.rows && this.cols === matrix.cols;
  }

  /**
   * Getter for the number of rows in the matrix
   *
   * @returns number of rows
   */
  public get rows(): number {
    return this.data.length;
  }

  /**
   * Getter for the number of columns in the matrix
   *
   * @returns number of columns
   */
  public get cols(): number {
    return this.data[0]?.length || 0;
  }

  /**
   * Getter for the matrix data
   *
   * @returns matrix data
   */
  public get matrixData(): number[][] {
    return this.data;
  }

  /**
   * Gets a particular element in the matrix
   *
   * @param row - row index
   * @param col - column index
   * @returns element in the matrix
   */
  public get(row: number, col: number): number {
    return this.data[row][col];
  }

  /**
   * Sets a particular element in the matrix
   *
   * @param row - row index
   * @param col - column index
   * @param value - value to set
   */
  public set(row: number, col: number, value: number): void {
    this.data[row][col] = value;
  }
}
