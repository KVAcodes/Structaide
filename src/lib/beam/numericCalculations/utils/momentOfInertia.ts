/**
 * The MomentOfInertia class handles the conversion between different units of moment of inertia.
 */

export class MomentOfInertia {
  private static unitConversions: { [key: string]: number } = {
    "m^4": 1, // Base unit for metric (m^4)
    "cm^4": 1e8, // 1 m^4 = 1e8 cm^4
    "mm^4": 1e12, // 1m^4 = 1e12 mm^4
    "in^4": 2402509.60999039, // 1 m^4 = 2402509.60999039 in^4
    "ft^4": 115.861767, // 1 m^4 = 115.861767 ft^4
  };
  public valueInM4: number; // Metric value in m^4
  public valueInCm4: number; // Metric value in cm^4
  public valueInMm4: number; // Metric value in mm^4
  public valueInIn4: number; // Imperial value in in^4
  public valueInFt4: number; // Imperial value in ft^4

  /**
   * Constructor for the MomentOfInertia class.
   * @param value The value of the moment of inertia.
   * @param unit The unit of the moment of inertia.
   */

  constructor(value: number, unit: string) {
    unit = unit.toLowerCase();

    if (!MomentOfInertia.unitConversions[unit]) {
      throw new Error(`Unit '${unit}' is not supported.`);
    }

    this.valueInM4 = Math.abs(value) / MomentOfInertia.unitConversions[unit];

    this.valueInCm4 = this.valueInM4 * MomentOfInertia.unitConversions["cm^4"];
    this.valueInMm4 = this.valueInM4 * MomentOfInertia.unitConversions["mm^4"];
    this.valueInIn4 = this.valueInM4 * MomentOfInertia.unitConversions["in^4"];
    this.valueInFt4 = this.valueInM4 * MomentOfInertia.unitConversions["ft^4"];
  }
}
