import exp from "constants";
import { Beam, deepCopy } from "../lib/beam/numericCalculations/utils/beam";
import { BeamData } from "../lib/beam/numericCalculations/utils/uiInput";
describe("Beam Class", () => {
  let beamData: BeamData;

  beforeEach(() => {
    beamData = {
      isMetric: true,
      isImperial: false,
      beamLength: {
        value: 10,
        unit: "m",
      },
      boundaryConditions: [
        {
          type: "fixed",
          position: 0,
          settlement: {
            value: 5,
            unit: "mm",
            direction: "down",
            set: true,
          },
          rotation: {
            value: 0,
            unit: "radians",
            isClockwise: false,
            set: false,
          },
        },
        {
          type: "pinned",
          position: 5,
          settlement: {
            value: 2,
            unit: "mm",
            direction: "down",
            set: true,
          },
          rotation: {
            value: 5,
            unit: "degrees",
            isClockwise: true,
            set: true,
          },
        },
        {
          type: "roller",
          position: 10,
          settlement: {
            value: 6,
            unit: "mm",
            direction: "up",
            set: true,
          },
          rotation: {
            value: 2,
            unit: "radians",
            isClockwise: false,
            set: true,
          },
        },
      ],
      sectionProperties: [
        {
          youngModulus: {
            value: 200,
            unit: "gpa",
            coefficient: 1,
          },
          momentOfInertia: {
            value: 0.0001,
            unit: "m^4",
            coefficient: 1,
          },
        },
        {
          youngModulus: {
            value: 200,
            unit: "gpa",
            coefficient: 1,
          },
          momentOfInertia: {
            value: 0.0001,
            unit: "m^4",
            coefficient: 1,
          },
        },
      ],
      loads: {
        pointLoads: [
          {
            location: 2.5,
            magnitude: 10000,
            unit: "n",
          },
          {
            location: 7.5,
            magnitude: 2000,
            unit: "lbf",
          }
        ],
        distributedLoads: [
          {
            start: 0,
            end: 5,
            startMag: 0,
            endMag: 1,
            unit: "kn/mm",
          },
          {
            start: 5,
            end: 10,
            startMag: 20,
            endMag: 0,
            unit: "lbf/ft",
          }
        ],
        moments: [
          {
            location: 2.5,
            magnitude: 5000,
            unit: "kn.mm",
            isClockwise: true,
          },
          {
            location: 7.5,
            magnitude: 5000,
            unit: "kn.mm",
            isClockwise: false,
          }
        ],
      },
      noOfSpans: 2,
    };
  });

  test("ResolveUnits for the BeamLength", () => {
    const beam = new Beam(beamData);
    expect(beam.data.beamLength.value).toBe(10);

    beamData.beamLength.unit = "mm";
    const beam2 = new Beam(beamData);
    expect(beam2.data.beamLength.value).toBe(0.01);

    beamData.beamLength.unit = "ft";
    beamData.isMetric = false;
    const beam3 = new Beam(beamData);
    expect(beam3.data.beamLength.value).toBe(120);
  });

  test("ResolveUnits for the BoundaryConditions", () => {
    // boundary position
    beamData.beamLength.unit = "mm";
    const beam = new Beam(beamData);
    expect(beam.data.boundaryConditions[0].position).toBe(0);
    expect(beam.data.boundaryConditions[1].position).toBe(0.005);
    expect(beam.data.boundaryConditions[2].position).toBe(0.01);

    beamData.beamLength.unit = "ft";
    beamData.isMetric = false;
    const beam2 = new Beam(beamData);
    expect(beam2.data.boundaryConditions[0].position).toBe(0);
    expect(beam2.data.boundaryConditions[1].position).toBe(60);
    expect(beam2.data.boundaryConditions[2].position).toBe(120);

    // settlement
    beamData.isMetric = true;
    const beam3 = new Beam(beamData);
    expect(beam3.data.boundaryConditions[0].settlement.value).toBe(-0.005);
    expect(beam3.data.boundaryConditions[1].settlement.value).toBe(-0.002);
    expect(beam3.data.boundaryConditions[2].settlement.value).toBe(0.006);

    // rotation
    expect(beam3.data.boundaryConditions[0].rotation.value).toBe(0);
    expect(beam3.data.boundaryConditions[1].rotation.value).toBeCloseTo(
      -0.0872665
    );
    expect(beam3.data.boundaryConditions[2].rotation.value).toBe(2);
  });

  test("ResolveUnits for the loads", () => {
    // point loads
    // magnitude resolution
    const beam = new Beam(beamData);
    expect(beam.data.loads?.pointLoads[0].magnitude).toBe(10);
    expect(beam.data.loads?.pointLoads[1].magnitude).toBeCloseTo(8.8964432);

    // location resolution
    beamData.beamLength.unit = "mm";
    const beam2 = new Beam(beamData);
    expect(beam2.data.loads?.pointLoads[0].location).toBe(0.0025);

    // distributed loads
    // magnitude resolution
    expect(beam2.data.loads?.distributedLoads[0].startMag).toBe(0);
    expect(beam2.data.loads?.distributedLoads[0].endMag).toBe(1000);

    // location resolution
    expect(beam2.data.loads?.distributedLoads[0].start).toBe(0);
    expect(beam2.data.loads?.distributedLoads[0].end).toBe(0.005);

    // moments
    // magnitude resolution
    expect(beam2.data.loads?.moments[0].magnitude).toBe(-5);
    expect(beam2.data.loads?.moments[1].magnitude).toBe(5);
    
    // location resolution
    expect(beam2.data.loads?.moments[0].location).toBe(0.0025);
    expect(beam2.data.loads?.moments[1].location).toBe(0.0075);
  });

  test("ProcessDistributedLoads of right triangle full beam span", () => {
    if (beamData.loads?.distributedLoads) {
      beamData.loads.distributedLoads = [];
    }
    beamData.loads?.distributedLoads.push({
      start: 0,
      end: 10,
      startMag: 0,
      endMag: 30,
      unit: "kn/m",
    });
    const beam = new Beam(beamData);
    const [element1, element2] = beam.beamElements;
    expect(element1.getData().distributedLoads?.[0].endMag).toBe(15);
    expect(element2.getData().distributedLoads?.[0].startMag).toBe(15);
    expect(element2.getData().distributedLoads?.[0].endMag).toBe(30);

  });

  test("ProcessdistributedLoads of flipped right triangle full beam span", () => {
    if (beamData.loads?.distributedLoads) {
      beamData.loads.distributedLoads = [];
    }
    beamData.loads?.distributedLoads.push({
      start: 0,
      end: 10,
      startMag: 30,
      endMag: 0,
      unit: "kn/m",
    });
    const beam = new Beam(beamData);
    const [element1, element2] = beam.beamElements;
    expect(element1.getData().distributedLoads?.[0].startMag).toBe(30);
    expect(element1.getData().distributedLoads?.[0].endMag).toBe(15);
    expect(element2.getData().distributedLoads?.[0].startMag).toBe(15);
    expect(element2.getData().distributedLoads?.[0].endMag).toBe(0);
  });

  test("processDistributedLoads of udl accross one support", () => {
    if (beamData.loads?.distributedLoads) {
      beamData.loads.distributedLoads = [];
    }
    beamData.loads?.distributedLoads.push({
      start: 2.5,
      end: 7.5,
      startMag: 30,
      endMag: 30,
      unit: "kn/m",
    });
    const beam = new Beam(beamData);
    const [element1, element2] = beam.beamElements;
    expect(element1.getData().distributedLoads?.[0].start).toBe(2.5);
    expect(element1.getData().distributedLoads?.[0].end).toBe(5);
    expect(element1.getData().distributedLoads?.[0].startMag).toBe(30)
    expect(element1.getData().distributedLoads?.[0].endMag).toBe(30);
    expect(element2.getData().distributedLoads?.[0].start).toBe(5);
    expect(element2.getData().distributedLoads?.[0].end).toBe(7.5);
    expect(element2.getData().distributedLoads?.[0].startMag).toBe(30);
    expect(element2.getData().distributedLoads?.[0].endMag).toBe(30);
  });

  test("processDistributedLoads of right triangle accross one support", () => {
    if (beamData.loads?.distributedLoads) {
      beamData.loads.distributedLoads = [];
    }
    beamData.loads?.distributedLoads.push({
      start: 2.5,
      end: 7.5,
      startMag: 0,
      endMag: 30,
      unit: "kn/m",
    });
    const beam = new Beam(beamData);
    const [element1, element2] = beam.beamElements;
    expect(element1.getData().distributedLoads?.[0].start).toBe(2.5);
    expect(element1.getData().distributedLoads?.[0].end).toBe(5);
    expect(element1.getData().distributedLoads?.[0].startMag).toBe(0)
    expect(element1.getData().distributedLoads?.[0].endMag).toBe(15);
    expect(element2.getData().distributedLoads?.[0].start).toBe(5);
    expect(element2.getData().distributedLoads?.[0].end).toBe(7.5);
    expect(element2.getData().distributedLoads?.[0].startMag).toBe(15);
    expect(element2.getData().distributedLoads?.[0].endMag).toBe(30);
  });

  test("processDistributedLoads of flipped right triangle accross one support", () => {
    if (beamData.loads?.distributedLoads) {
      beamData.loads.distributedLoads = [];
    }
    beamData.loads?.distributedLoads.push({
      start: 2.5,
      end: 7.5,
      startMag: 30,
      endMag: 0,
      unit: "kn/m",
    });
    const beam = new Beam(beamData);
    const [element1, element2] = beam.beamElements;
    expect(element1.getData().distributedLoads?.[0].start).toBe(2.5);
    expect(element1.getData().distributedLoads?.[0].end).toBe(5);
    expect(element1.getData().distributedLoads?.[0].startMag).toBe(30)
    expect(element1.getData().distributedLoads?.[0].endMag).toBe(15);
    expect(element2.getData().distributedLoads?.[0].start).toBe(5);
    expect(element2.getData().distributedLoads?.[0].end).toBe(7.5);
    expect(element2.getData().distributedLoads?.[0].startMag).toBe(15);
    expect(element2.getData().distributedLoads?.[0].endMag).toBe(0);
  });

  test("processDistributedLoads of udl accross two supports", () => {
    if (beamData.loads?.distributedLoads) {
      beamData.loads.distributedLoads = [];
    }
    beamData.loads?.distributedLoads.push({
      start: 2.5,
      end: 12.5,
      startMag: 30,
      endMag: 30,
      unit: "kn/m",
    });
    beamData.beamLength.value = 15;
    beamData.boundaryConditions.push({
      type: "roller",
      position: 15,
      settlement: {
        value: 0,
        unit: "mm",
        direction: "down",
        set: false
      },
      rotation: {
        value: 0,
        unit: "radians",
        isClockwise: false,
        set: false
      },
    });
    beamData.sectionProperties.push({
      youngModulus: {
        value: 200,
        unit: "gpa",
        coefficient: 1,
      },
      momentOfInertia: {
        value: 0.0001,
        unit: "m^4",
        coefficient: 1,
      },
    });
    beamData.noOfSpans = 3;
    const beam = new Beam(beamData);
    const [element1, element2, element3] = beam.beamElements;
    expect(element1.getData().distributedLoads?.[0].start).toBe(2.5);
    expect(element1.getData().distributedLoads?.[0].end).toBe(5);
    expect(element1.getData().distributedLoads?.[0].startMag).toBe(30)
    expect(element1.getData().distributedLoads?.[0].endMag).toBe(30);
    expect(element2.getData().distributedLoads?.[0].start).toBe(5);
    expect(element2.getData().distributedLoads?.[0].end).toBe(10);
    expect(element2.getData().distributedLoads?.[0].startMag).toBe(30);
    expect(element2.getData().distributedLoads?.[0].endMag).toBe(30);
    expect(element3.getData().distributedLoads?.[0].start).toBe(10);
    expect(element3.getData().distributedLoads?.[0].end).toBe(12.5);
    expect(element3.getData().distributedLoads?.[0].startMag).toBe(30);
    expect(element3.getData().distributedLoads?.[0].endMag).toBe(30);
  });

  test("processDistributedLoads of right triangle accross two supports", () => {
    if (beamData.loads?.distributedLoads) {
      beamData.loads.distributedLoads = [];
    }
    beamData.loads?.distributedLoads.push({
      start: 2.5,
      end: 12.5,
      startMag: 0,
      endMag: 30,
      unit: "kn/m",
    });
    beamData.beamLength.value = 15;
    beamData.boundaryConditions.push({
      type: "roller",
      position: 15,
      settlement: {
        value: 0,
        unit: "mm",
        direction: "down",
        set: false,
      },
      rotation: {
        value: 0,
        unit: "radians",
        isClockwise: false,
        set: false,
      },
    });
    beamData.sectionProperties.push({
      youngModulus: {
        value: 200,
        unit: "gpa",
        coefficient: 1,
      },
      momentOfInertia: {
        value: 0.0001,
        unit: "m^4",
        coefficient: 1,
      },
    });
    beamData.noOfSpans = 3;
    const beam = new Beam(beamData);
    const [element1, element2, element3] = beam.beamElements;
    expect(element1.getData().distributedLoads?.[0].start).toBe(2.5);
    expect(element1.getData().distributedLoads?.[0].end).toBe(5);
    expect(element1.getData().distributedLoads?.[0].startMag).toBe(0)
    expect(element1.getData().distributedLoads?.[0].endMag).toBe(7.5);
    expect(element2.getData().distributedLoads?.[0].start).toBe(5);
    expect(element2.getData().distributedLoads?.[0].end).toBe(10);
    expect(element2.getData().distributedLoads?.[0].startMag).toBe(7.5);
    expect(element2.getData().distributedLoads?.[0].endMag).toBe(22.5);
    expect(element3.getData().distributedLoads?.[0].start).toBe(10);
    expect(element3.getData().distributedLoads?.[0].end).toBe(12.5);
    expect(element3.getData().distributedLoads?.[0].startMag).toBe(22.5);
    expect(element3.getData().distributedLoads?.[0].endMag).toBe(30);
  });

  test("processDistributedLoads of flipped right triangle accross two supports", () => {
    if (beamData.loads?.distributedLoads) {
      beamData.loads.distributedLoads = [];
    }
    beamData.loads?.distributedLoads.push({
      start: 2.5,
      end: 12.5,
      startMag: 30,
      endMag: 0,
      unit: "kn/m",
    });
    beamData.beamLength.value = 15;
    beamData.boundaryConditions.push({
      type: "roller",
      position: 15,
      settlement: {
        value: 0,
        unit: "mm",
        direction: "down",
        set: false,
      },
      rotation: {
        value: 0,
        unit: "radians",
        isClockwise: false,
        set: false,
      },
    });
    beamData.sectionProperties.push({
      youngModulus: {
        value: 200,
        unit: "gpa",
        coefficient: 1,
      },
      momentOfInertia: {
        value: 0.0001,
        unit: "m^4",
        coefficient: 1,
      },
    });
    beamData.noOfSpans = 3;
    const beam = new Beam(beamData);
    const [element1, element2, element3] = beam.beamElements;
    expect(element1.getData().distributedLoads?.[0].start).toBe(2.5);
    expect(element1.getData().distributedLoads?.[0].end).toBe(5);
    expect(element1.getData().distributedLoads?.[0].startMag).toBe(30)
    expect(element1.getData().distributedLoads?.[0].endMag).toBe(22.5);
    expect(element2.getData().distributedLoads?.[0].start).toBe(5);
    expect(element2.getData().distributedLoads?.[0].end).toBe(10);
    expect(element2.getData().distributedLoads?.[0].startMag).toBe(22.5);
    expect(element2.getData().distributedLoads?.[0].endMag).toBe(7.5);
    expect(element3.getData().distributedLoads?.[0].start).toBe(10);
    expect(element3.getData().distributedLoads?.[0].end).toBe(12.5);
    expect(element3.getData().distributedLoads?.[0].startMag).toBe(7.5);
    expect(element3.getData().distributedLoads?.[0].endMag).toBe(0);
  });

});

describe("deepCopy Function", () => {
  test("Should create a deep copy of an object", () => {
    const obj = {
      a: 1,
      b: "hello",
      c: {
        d: 2,
        e: "world",
      },
    };
    const copy = deepCopy(obj);
    expect(copy).toEqual(obj);
    expect(copy).not.toBe(obj);
    expect(copy.c).toEqual(obj.c);
    expect(copy.c).not.toBe(obj.c);
  });

  test("Should create a deep copy of beamData", () => {
    const beamData: BeamData = {
      isMetric: true,
      isImperial: false,
      beamLength: {
        value: 10,
        unit: "m",
      },
      boundaryConditions: [
        {
          type: "fixed",
          position: 0,
          settlement: {
            value: 0,
            unit: "mm",
            direction: "down",
            set: false,
          },
          rotation: {
            value: 0,
            unit: "radians",
            isClockwise: false,
            set: false,
          },
        },
        {
          type: "pinned",
          position: 5,
          settlement: {
            value: 0,
            unit: "m",
            direction: "down",
            set: false,
          },
          rotation: {
            value: 0,
            unit: "radians",
            isClockwise: false,
            set: false,
          },
        },
        {
          type: "roller",
          position: 10,
          settlement: {
            value: 0,
            unit: "m",
            direction: "down",
            set: false,
          },
          rotation: {
            value: 0,
            unit: "radians",
            isClockwise: false,
            set: false,
          },
        },
      ],
      sectionProperties: [
        {
          youngModulus: {
            value: 200,
            unit: "gpa",
            coefficient: 1,
          },
          momentOfInertia: {
            value: 0.0001,
            unit: "m^4",
            coefficient: 1,
          },
        },
        {
          youngModulus: {
            value: 200,
            unit: "gpa",
            coefficient: 1,
          },
          momentOfInertia: {
            value: 0.0001,
            unit: "m^4",
            coefficient: 1,
          },
        },
      ],
      loads: {
        pointLoads: [
          {
            location: 2.5,
            magnitude: 10,
            unit: "kn",
          },
        ],
        distributedLoads: [
          {
            start: 0,
            end: 5,
            startMag: 0,
            endMag: 10,
            unit: "kn/m",
          },
        ],
        moments: [
          {
            location: 2.5,
            magnitude: 5,
            unit: "kn.m",
            isClockwise: true,
          },
        ],
      },
      noOfSpans: 2,
    };
    const copy = deepCopy(beamData);
    expect(copy).toEqual(beamData);
    expect(copy).not.toBe(beamData);
    expect(copy.sectionProperties).toEqual(beamData.sectionProperties);
    expect(copy.sectionProperties).not.toBe(beamData.sectionProperties);
    expect(copy.loads).toEqual(beamData.loads);
    expect(copy.loads).not.toBe(beamData.loads);
    expect(copy.boundaryConditions).toEqual(beamData.boundaryConditions);
    expect(copy.boundaryConditions).not.toBe(beamData.boundaryConditions);
  });
});
