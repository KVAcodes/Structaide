import Rotation from "../lib/beam/numericCalculations/utils/rotation";

describe("Rotation", () => {
  test.each([
    { value: Math.PI, unit: "radians", expectedRadians: Math.PI, expectedDegrees: 180 },
    { value: 2 * Math.PI, unit: "radians", expectedRadians: 2 * Math.PI, expectedDegrees: 360 },
    { value: Math.PI / 2, unit: "radians", expectedRadians: Math.PI / 2, expectedDegrees: 90 },
    { value: 0, unit: "radians", expectedRadians: 0, expectedDegrees: 0 },
    { value: -Math.PI, unit: "radians", expectedRadians: -Math.PI, expectedDegrees: -180 },
    { value: 3 * Math.PI, unit: "radians", expectedRadians: 3 * Math.PI, expectedDegrees: 540 },
    { value: Math.PI / 4, unit: "radians", expectedRadians: Math.PI / 4, expectedDegrees: 45 },
    { value: -Math.PI / 2, unit: "radians", expectedRadians: -Math.PI / 2, expectedDegrees: -90 },
    { value: Number.MAX_VALUE, unit: "radians", expectedRadians: Number.MAX_VALUE, expectedDegrees: Number.MAX_VALUE * (180 / Math.PI) },
  ])("should convert radians to degrees", ({ value, unit, expectedRadians, expectedDegrees }) => {
    const rotation = new Rotation(value, unit);
    expect(rotation.valueInRadians).toBeCloseTo(expectedRadians);
    expect(rotation.valueInDegrees).toBeCloseTo(expectedDegrees);
  });

  test.each([
    { value: 180, unit: "degrees", expectedDegrees: 180, expectedRadians: Math.PI },
    { value: 360, unit: "degrees", expectedDegrees: 360, expectedRadians: 2 * Math.PI },
    { value: 90, unit: "degrees", expectedDegrees: 90, expectedRadians: Math.PI / 2 },
    { value: 0, unit: "degrees", expectedDegrees: 0, expectedRadians: 0 },
    { value: -180, unit: "degrees", expectedDegrees: -180, expectedRadians: -Math.PI },
    { value: 720, unit: "degrees", expectedDegrees: 720, expectedRadians: 4 * Math.PI },
    { value: 45, unit: "degrees", expectedDegrees: 45, expectedRadians: Math.PI / 4 },
    { value: -90, unit: "degrees", expectedDegrees: -90, expectedRadians: -Math.PI / 2 },
    { value: Number.MAX_VALUE, unit: "degrees", expectedDegrees: Number.MAX_VALUE, expectedRadians: Number.MAX_VALUE * (Math.PI / 180) },
  ])("should convert degrees to radians", ({ value, unit, expectedDegrees, expectedRadians }) => {
    const rotation = new Rotation(value, unit);
    expect(rotation.valueInDegrees).toBeCloseTo(expectedDegrees);
    expect(rotation.valueInRadians).toBeCloseTo(expectedRadians);
  });

  test("should throw an error if the unit is not supported", () => {
    expect(() => new Rotation(180, "gradians")).toThrow("Unit 'gradians' is not supported.");
  });
});
