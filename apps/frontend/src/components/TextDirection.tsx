import { DBNode } from "common/src/types";

export default function TextDirection(nodes: DBNode[]) {
    let {
        prompts,
        turns,
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
                prevAngle
            } = determinePrompt(nextNode,currNode,previousAngle,prompts,turns,promptType);

            previousAngle = prevAngle;
            prompts = promptArr;
            turns = turnArr;
        }

        /////////////////////////////////////////////////////////////////////////

        // entering new building on the same floor
        if (
            currNode.floor === nextNode.floor &&
            currNode.building !== nextNode.building
        ) {
            const promptType:string = "diff building same floor";
            const {
                promptArr,
                turnArr,
                prevAngle
            } = determinePrompt(nextNode,currNode,previousAngle,prompts,turns,promptType);

            previousAngle = prevAngle;
            prompts = promptArr;
            turns = turnArr;
        }
    }

    // promptArr.push(`${nodes}`);
    return {prompts,turns};
}

//////////////////////////////////////////////////////////

interface TextDirectionProps {
    prompts: string[]
    turns: string[];
}

export function TextDirectionComponent(props:TextDirectionProps) {
    const promptArr = props.prompts;
    //const nodeArr = props.nodes;
    return (
        <div className="flex flex-col">

            {promptArr.map((prompt) =>
                <div className="flex flex-row">
                    <div>

                    </div>
                    <div
                        className="border border-black flex rounded-2 drop-shadow-xl z-10 bg-secondary p-3 rounded-lg shadow-md text-foreground">
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
    const prompts= [`Head towards ${nodes[1].longName} in building ${nodes[1].building} for ${distance} units of distance.`]; // stores prompts
    const turns = ["S"]; // stores turns at each node

    const deltaX = nodes[1].xcoord - nodes[0].xcoord;
    const deltaY = nodes[1].ycoord - nodes[0].ycoord;

    let absoluteAngle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI; // degrees
    if(absoluteAngle<0) absoluteAngle += 360;
    const previousAngle = absoluteAngle; // previous absolute angle, start in same dir as path

    return {prompts,turns,previousAngle};
}

function determinePrompt(nextNode:DBNode,currNode:DBNode,prevAngle:number,promptArr:string[],turnArr:string[],promptType:string) {
    let scriptArr:string[];
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

    } else scriptArr=[''];

    const deltaX = nextNode.xcoord - currNode.xcoord;
    const deltaY = nextNode.ycoord - currNode.ycoord; // flip y-axis for ease of computation
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

    return {promptArr,turnArr,prevAngle};
}

// adjusted to take DBNode
function euclideanDistance(nodeA: DBNode, nodeB: DBNode): number {
    return Math.sqrt(
        Math.pow(nodeA.xcoord - nodeB.xcoord, 2) +
        Math.pow(nodeA.ycoord - nodeB.ycoord, 2),
    );
}




