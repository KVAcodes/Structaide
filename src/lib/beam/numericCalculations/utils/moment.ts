/**
 * The Moment class handles the conversion of moment values between different units.
 */

export default class Moment {
    private static unitConversion: { [key: string]: number } = {
        'kn.m': 1, // Base unit for metric
        'n.m': 0.001, // 1 Nm = 0.001 KN·m
        'kn.mm': 0.001, // 1 KN.mm = 0.001 KN.m
        'kgf.m': 0.00980665, // 1 kg·m = 0.00981 KN·m
        'lbf.in': 0.000112985, // 1 lbf·in = 0.000112985 KN·m
        'lbf.ft': 0.00135582, // 1 lbf·ft = 0.00135582 KN·m
        'kip.in': 0.112985, // 1 kip·in = 0.112985 KN·m
        'kip.ft': 1.35582 // 1 kip·ft = 1.35582 KN·m
    };

    public valueInKNm: number; // Converted value in KN·m
    public valueInNm: number; // Converted value in N.m
    public valueInKNmm: number; // Converted value in KN.mm
    public valueInKgfm: number; // Converted value in kg·m
    public valueInLbfIn: number; // Converted value in lbf·in
    public valueInLbfFt: number; // Converted value in lbf·ft
    public valueInKipIn: number; // Converted value in kip·in
    public valueInKipFt: number; // Converted value in kip·ft

    /**
     * Constructor for the Moment class
     * @param value The value of the moment
     * @param unit The unit of the moment
     */
    constructor(value: number, unit: string) {
        unit = unit.toLowerCase();
        // Check if unit is supported
        if (!Moment.unitConversion[unit]) {
            throw new Error(`Unit '${unit}' is not supported.`);
        }

        this.valueInKNm = value * Moment.unitConversion[unit];
        this.valueInNm = this.valueInKNm / Moment.unitConversion['n.m'];
        this.valueInKNmm = this.valueInKNm / Moment.unitConversion['kn.mm'];
        this.valueInKgfm = this.valueInKNm / Moment.unitConversion['kgf.m'];
        this.valueInLbfIn = this.valueInKNm / Moment.unitConversion['lbf.in'];
        this.valueInLbfFt = this.valueInKNm / Moment.unitConversion['lbf.ft'];
        this.valueInKipIn = this.valueInKNm / Moment.unitConversion['kip.in'];
        this.valueInKipFt = this.valueInKNm / Moment.unitConversion['kip.ft'];
    }
}
