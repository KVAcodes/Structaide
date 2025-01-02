import { MomentOfInertia } from "@/lib/beam/numericCalculations/utils/momentOfInertia";

describe("MomentOfInertia Class", () => {
  test("should create a class instance with valid unit input", () => {
    const momentOfInertia = new MomentOfInertia(1, "m^4");
    expect(momentOfInertia).toBeInstanceOf(MomentOfInertia);
  });

  test("should throw an error with invalid unit input", () => {
    expect(() => new MomentOfInertia(1, "meter")).toThrow(
      "Unit 'meter' is not supported."
    );
  });

  test("should convert accurately to other units from m^4", () => {
    const momentOfInertia = new MomentOfInertia(1, "m^4");
    expect(momentOfInertia.valueInM4).toBeCloseTo(1);
    expect(momentOfInertia.valueInMm4).toBeCloseTo(1e12);
    expect(momentOfInertia.valueInIn4).toBeCloseTo(2402509.60999039);
    expect(momentOfInertia.valueInFt4).toBeCloseTo(115.861767);
  });

  test("should convert accurately to other units from mm^4", () => {
    const momentOfInertia = new MomentOfInertia(1e12, "mm^4");
    expect(momentOfInertia.valueInM4).toBeCloseTo(1);
    expect(momentOfInertia.valueInMm4).toBeCloseTo(1e12);
    expect(momentOfInertia.valueInIn4).toBeCloseTo(2402509.60999039);
    expect(momentOfInertia.valueInFt4).toBeCloseTo(115.861767);
  });

  test("should convert accurately to other units from in^4", () => {
    const momentOfInertia = new MomentOfInertia(2402509.60999039, "in^4");
    expect(momentOfInertia.valueInM4).toBeCloseTo(1);
    expect(momentOfInertia.valueInMm4).toBeCloseTo(1e12);
    expect(momentOfInertia.valueInIn4).toBeCloseTo(2402509.60999039);
    expect(momentOfInertia.valueInFt4).toBeCloseTo(115.861767);
  });

  test("should convert accurately to other units from ft^4", () => {
    const momentOfInertia = new MomentOfInertia(115.861767, "ft^4");
    expect(momentOfInertia.valueInM4).toBeCloseTo(1);
    expect(momentOfInertia.valueInMm4).toBeCloseTo(1e12);
    expect(momentOfInertia.valueInIn4).toBeCloseTo(2402509.60999039);
    expect(momentOfInertia.valueInFt4).toBeCloseTo(115.861767);
  });
});
