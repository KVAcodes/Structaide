import { DistributedLoad } from "../lib/beam/numericCalculations/utils/distributedLoad";

describe("Distributed Load", () => {
  test("Should create a class instance with valid unit input", () => {
    const load = new DistributedLoad(1, "kn/m");
    expect(load).toBeInstanceOf(DistributedLoad);
  });

  test("Should throw an error with invalid unit input", () => {
    expect(() => new DistributedLoad(1, "newton")).toThrow(
      "Unit newton is not recognized."
    );
  });

  test("Should convert accurately from KN/m", () => {
    const load = new DistributedLoad(1, "kn/m");
    expect(load.valueInKNperM).toBe(1);
    expect(load.valueInKNperMM).toBe(0.001);
    expect(load.valueInNperMM).toBe(1);
    expect(load.valueInNperM).toBe(1000);
    expect(load.valueInLbPerIn).toBeCloseTo(5.7101417);
    expect(load.valueInLbPerFt).toBeCloseTo(68.52177965);
  });

  test("Should convert accurately from KN/mm", () => {
    const load = new DistributedLoad(1, "kn/mm");
    expect(load.valueInKNperM).toBe(1000);
    expect(load.valueInKNperMM).toBe(1);
    expect(load.valueInNperMM).toBe(1000);
    expect(load.valueInNperM).toBe(1e6);
    expect(load.valueInLbPerIn).toBeCloseTo(5710.1417);
    expect(load.valueInLbPerFt).toBeCloseTo(68521.77965);
  });

  test("Should convert accurately from N/mm", () => {
    const load = new DistributedLoad(1, "n/mm");
    expect(load.valueInKNperM).toBe(1);
    expect(load.valueInKNperMM).toBe(0.001);
    expect(load.valueInNperMM).toBe(1);
    expect(load.valueInNperM).toBe(1000);
    expect(load.valueInLbPerIn).toBeCloseTo(5.7101417);
    expect(load.valueInLbPerFt).toBeCloseTo(68.52177965);
  });

  test("Should convert accurately from N/m", () => {
    const load = new DistributedLoad(1, "n/m");
    expect(load.valueInKNperM).toBe(0.001);
    expect(load.valueInKNperMM).toBe(0.000001);
    expect(load.valueInNperMM).toBe(0.001);
    expect(load.valueInNperM).toBe(1);
    expect(load.valueInLbPerIn).toBeCloseTo(0.0057101417);
    expect(load.valueInLbPerFt).toBeCloseTo(0.06852177965);
  });

  test("Should convert accurately from lbf/in", () => {
    const load = new DistributedLoad(1, "lbf/in");
    expect(load.valueInKNperM).toBeCloseTo(0.175127);
    expect(load.valueInKNperMM).toBeCloseTo(0.000175127);
    expect(load.valueInNperMM).toBeCloseTo(0.175127);
    expect(load.valueInNperM).toBeCloseTo(175.126834);
    expect(load.valueInLbPerIn).toBe(1);
    expect(load.valueInLbPerFt).toBeCloseTo(12);
  });

  test("Should convert accurately from lbf/ft", () => {
    const load = new DistributedLoad(1, "lbf/ft");
    expect(load.valueInKNperM).toBeCloseTo(0.0145939);
    expect(load.valueInKNperMM).toBeCloseTo(0.0000145939);
    expect(load.valueInNperMM).toBeCloseTo(0.0145939);
    expect(load.valueInNperM).toBeCloseTo(14.5939);
    expect(load.valueInLbPerIn).toBeCloseTo(0.0833333333);
    expect(load.valueInLbPerFt).toBe(1);
  });
});
