import { DBNode } from "common/src/types";

export default function TextDirection(nodes: DBNode[]) {
    console.log(nodes);

    const directions: string[] = ["Start"];

    for (let i = 0; i < nodes.length; i++) {
        const currNode = nodes[i];
        const nextNode = nodes[i + 1];

        if (
            currNode.floor === nextNode.floor &&
            currNode.building === nextNode.building
        ) {
            // same floor and building
            const deltaX = nextNode.xcoord - currNode.xcoord;
            const deltaY = nextNode.ycoord - currNode.ycoord;
            const angle = (Math.atan2(deltaY,deltaX))*180/Math.PI; // degrees

            if(Math.abs(angle) < 45) directions.push("Right"); // right turn if -45<angle<45
            else if((180 - Math.abs(angle)) < 45) directions.push("Left"); // left turn if angle between -135 and 135 on unit circle
            else if(Math.abs(angle) === 45) directions.push("Slight Right");
            else if(Math.abs(angle) === 135) directions.push("Slight Left");
            else directions.push("Straight"); // +/- 90 deg considered straight

        }
    }

    return directions; // change later
}
