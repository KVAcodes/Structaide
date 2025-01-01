/**
 * The Rotation class handles conversion of rotation units between radians and degrees.
 */

export default class Rotation {
    private static readonly radToDeg: number = 180 / Math.PI; // Conversion factor from radians to degrees
    private static readonly degToRad: number = Math.PI / 180; // Conversion factor from degrees to radians

    public valueInRadians: number; // Value in radians
    public valueInDegrees: number; // Value in degrees

    /**
     * Constructor for the Rotation class
     * @param value The value of the rotation
     * @param unit The unit of the rotation
     */
    constructor(value: number, unit: string) {
        unit = unit.toLowerCase();
        if (unit !== 'radians' && unit !== 'degrees') {
            throw new Error(`Unit '${unit}' is not supported.`);
        }
        if (unit === 'radians') {
            this.valueInRadians = value;
            this.valueInDegrees = value * Rotation.radToDeg;
        } else {
            this.valueInDegrees = value;
            this.valueInRadians = value * Rotation.degToRad;
        }
    }
}