/**
 * This module contains the postProcess class that generates the output data from the analysis
 * such as reactions, deflections and slope curves, bending moments and shear forces diagrams etc.
 */

import { BeamData } from "./uiInput";
import { Polynomial } from "./polynomial";
import { processBeam } from "./processing";
import { Beam } from "./beam";

interface elementPostProcessResults {
  weight: Polynomial;
  shearForce: Polynomial;
  bendingMoment: Polynomial;
  slope: Polynomial;
  deflection: Polynomial;
}

export class PostProcess {
  public postProcessResults: elementPostProcessResults[];
  /**
   * Constructor for the postProcess class
   *
   * @beamData - the beam's data from the UI
   */
  constructor(private beamData: BeamData) {
    const firstBeamSolution = new Beam(processBeam(this.beamData), 1);
    let secondBeamSolution: Beam | undefined;
    // if the beamData contains a internalHinge boundary condition:
    // the postProcess needs two solutions of the beam
    // one with the internal hinge attached to the element on the left of the internal hinge node(firstBeamSolution)
    // and the other with the internal hinge attached to the element on the right of the internal hinge node(secondBeamSolution)
    if (
      this.beamData.boundaryConditions.some((bc) => bc.type === "internalHinge")
    ) {
      // first solution of the beam attaching the internal hinge to the element on the left
      // via setting iteration to 1
      // while the
      // second solution of the beam attaching the internal hinge to the element on the right
      // via setting iteration to 2
      secondBeamSolution = new Beam(processBeam(this.beamData), 2);
    }
    this.postProcessResults = this.postProcessBeam(
      firstBeamSolution,
      secondBeamSolution
    );
  }

  /**
   * This function generates the output data from the analysis
   * such as reactions, deflections and slope curves, bending moments and shear forces diagrams etc.
   *
   * @param firstBeamSolution - the first solution of the beam
   * @param secondBeamSolution - the second solution of the beam if the beam contains an internal hinge boundary condition
   * @returns {elementPostProcessResults} - the output data from the analysis
   */
  public postProcessBeam(
    firstBeamSolution: Beam,
    secondBeamSolution?: Beam
  ): elementPostProcessResults[] {
    const postProcessResults: elementPostProcessResults[] = [];
    firstBeamSolution.beamElements.forEach((element, index) => {
      const EI = element.storedData.isMetric // initialising the EI value
        ? element.storedData.section.valueInKNm2
        : element.storedData.section.valueInLbin2;
      const elementResults: elementPostProcessResults = {
        weight: new Polynomial(),
        shearForce: new Polynomial(),
        bendingMoment: new Polynomial(),
        slope: new Polynomial(),
        deflection: new Polynomial(),
      };
      let a0OfWeight = 0;
      let a1OfWeight = 0;
      element.storedData.distributedLoads?.forEach((load) => {
        // first check if for some reason the load doesn't span the entire element: throw an error
        if (load.end - load.start !== element.storedData.length) {
          throw new Error(
            `The distributed load doesn't span the entire element. Element ${
              index + 1
            }`
          );
        }
        a0OfWeight += load.startMag;
        a1OfWeight += (load.endMag - load.startMag) / element.storedData.length;
      });
      // Weight
      [
        elementResults.weight.coefficients.A0,
        elementResults.weight.coefficients.A1,
      ] = [a0OfWeight, a1OfWeight];
      // shear force
      [
        elementResults.shearForce.coefficients.A0,
        elementResults.shearForce.coefficients.A1,
        elementResults.shearForce.coefficients.A2,
      ] = [element.localForces.get(0, 0), -a0OfWeight, -a1OfWeight / 2];
      // bending moment
      [
        elementResults.bendingMoment.coefficients.A0,
        elementResults.bendingMoment.coefficients.A1,
        elementResults.bendingMoment.coefficients.A2,
        elementResults.bendingMoment.coefficients.A3,
      ] = [
        -element.localForces.get(1, 0), // the moment is negated because negative moment(clockwise) constitutes sagging i.e. positive bending moment
        element.localForces.get(0, 0),
        -a0OfWeight / 2,
        -a1OfWeight / 6,
      ];
      // slope
      [
        elementResults.slope.coefficients.A0,
        elementResults.slope.coefficients.A1,
        elementResults.slope.coefficients.A2,
        elementResults.slope.coefficients.A3,
        elementResults.slope.coefficients.A4,
      ] = [
        element.localDisplacementVector.get(1, 0) / EI,
        -element.localForces.get(1, 0) / EI,
        element.localForces.get(0, 0) / (2 * EI),
        -a0OfWeight / (6 * EI),
        -a1OfWeight / (24 * EI),
      ];
      // deflection
      [
        elementResults.deflection.coefficients.A0,
        elementResults.deflection.coefficients.A1,
        elementResults.deflection.coefficients.A2,
        elementResults.deflection.coefficients.A3,
        elementResults.deflection.coefficients.A4,
        elementResults.deflection.coefficients.A5,
      ] = [
        element.localDisplacementVector.get(0, 0) / EI,
        element.localDisplacementVector.get(1, 0) / EI,
        -element.localForces.get(1, 0) / (2 * EI),
        element.localForces.get(0, 0) / (6 * EI),
        -a0OfWeight / (24 * EI),
        -a1OfWeight / (120 * EI),
      ];
      // add results to the postProcessResults array
      postProcessResults.push(elementResults);
    });

    return postProcessResults;
  }
}
