import { DBNode } from "common/src/types";

export default function TextDirection(nodes: DBNode[]) {
    const directions=["Head towards " + nodes[1].shortName + "."];

    let deltaX = nodes[1].xcoord - nodes[0].xcoord;
    let deltaY = nodes[1].ycoord - nodes[0].ycoord;

    let absoluteAngle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI; // degrees
    if(absoluteAngle<0) absoluteAngle += 360;
    let relativeAngle = 0; // indicates rotation by x amount [degrees]
    let prevAngle = absoluteAngle; // previous absolute angle

    for (let i = 1; i < nodes.length; i++) {

        const currNode = nodes[i];
        const nextNode = nodes[i + 1];

        if(!currNode || !nextNode) break;

        if (
            currNode.floor === nextNode.floor &&
            currNode.building === nextNode.building
        ) {
            // if in the same building and floor
            deltaX = nextNode.xcoord - currNode.xcoord;
            deltaY = nextNode.ycoord - currNode.ycoord;

            absoluteAngle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI; // degrees
            if(absoluteAngle<0) absoluteAngle += 360; // shift range to be from 0-360

            relativeAngle = absoluteAngle - prevAngle; // indicates rotation direction and amount
            directions.push(`|| ${relativeAngle}`);

            const SlightRight = (25<=relativeAngle && relativeAngle<=60);
            const Right = (60<relativeAngle && relativeAngle<120);
            const SharpRight = (120<=relativeAngle && relativeAngle<=155);
            // Straight -150 +/-180 150
            const SharpLeft = (-120>=relativeAngle && relativeAngle>=-155);
            const Left = (-60>relativeAngle && relativeAngle>-120);
            const SlightLeft = (-25>=relativeAngle && relativeAngle>=-60);

            if(SlightRight) directions.push(" Take a slight right. ");
            else if(Right) directions.push(" Take a right. ");
            else if(SharpRight) directions.push(" Take a sharp right. ");
            else if(SharpLeft) directions.push(" Take a sharp left. ");
            else if(Left) directions.push(" Take a left. ");
            else if(SlightLeft) directions.push(" Take a slight left. ");
            else directions.push(` Head straight for ____ ft `);

            directions.push(" ||");
            prevAngle = absoluteAngle;
        }
    }

    return directions;
}

//////////////////////////////////////////////////////////

interface TextDirectionProps {
    directions: string[]
}

export function TextDirectionComponent(props:TextDirectionProps) {
    const dirArr = props.directions;
    return (
        <div className="flex flex-col">
            {dirArr.map((direction) =>
                <div
                    className="flex rounded-2 border-black drop-shadow-xl z-10 bg-secondary p-3 rounded-lg shadow-md text-foreground">
                    {direction}
                </div>
            )}
        </div>

    );
}


