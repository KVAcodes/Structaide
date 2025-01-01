/**
 * The Length Class handles the conversion of length values between different units.
 */

export default class Length {
    private static unitConversions: { [key: string]: number } = {
        'm': 1, // meter
        'cm': 1e-2, // centimeter
        'mm': 1e-3, // millimeter
        'km': 1e3, // kilometer
        'in': 0.0254, // inch
        'ft': 0.3048, // foot
        'yd': 0.9144 // yard
    };

    // each Length object will have a value in every unit
    public meters: number;
    public centimeters: number;
    public millimeters: number;
    public kilometers: number;
    public inches: number;
    public feet: number;
    public yards: number;


    /**
     * Constructor for the Length class
     * @param lengthValue The value of the length
     * @param unit The unit of the length
     */
    constructor(lengthValue: number, unit: string) {
        unit = unit.toLowerCase(); // Normalize unit input
        // if unit is not supported, throw an error
        if (!Length.unitConversions[unit]) {
            throw new Error(`Unit '${unit}' is not supported.`);
        }

        // Convert the input value to meters
        const meters = lengthValue * Length.unitConversions[unit];

        // Store the value in all units
        this.meters = meters;
        this.centimeters = meters / Length.unitConversions['cm'];
        this.millimeters = meters / Length.unitConversions['mm'];
        this.kilometers = meters / Length.unitConversions['km'];
        this.inches = meters / Length.unitConversions['in'];
        this.feet = meters / Length.unitConversions['ft'];
        this.yards = meters / Length.unitConversions['yd'];
    }
}