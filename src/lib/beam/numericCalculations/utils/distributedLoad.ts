/**
 * The DistributedLoad class handles the conversion of distributed load values between different units.
 */

export class DistributedLoad {
  private static unitConversions: { [key: string]: number } = {
    "kn/m": 1,
    "kn/mm": 1000, // 1 KN/mm = 1000 KN/m
    "n/mm": 1, // 1 N/mm = 1 KN/m
    "n/m": 0.001, // 1 N/m = 0.001 KN/m
    "lbf/in": 0.175127, // 1 lbf/in ≈ 0.175127 KN/m
    "lbf/ft": 0.0145939, // 1 lb/ft ≈ 0.0145939 KN/m
  };

  public valueInKNperM: number;
  public valueInKNperMM: number;
  public valueInNperMM: number;
  public valueInNperM: number;
  public valueInLbPerIn: number;
  public valueInLbPerFt: number;

  constructor(value: number, unit: string) {
    // Normalize unit input
    unit = unit.toLowerCase();
    // Check if unit is supported
    if (!DistributedLoad.unitConversions[unit]) {
      throw new Error(`Unit ${unit} is not recognized.`);
    }

    this.valueInKNperM = value * DistributedLoad.unitConversions[unit];

    this.valueInKNperMM =
      this.valueInKNperM / DistributedLoad.unitConversions["kn/mm"];
    this.valueInNperMM =
      this.valueInKNperM / DistributedLoad.unitConversions["n/mm"];
    this.valueInNperM =
      this.valueInKNperM / DistributedLoad.unitConversions["n/m"];
    this.valueInLbPerIn =
      this.valueInKNperM / DistributedLoad.unitConversions["lbf/in"];
    this.valueInLbPerFt =
      this.valueInKNperM / DistributedLoad.unitConversions["lbf/ft"];
  }
}
