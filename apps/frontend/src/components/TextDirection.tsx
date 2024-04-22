import { DBNode } from "common/src/types";

export default function TextDirection(nodes: DBNode[]) {
    const directions=["Head towards " + nodes[1].shortName];

    let deltaX = nodes[1].xcoord - nodes[0].xcoord;
    let deltaY = nodes[1].ycoord - nodes[0].ycoord;

    let absoluteAngle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI; // degrees
    let relativeAngle = 0; // indicates rotation by x amount [degrees]
    let prevAngle = 0; // previous absolute angle

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

            relativeAngle = prevAngle - absoluteAngle; // indicates rotation direction and amount

            const SlightRight = (-30>=relativeAngle && relativeAngle>=-60);
            const Right = (-60>relativeAngle && relativeAngle>-120);
            const SharpRight = (-120>=relativeAngle && relativeAngle>=-150);
            // Straight -150 +/-180 150
            const SharpLeft = (120<=relativeAngle && relativeAngle<=150);
            const Left = (60<relativeAngle && relativeAngle<120);
            const SlightLeft = (30<=relativeAngle && relativeAngle<=60);

            if(SlightRight) directions.push(" Slight Right ");
            else if(Right) directions.push(" Right ");
            else if(SharpRight) directions.push(" Sharp Right ");
            else if(SharpLeft) directions.push(" Sharp Left ");
            else if(Left) directions.push(" Left ");
            else if(SlightLeft) directions.push(" Slight Left ");
            else directions.push(` Straight `);

            prevAngle = absoluteAngle;
        }
    }

    return directions;
}


