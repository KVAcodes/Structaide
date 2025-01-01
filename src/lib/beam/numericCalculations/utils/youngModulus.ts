/**
 * The YoungModulus class handles the conversion of Young's modulus values betwwen metric and imperial units.
 */

export class YoungModulus {
  private static unitConversions: { [key: string]: number } = {
    'pa': 1e9, // 1 GPa = 1e9 Pa
    'kpa': 1e6, // 1 GPa = 1e6 KPa
    'mpa': 1e3, // 1 GPa = 1e3 MPa
    'gpa': 1, // Base unit for metric
    'psi': 145037.73773, // 1 Gpa = 145037.73773 psi
    'psf': 20885433.788371, // 1 Gpa = 20885433.788371 psf
    'ksi': 145.03773773, // 1 Gpa = 145.03773773 ksi
  };

  public valueInPa: number; // Metric value in Pa
  public valueInKPa: number; // Metric value in KPa
  public valueInMPa: number; // Metric value in MPa
  public valueInGPa: number; // Metric value in GPa
  public valueInPsi: number; // Imperial value in psi
  public valueInPsf: number; // Imperial value in psf
  public valueInKsi: number; // Imperial value in ksi

  /**
   * Constructor for the YoungModulus class.
   * @param value The value of Young's modulus.
   * @param unit The unit of Young's modulus.
   */
  constructor(value: number, unit: string) {
    unit = unit.toLowerCase();

    if (!YoungModulus.unitConversions[unit]) {
      throw new Error(`Unit '${unit}' is not supported.`);
    }

    this.valueInGPa = Math.abs(value) / YoungModulus.unitConversions[unit];

    this.valueInPa = this.valueInGPa * YoungModulus.unitConversions["pa"];
    this.valueInKPa = this.valueInGPa * YoungModulus.unitConversions["kpa"];
    this.valueInMPa = this.valueInGPa * YoungModulus.unitConversions["mpa"];
    this.valueInPsi = this.valueInGPa * YoungModulus.unitConversions["psi"];
    this.valueInPsf = this.valueInGPa * YoungModulus.unitConversions["psf"];
    this.valueInKsi = this.valueInGPa * YoungModulus.unitConversions["ksi"];
  }
}
