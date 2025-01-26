/**
 * module contains the function processBeam that prepares the beam for analysis
 */

import { deepCopy } from './beam';
import { BeamData, BoundaryCondition } from './uiInput';

/**
 * This function adds a midSpan boundary condition to the input data wherever there exists a state change.
 * A state change occurs wherever there is change in loading or there exists a support
 * The reason for this is to treat each of these newly divved segments as individual elements for easy analysis
 * 
 * @param inputData - inputData from the UI
 * @returns {BeamData}
 */
export function processBeam(inputData: BeamData): BeamData {
    const data: BeamData = deepCopy(inputData);
    const statePositions : number[] = [];
    const boundaryStatePositions : number[] = [];
    const boundaryConditions = deepCopy(data.boundaryConditions);
    const sectionProperties = deepCopy(data.sectionProperties);
    const newSectionProperties : any[] = [];
    let boundaryConditionObjectForMidSpan: BoundaryCondition = {
        type: 'midSpan',
        position: 0,
        settlement: {
            value: 0,
            unit: 'mm',
            direction: 'down',
            set: false,
        },
        rotation: {
            value: 0,
            unit: 'radians',
            isClockwise: false,
            set: false,
        },
    }

    // handle case of successive internal hinges: adds a midspan at the center of the hinges
    const newBoundaryConditions: BoundaryCondition[] = [];
    boundaryConditions.forEach((boundaryCondition, index) => {
        if (boundaryCondition.type === 'internalHinge' && boundaryConditions[index + 1]?.type === 'internalHinge') {
            const midSpanPosition = (boundaryCondition.position + boundaryConditions[index + 1].position) / 2;
            const boundaryConditionObject = deepCopy(boundaryConditionObjectForMidSpan);
            boundaryConditionObject.position = midSpanPosition;
            newBoundaryConditions.push(boundaryConditionObject);
            // add a section property for the midspan created
            sectionProperties.splice(index + 1, 0, sectionProperties[index]);
        }
    });
    boundaryConditions.push(...newBoundaryConditions);
    boundaryConditions.sort((a, b) => a.position - b.position);

    // get all the state positions
    boundaryConditions.forEach((boundaryCondition) => {
        boundaryStatePositions.push(boundaryCondition.position);
    }
    );
    data.loads?.pointLoads?.forEach((pointLoad) => {
        statePositions.push(pointLoad.location);
    }
    );
    data.loads?.moments?.forEach((moment) => {
        statePositions.push(moment.location);
    }
    );
    data.loads?.distributedLoads?.forEach((distributedLoad) => {
        statePositions.push(distributedLoad.start);
        statePositions.push(distributedLoad.end);
    }
    );
    // combine the two arrays
    statePositions.push(...boundaryStatePositions);
    // remove duplicates
    const uniqueStatePositions = [...new Set(statePositions)];
    // sort the array
    uniqueStatePositions.sort((a, b) => a - b);
    // determine the number of elements
    const numberOfElements = uniqueStatePositions.length - 1;
    // add the midspans for state positions that are not boundary conditions
    uniqueStatePositions.forEach((position) => {
        // check if the position is a boundary condition, if not add a midspan boundary condition object
        if (!boundaryStatePositions.includes(position)) {
            const boundaryConditionObject = deepCopy(boundaryConditionObjectForMidSpan);
            boundaryConditionObject.position = position;
            boundaryConditions.push(boundaryConditionObject);
        }
    });
    // sort boundary conditions by position
    boundaryConditions.sort((a, b) => a.position - b.position);

    // create new sections
    for (let i = 0; i < uniqueStatePositions.length - 1; i++) {
        for (let j = 0; j < boundaryStatePositions.length - 1; j++) {
            if (uniqueStatePositions[i] >= boundaryStatePositions[j] && uniqueStatePositions[i + 1] <= boundaryStatePositions[j + 1]) {
                newSectionProperties.push(sectionProperties[j]);
            }

        }
    }

    data.sectionProperties = newSectionProperties;
    data.boundaryConditions = boundaryConditions;
    data.noOfSpans = numberOfElements;

    return data;
}