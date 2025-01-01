import Moment from '../lib/beam/numericCalculations/utils/moment';

describe('Moment Class', () => {
    test('should throw an error if the unit is not supported', () => {
        expect(() => new Moment(20, 'knm')).toThrow("Unit 'knm' is not supported.");
    });

    test('should convert to each unit accurately from kn.m', () => {
        const moment = new Moment(1, 'kn.m');
        expect(moment.valueInKNm).toBe(1);
        expect(moment.valueInNm).toBe(1000);
        expect(moment.valueInKNmm).toBe(1000);
        expect(moment.valueInKgfm).toBeCloseTo(101.9716);
        expect(moment.valueInLbfIn).toBeCloseTo(8850.7324);
        expect(moment.valueInLbfFt).toBeCloseTo(737.5621);
        expect(moment.valueInKipIn).toBeCloseTo(8.8507);
        expect(moment.valueInKipFt).toBeCloseTo(0.7375);
    });

});