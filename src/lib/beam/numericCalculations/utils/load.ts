/**
 * The Load class handles conversion of load units between different systems.
 */

export default class Load {
    private static unitConversions: { [key: string]: number } = {
        'kn': 1, // Base unit for metric
        'n': 0.001, // 1 N = 0.001 KN
        'kgf': 0.00981, // 1 Kg = 0.00981 KN
        'lbf': 0.00444822, // 1 lbf = 0.00444822 KN
        'kipf': 4.44822 // 1 kip = 4.44822 KN
    };

    public valueInKN: number; // Converted value in KN
    public valueInN: number; // Converted value in N
    public valueInKgf: number; // Converted value in Kg
    public valueInLbf: number; // Converted value in lbf
    public valueInKipf: number; // Converted value in kips

    /**
     * Constructor for the Load class
     * @param value The value of the load
     * @param unit The unit of the load
     */
    constructor(value: number, unit: string) {
        unit = unit.toLowerCase(); // Normalize unit input
        // Check if unit is supported
        if (!Load.unitConversions[unit]) {
            throw new Error(`Unit '${unit}' is not recognized.`);
        }

        // Convert the input value to KN
        const valueInKN = value * Load.unitConversions[unit];

        // Store the value in all units
        this.valueInKN = valueInKN;
        this.valueInN = valueInKN / Load.unitConversions['n'];
        this.valueInKgf = valueInKN / Load.unitConversions['kgf'];
        this.valueInLbf = valueInKN / Load.unitConversions['lbf'];
        this.valueInKipf = valueInKN / Load.unitConversions['kipf'];
    }
}