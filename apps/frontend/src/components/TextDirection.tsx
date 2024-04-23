import { DBNode } from "common/src/types";

export default function TextDirection(nodes: DBNode[]) {
    let distance = Math.round(euclideanDistance(nodes[0],nodes[1]));
    const promptArr= [`Head towards ${nodes[1].longName} in building ${nodes[1].building} for ${distance} units of distance.`]; // stores prompts
    const turnArr = ["S"]; // stores turns at each node

    let deltaX = nodes[1].xcoord - nodes[0].xcoord;
    let deltaY = nodes[1].ycoord - nodes[0].ycoord;

    let absoluteAngle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI; // degrees
    if(absoluteAngle<0) absoluteAngle += 360;
    let prevAngle = absoluteAngle; // previous absolute angle, start in same dir as path
    let relativeAngle = absoluteAngle - prevAngle; // indicates rotation by x amount [degrees]

    for (let i = 1; i < nodes.length; i++) {

        const currNode = nodes[i];
        const nextNode = nodes[i + 1];

        if(!currNode) break;
        if(!nextNode) { // on last node
            promptArr.push(`You have reached your destination, ${currNode.longName}.`);
            break;
        }

        ////////////////////////////////////////////////////////////////////////

        if (
            currNode.floor === nextNode.floor &&
            currNode.building === nextNode.building
        ) {
            // if in the same building and floor
            deltaX = nextNode.xcoord - currNode.xcoord;
            deltaY = nextNode.ycoord - currNode.ycoord; // flip y-axis for ease of computation
     //      promptArr.push(`|||| ${nextNode.ycoord} ${currNode.ycoord}`);

            absoluteAngle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI; // degrees
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
                promptArr.push('Take a slight right.');
                turnArr.push('SLR');
            } else if(Right) {
                promptArr.push('Take a right.');
                turnArr.push('R');
            } else if(SharpRight) {
                promptArr.push('Take a sharp right.');
                turnArr.push('SHR');
            } else if(SharpLeft) {
                promptArr.push('Take a sharp left.');
                turnArr.push('SHL');
            } else if(Left) {
                promptArr.push('Take a left.');
                turnArr.push('L');
            } else if(SlightLeft) {
                promptArr.push('Take a slight left.');
                turnArr.push('SLL');
            } else {
                distance = Math.round(euclideanDistance(currNode,nextNode));
                promptArr.push(`Head straight for ${distance} units of distance to reach ${nextNode.shortName}.`);
                turnArr.push('S');
            }

            prevAngle = absoluteAngle;
        }

        /////////////////////////////////////////////////////////////////////////

        if (
            currNode.floor === nextNode.floor &&
            currNode.building !== nextNode.building
        ) {
            // entering new building on the same floor
            // if in the same building and floor
            deltaX = nextNode.xcoord - currNode.xcoord;
            deltaY = nextNode.ycoord - currNode.ycoord;

            absoluteAngle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI; // degrees
            if(absoluteAngle<0) absoluteAngle += 360; // shift range to be from 0-360

            relativeAngle = absoluteAngle - prevAngle; // indicates rotation direction and amount
            promptArr.push(`|| ${relativeAngle}`);

            const SlightRight = (25<=relativeAngle && relativeAngle<=60);
            const Right = (60<relativeAngle && relativeAngle<120);
            const SharpRight = (120<=relativeAngle && relativeAngle<=155);
            // Straight -150 +/-180 150
            const SharpLeft = (-120>=relativeAngle && relativeAngle>=-155);
            const Left = (-60>relativeAngle && relativeAngle>-120);
            const SlightLeft = (-25>=relativeAngle && relativeAngle>=-60);

            if(SlightRight) {
                promptArr.push(` Take a slight right into building ${nextNode.building}.`);
                turnArr.push('SLR');
            } else if(Right) {
                promptArr.push(` Take a right into building ${nextNode.building}.`);
                turnArr.push('R');
            } else if(SharpRight) {
                promptArr.push(` Take a sharp right into building ${nextNode.building}.`);
                turnArr.push('SHR');
            } else if(SharpLeft) {
                promptArr.push(` Take a sharp left into building ${nextNode.building}.`);
                turnArr.push('SHL');
            } else if(Left) {
                promptArr.push(` Take a left into building ${nextNode.building}.`);
                turnArr.push('L');
            } else if(SlightLeft) {
                promptArr.push(` Take a slight left into building ${nextNode.building}.`);
                turnArr.push('SLL');
            } else {
                distance = Math.round(euclideanDistance(currNode,nextNode));
                promptArr.push(` Head straight for ${distance} units of distance to reach ${nextNode.shortName} in building ${nextNode.building}.`);
                turnArr.push('S');
            }

            prevAngle = absoluteAngle;
        }
    }

    // promptArr.push(`${nodes}`);
    return {promptArr,turnArr};
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

// adjusted to take DBNode
function euclideanDistance(nodeA: DBNode, nodeB: DBNode): number {
    return Math.sqrt(
        Math.pow(nodeA.xcoord - nodeB.xcoord, 2) +
        Math.pow(nodeA.ycoord - nodeB.ycoord, 2),
    );
}


