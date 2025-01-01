import Matrix from '../lib/beam/numericCalculations/utils/matrices';

describe('Matrix Class', () => {
    test('fromArray should return a matrix object', () => {
        const array = [[1, 2], [3, 4]];
        const matrix = Matrix.fromArray(array);
        expect(matrix).toBeInstanceOf(Matrix);
        expect(matrix.matrixData).toEqual(array);
    });

    test('add should return a matrix object', () => {
        const matrixA = Matrix.fromArray([[1, 2], [3, 4]]);
        const matrixB = Matrix.fromArray([[5, 6], [7, 8]]);
        const result = Matrix.add(matrixA, matrixB);
        expect(result).toBeInstanceOf(Matrix);
    });

    test('add should throw an error if matrices are not the same size', () => {
        const matrixA = Matrix.fromArray([[1, 2], [3, 4]]);
        const matrixB = Matrix.fromArray([[5, 6]]);
        expect(() => Matrix.add(matrixA, matrixB)).toThrow('Matrices are not the same size.');
    });

    test.each([
        {
            matrixA: [[1, 2], [3, 4]],
            matrixB: [[5, 6], [7, 8]],
            expected: [[6, 8], [10, 12]],
        },
        {
            matrixA: [[1, 2, 3], [4, 5, 6]],
            matrixB: [[7, 8, 9], [10, 11, 12]],
            expected: [[8, 10, 12], [14, 16, 18]],
        },
    ])('add should return the expected result', ({ matrixA, matrixB, expected }) => {
        const result = Matrix.add(Matrix.fromArray(matrixA), Matrix.fromArray(matrixB));
        expect(result.matrixData).toEqual(expected);
    });

    test('subtract should return a matrix object', () => {
        const matrixA = Matrix.fromArray([[1, 2], [3, 4]]);
        const matrixB = Matrix.fromArray([[5, 6], [7, 8]]);
        const result = Matrix.subtract(matrixA, matrixB);
        expect(result).toBeInstanceOf(Matrix);
    });

    test('subtract should throw an error if matrices are not the same size', () => {
        const matrixA = Matrix.fromArray([[1, 2], [3, 4]]);
        const matrixB = Matrix.fromArray([[5, 6]]);
        expect(() => Matrix.subtract(matrixA, matrixB)).toThrow('Matrices are not the same size.');
    });

    test.each([
        {
            matrixA: [[1, 2], [3, 4]],
            matrixB: [[5, 6], [7, 8]],
            expected: [[-4, -4], [-4, -4]],
        },
        {
            matrixA: [[1, 2, 3], [4, 5, 6]],
            matrixB: [[7, 8, 9], [10, 11, 12]],
            expected: [[-6, -6, -6], [-6, -6, -6]],
        },
    ])('subtract should return the expected result', ({ matrixA, matrixB, expected }) => {
        const result = Matrix.subtract(Matrix.fromArray(matrixA), Matrix.fromArray(matrixB));
        expect(result.matrixData).toEqual(expected);
    });

    test('multiply should return a matrix object', () => {
        const matrixA = Matrix.fromArray([[1, 2], [3, 4]]);
        const matrixB = Matrix.fromArray([[5, 6], [7, 8]]);
        const result = Matrix.multiply(matrixA, matrixB);
        expect(result).toBeInstanceOf(Matrix);
    });

    test('multiply should throw an error if matrix A columns do not match matrix B rows', () => {
        const matrixA = Matrix.fromArray([[1, 2], [3, 4]]);
        const matrixB = Matrix.fromArray([[5, 6]]);
        expect(() => Matrix.multiply(matrixA, matrixB)).toThrow('Matrix A columns must match Matrix B rows.');
    });

    test.each([
        {
            matrixA: [[1, 2], [3, 4]],
            matrixB: [[5, 6], [7, 8]],
            expected: [[19, 22], [43, 50]],
        },
        {
            matrixA: [[1, 2, 3], [4, 5, 6]],
            matrixB: [[7, 8], [9, 10], [11, 12]],
            expected: [[58, 64], [139, 154]],
        },
    ])('multiply should return the expected result', ({ matrixA, matrixB, expected }) => {
        const result = Matrix.multiply(Matrix.fromArray(matrixA), Matrix.fromArray(matrixB));
        expect(result.matrixData).toEqual(expected);
    });

    test('scalarMultiply should return a matrix object', () => {
        const matrix = Matrix.fromArray([[1, 2], [3, 4]]);
        const result = matrix.scalarMultiply(2);
        expect(result).toBeInstanceOf(Matrix);
    });

    test('scalarMultiply should return the expected result', () => {
        const matrix = Matrix.fromArray([[1, 2], [3, 4]]);
        const result = matrix.scalarMultiply(2);
        expect(result.matrixData).toEqual([[2, 4], [6, 8]]);
    });

    test('strike should return a matrix object', () => {
        const matrix = Matrix.fromArray([[1, 2], [3, 4]]);
        const result = matrix.strike([0], [0]);
        expect(result).toBeInstanceOf(Matrix);
    });
    
    test.each([
        {
            matrix: [[1, 2], [3, 4]],
            rowIndices: [0],
            colIndices: [0],
            expected: [[4]],
        },
        {
            matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
            rowIndices: [0, 2],
            colIndices: [0, 2],
            expected: [[5]],
        },
    ])('strike should return the expected result', ({ matrix, rowIndices, colIndices, expected }) => {
        const result = Matrix.fromArray(matrix).strike(rowIndices, colIndices);
        expect(result.matrixData).toEqual(expected);
    }); 

    test('isSameSize should return true if matrices are the same size', () => {
        const matrixA = Matrix.fromArray([[1, 2], [3, 4]]);
        const matrixB = Matrix.fromArray([[5, 6], [7, 8]]);
        expect(matrixA.isSameSize(matrixB)).toBe(true);
    });

    test('isSameSize should return false if matrices are not the same size', () => {
        const matrixA = Matrix.fromArray([[1, 2], [3, 4]]);
        const matrixB = Matrix.fromArray([[5, 6]]);
        expect(matrixA.isSameSize(matrixB)).toBe(false);
    });
});