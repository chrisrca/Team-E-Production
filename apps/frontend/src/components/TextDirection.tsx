import { DBNode } from "common/src/types";

export default function TextDirection(nodes: DBNode[]) {
    let {
        prompts,
        turns,
        floors,
        previousAngle
    } = initTextDirection(nodes);

    for (let i = 1; i < nodes.length; i++) {
        const currNode = nodes[i];
        const nextNode = nodes[i + 1];

        if(!currNode) break;
        if(!nextNode) { // on last node
            prompts.push(`You have reached your destination, ${currNode.longName}.`);
            break;
        }

        ////////////////////////////////////////////////////////////////////////

        // if in the same building and floor
        if (
            currNode.floor === nextNode.floor &&
            currNode.building === nextNode.building
        ) {
            const promptType:string = "same building and floor";
            const {
                promptArr,
                turnArr,
                floorArr,
                prevAngle
            } = determinePrompt(nextNode,currNode,previousAngle,prompts,turns,floors,promptType);

            previousAngle = prevAngle;
            prompts = promptArr;
            turns = turnArr;
            floors = floorArr;
        }

        /////////////////////////////////////////////////////////////////////////

        // entering new building on the same floor
        else if (
            currNode.floor === nextNode.floor &&
            currNode.building !== nextNode.building
        ) {
            const promptType:string = "diff building same floor";
            const {
                promptArr,
                turnArr,
                floorArr,
                prevAngle
            } = determinePrompt(nextNode,currNode,previousAngle,prompts,turns,floors,promptType);

            previousAngle = prevAngle;
            prompts = promptArr;
            turns = turnArr;
            floors = floorArr;
        }

        ///////////////////////////////////////////////////////////////////////////

        // entering new floor
        else if (
            currNode.floor !== nextNode.floor
        ) {
            const promptType:string = "diff floor";
            const {
                promptArr,
                turnArr,
                floorArr,
                prevAngle
            } = determinePrompt(nextNode,currNode,previousAngle,prompts,turns,floors,promptType);

            previousAngle = prevAngle;
            prompts = promptArr;
            turns = turnArr;
            floors = floorArr;
        }

        ////////////////////////////////////////////////////////////////////////////////////////////

        else {
            prompts.push('Bang! Unexpected node condition.');
            turns.push('Error');
            floors.push('Error');
        }
    }

    // promptArr.push(`${nodes}`);
    return {prompts,turns,floors};
}

//////////////////////////////////////////////////////////

interface TextDirectionProps {
    prompts: string[];
    turns: string[];
    floors: string[];
    currFloor: number;
}

export function TextDirectionComponent(props:TextDirectionProps) {
    let promptArr = props.prompts;
    let turnArr = props.turns;
    //const floorArr = props.floors;
    //const currFloor = props.currFloor;

    // convert number to string
    // const floor:string = currFloor===0 ? 'L2' :
    //                          currFloor===1 ? 'L1' :
    //                              currFloor=== 2 ? '1' :
    //                                  currFloor===3 ? '2' : '3';

    //promptArr = promptArr.filter((_, index) => floorArr[index] === floor);
    //turnArr = turnArr.filter((_, index) => floorArr[index] === floor);
    //turnArr = turnArr.filter((turn:string,index) => turn!==turnArr[index+1]);

    return (
        <div className="flex flex-col p-3 w-1/2">
            {promptArr.map((prompt,index) =>
                <div className="flex flex-row rounded-2 p-3 border border-black drop-shadow-xl z-10 bg-secondary shadow-md text-foreground rounded-lg">
                    <div className="px-3">
                        {turnArr[index]==='SLR' ? '/>' :
                            turnArr[index]==='R' ? '->' :
                                turnArr[index]==='SHR' ? '>' :
                                    turnArr[index]==='SHL' ? '<' :
                                        turnArr[index]==='L' ? '<-' :
                                            turnArr[index]==='SLL' ? '<\\' :
                                                turnArr[index]==='S' ? '^' : '?'}
                    </div>
                    <div
                        className="">
                        {prompt}
                    </div>
                </div>
            )}
        </div>

    );
}

//////////////////REFACTORED FOR CODE REUSE////////////////////////////////////

function initTextDirection(nodes:DBNode[]) {
    const distance = Math.round(euclideanDistance(nodes[0],nodes[1]));
    const prompts= [`Directions from ${nodes[0].longName} to ${nodes[nodes.length-1].longName}:`]; // stores prompts

    // decide how to start the directions
    if(nodes[0].floor===nodes[1].floor && nodes[0].building===nodes[1].building) { // same floor same building
        prompts.push(`Head towards ${nodes[1].longName} for ${distance} units of distance.`);
    }
    else if(nodes[0].floor===nodes[1].floor && nodes[0].building!==nodes[1].building) { // same floor different building
        prompts.push(`Head towards ${nodes[1].longName} in building ${nodes[1].building} for ${distance} units of distance.`);
    }
    else if(nodes[0].floor!==nodes[1].floor) { // different floor
        let medium:string;
        if(nodes[0].nodeType==='ELEV') medium = 'elevator';
        else if(nodes[0].nodeType==='STAI') medium = 'stairs';
        else medium = '';
        prompts.push(`Take the ${medium} to floor ${nodes[1].floor}.`);
    }
    else prompts.push('Bang! If you see this there is an error.');

    const turns = [""]; // stores turns at each node, start assuming user is facing direction of line
    turns.push('S');
    const floors = [`${nodes[0].floor}`]; // stores floor of each node

    const deltaX = nodes[1].xcoord - nodes[0].xcoord;
    const deltaY = nodes[1].ycoord - nodes[0].ycoord;

    let absoluteAngle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI; // degrees
    if(absoluteAngle<0) absoluteAngle += 360;
    const previousAngle = absoluteAngle; // previous absolute angle, start in same dir as path

    return {prompts,turns,floors,previousAngle};
}

function determinePrompt(nextNode:DBNode,currNode:DBNode,prevAngle:number,promptArr:string[],turnArr:string[],floorArr:string[],promptType:string) {
    let scriptArr:string[] = [''];
    if(promptType==='same building and floor') {
        const distance = Math.round(euclideanDistance(currNode,nextNode));
        scriptArr = [
            `Take a slight right and continue for ${distance} units of distance until you reach ${nextNode.shortName}.`,
            `Take a right and continue for ${distance} units of distance until you reach ${nextNode.shortName}.`,
            `Take a sharp right and continue for ${distance} units of distance until you reach ${nextNode.shortName}.`,
            `Take a sharp left and continue for ${distance} units of distance until you reach ${nextNode.shortName}.`,
            `Take a left and continue for ${distance} units of distance until you reach ${nextNode.shortName}.`,
            `Take a slight left and continue for ${distance} units of distance until you reach ${nextNode.shortName}.`,
            `Head straight for ${distance} units of distance until you reach ${nextNode.shortName}.`
        ];
    } else if(promptType==='diff building same floor') {
        const distance = Math.round(euclideanDistance(currNode,nextNode));
        scriptArr = [
            `Take a slight right into building ${nextNode.building} and continue for ${distance} units of distance until you reach ${nextNode.shortName}.`,
            `Take a right into building ${nextNode.building} and continue for ${distance} units of distance until you reach ${nextNode.shortName}.`,
            `Take a sharp right into building ${nextNode.building} and continue for ${distance} units of distance until you reach ${nextNode.shortName}.`,
            `Take a sharp left into building ${nextNode.building} and continue for ${distance} units of distance until you reach ${nextNode.shortName}.`,
            `Take a left into building ${nextNode.building} and continue for ${distance} units of distance until you reach ${nextNode.shortName}.`,
            `Take a slight left into building ${nextNode.building} and continue for ${distance} units of distance until you reach ${nextNode.shortName}.`,
            `Head straight into building ${nextNode.building} for ${distance} units of distance until you reach ${nextNode.shortName}.`
        ];
    } else if(promptType==='diff floor') {
        let medium:string;
        if(currNode.nodeType==='ELEV') medium = 'elevator';
        else if(currNode.nodeType==='STAI') medium = 'stairs';
        else medium = '';

        for(let i=0;i<7;i++) {
            scriptArr[i] = `Take the ${medium} to floor ${nextNode.floor}.`;
        }

    } else scriptArr=['Bang! Should not be possible to see this :/'];

    const deltaX = nextNode.xcoord - currNode.xcoord;
    const deltaY = nextNode.ycoord - currNode.ycoord;
    //      promptArr.push(`|||| ${nextNode.ycoord} ${currNode.ycoord}`);

    let absoluteAngle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI; // degrees
    //      promptArr.push(`||| ${deltaY} ${deltaX}`);
    if(absoluteAngle<0) absoluteAngle += 360; // shift range to be from 0-360

    // indicates rotation direction and amount
    let relativeAngle = (absoluteAngle - prevAngle) < -180 ? (absoluteAngle - prevAngle) + 360 : (absoluteAngle - prevAngle);
    if(relativeAngle>180) relativeAngle -= 360;

    //        promptArr.push(`|| ${relativeAngle} ${absoluteAngle} ${prevAngle}`);

    const SlightRight = (25<=relativeAngle && relativeAngle<=60);
    const Right = (60<relativeAngle && relativeAngle<120);
    const SharpRight = (120<=relativeAngle && relativeAngle<=155);
    // Straight -150 +/-180 150
    const SharpLeft = (-120>=relativeAngle && relativeAngle>=-155);
    const Left = (-60>relativeAngle && relativeAngle>-120);
    const SlightLeft = (-25>=relativeAngle && relativeAngle>=-60);

    if(SlightRight) {
        promptArr.push(scriptArr[0]);
        turnArr.push('SLR');
    } else if(Right) {
        promptArr.push(scriptArr[1]);
        turnArr.push('R');
    } else if(SharpRight) {
        promptArr.push(scriptArr[2]);
        turnArr.push('SHR');
    } else if(SharpLeft) {
        promptArr.push(scriptArr[3]);
        turnArr.push('SHL');
    } else if(Left) {
        promptArr.push(scriptArr[4]);
        turnArr.push('L');
    } else if(SlightLeft) {
        promptArr.push(scriptArr[5]);
        turnArr.push('SLL');
    } else {
        promptArr.push(scriptArr[6]);
        turnArr.push('S');
    }

    prevAngle = absoluteAngle;

    floorArr.push(`${currNode.floor}`);

    return {promptArr,turnArr,floorArr,prevAngle};
}

// adjusted to take DBNode
function euclideanDistance(nodeA: DBNode, nodeB: DBNode): number {
    return Math.sqrt(
        Math.pow(nodeA.xcoord - nodeB.xcoord, 2) +
        Math.pow(nodeA.ycoord - nodeB.ycoord, 2),
    );
}




