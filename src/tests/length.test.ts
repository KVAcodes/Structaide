import Length from '../lib/beam/numericCalculations/utils/length';

describe('Length Class', () => {
    test('Should create a class instance with valid unit input', () => {
        const length = new Length(1, 'm');
        expect(length).toBeInstanceOf(Length);
    });
    test('Should throw an error with invalid unit input', () => {
        expect(() => new Length(1, 'meter')).toThrow("Unit 'meter' is not supported.");
    });
    test('Should convert unit strings to lowercase', () => {
        const length = new Length(1, 'MM');
        expect(length.millimeters).toBe(1);
    });
    test('Should convert to each unit accurately from m', () =>{
        const length = new Length(1, 'm');
        expect(length.centimeters).toBe(100);
        expect(length.millimeters).toBe(1000);
        expect(length.kilometers).toBe(0.001);
        expect(length.inches).toBeCloseTo(39.3701);
        expect(length.feet).toBeCloseTo(3.28084);
        expect(length.yards).toBeCloseTo(1.09361);
    });
    test('Should convert to each unit accurately from cm', () =>{
        const length = new Length(1, 'cm');
        expect(length.meters).toBe(0.01);
        expect(length.millimeters).toBe(10);
        expect(length.kilometers).toBe(1e-5);
        expect(length.inches).toBeCloseTo(0.393701);
        expect(length.feet).toBeCloseTo(0.0328084);
        expect(length.yards).toBeCloseTo(0.0109361);
    });
    test('Should convert to each unit accurately from mm', () =>{
        const length = new Length(1, 'mm');
        expect(length.meters).toBe(0.001);
        expect(length.centimeters).toBe(0.1);
        expect(length.kilometers).toBe(1e-6);
        expect(length.inches).toBeCloseTo(0.0393701);
        expect(length.feet).toBeCloseTo(0.00328084);
        expect(length.yards).toBeCloseTo(0.00109361);
    });
    test('Should convert to each unit accurately from km', () =>{
        const length = new Length(1, 'km');
        expect(length.meters).toBe(1000);
        expect(length.centimeters).toBe(100000);
        expect(length.millimeters).toBe(1e6);
        expect(length.inches).toBeCloseTo(39370.08);
        expect(length.feet).toBeCloseTo(3280.84);
        expect(length.yards).toBeCloseTo(1093.61);
    });
    test('Should convert to each unit accurately from in', () =>{
        const length = new Length(1, 'in');
        expect(length.meters).toBeCloseTo(0.0254);
        expect(length.centimeters).toBe(2.54);
        expect(length.millimeters).toBe(25.4);
        expect(length.kilometers).toBeCloseTo(2.54e-5);
        expect(length.feet).toBeCloseTo(0.0833333);
        expect(length.yards).toBeCloseTo(0.0277778);
    });
    test('Should convert to each unit accurately from ft', () =>{
        const length = new Length(1, 'ft');
        expect(length.meters).toBeCloseTo(0.3048);
        expect(length.centimeters).toBe(30.48);
        expect(length.millimeters).toBe(304.8);
        expect(length.kilometers).toBeCloseTo(0.0003048);
        expect(length.inches).toBeCloseTo(12);
        expect(length.yards).toBeCloseTo(0.333333);
    });
    test('Should convert to each unit accurately from yd', () =>{
        const length = new Length(1, 'yd');
        expect(length.meters).toBeCloseTo(0.9144);
        expect(length.centimeters).toBe(91.44);
        expect(length.millimeters).toBe(914.4);
        expect(length.kilometers).toBeCloseTo(0.0009144);
        expect(length.inches).toBeCloseTo(36);
        expect(length.feet).toBeCloseTo(3);
    });
    test('Test Zero Value', () => {
        const length = new Length(0, 'm');
        expect(length.meters).toBe(0);
        expect(length.centimeters).toBe(0);
        expect(length.millimeters).toBe(0);
        expect(length.kilometers).toBe(0);
        expect(length.inches).toBe(0);
        expect(length.feet).toBe(0);
        expect(length.yards).toBe(0);
    });
    test('Test Negative Value', () => {
        const length = new Length(-1, 'm');
        expect(length.meters).toBe(-1);
        expect(length.centimeters).toBe(-100);
        expect(length.millimeters).toBe(-1000);
        expect(length.kilometers).toBe(-0.001);
        expect(length.inches).toBeCloseTo(-39.3701);
        expect(length.feet).toBeCloseTo(-3.28084);
        expect(length.yards).toBeCloseTo(-1.09361);
    });
});