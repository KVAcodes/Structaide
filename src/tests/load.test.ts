import Load from '../lib/beam/numericCalculations/utils/load';

describe('Load Class', () => {
    test('Should create a class instance with valid unit input', () => {
        const load = new Load(1, 'kn');
        expect(load).toBeInstanceOf(Load);
    });

    test('Should throw an error with invalid unit input', () => {
        expect(() => new Load(1, 'newton')).toThrow("Unit 'newton' is not recognized.");
    });

    test('Should convert unit strings to lowercase', () => {
        const load = new Load(1, 'KIPF');
        expect(load.valueInKipf).toBe(1);
    });

    test('Should convert to each unit accurately from KN', () =>{
        const load = new Load(1, 'kn');
        expect(load.valueInKN).toBe(1);
        expect(load.valueInN).toBe(1000);
        expect(load.valueInKgf).toBeCloseTo(101.936);
        expect(load.valueInLbf).toBeCloseTo(224.809);
        expect(load.valueInKipf).toBeCloseTo(0.224809);
    });

    test('Should convert to each unit accurately from N', () =>{
        const load = new Load(1, 'n');
        expect(load.valueInKN).toBe(0.001);
        expect(load.valueInN).toBe(1);
        expect(load.valueInKgf).toBeCloseTo(0.1019716);
        expect(load.valueInLbf).toBeCloseTo(0.224809);
        expect(load.valueInKipf).toBeCloseTo(0.000224809);
    });

    test('Should convert to each unit accurately from KGF', () =>{
        const load = new Load(1, 'kgf');
        expect(load.valueInKN).toBeCloseTo(0.00981);
        expect(load.valueInN).toBeCloseTo(9.81);
        expect(load.valueInKgf).toBe(1);
        expect(load.valueInLbf).toBeCloseTo(2.20462);
        expect(load.valueInKipf).toBeCloseTo(0.00220462);
    });

    test('Should convert to each unit accurately from LBF', () =>{
        const load = new Load(1, 'lbf');
        expect(load.valueInKN).toBeCloseTo(0.00444822);
        expect(load.valueInN).toBeCloseTo(4.44822);
        expect(load.valueInKgf).toBeCloseTo(0.453592);
        expect(load.valueInLbf).toBe(1);
        expect(load.valueInKipf).toBeCloseTo(0.001);
    });

    test('Should convert to each unit accurately from KIPF', () =>{
        const load = new Load(1, 'kipf');
        expect(load.valueInKN).toBeCloseTo(4.44822);
        expect(load.valueInN).toBeCloseTo(4448.22);
        expect(load.valueInKgf).toBeCloseTo(453.44);
        expect(load.valueInLbf).toBe(1000);
        expect(load.valueInKipf).toBe(1);
    });

    test('Zero value should convert to zero in all units', () => {
        const load = new Load(0, 'kn');
        expect(load.valueInKN).toBe(0);
        expect(load.valueInN).toBe(0);
        expect(load.valueInKgf).toBe(0);
        expect(load.valueInLbf).toBe(0);
        expect(load.valueInKipf).toBe(0);
   });

   test('Negative value should convert to negative in all units', () => {
        const load = new Load(-1, 'kn');
        expect(load.valueInKN).toBe(-1);
        expect(load.valueInN).toBe(-1000);
        expect(load.valueInKgf).toBeCloseTo(-101.936);
        expect(load.valueInLbf).toBeCloseTo(-224.809);
        expect(load.valueInKipf).toBeCloseTo(-0.224809);
   });
});