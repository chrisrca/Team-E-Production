import { CornerUpLeft } from "lucide-react";
import { MoveDownLeft } from "lucide-react";
import { MoveDownRight } from "lucide-react";
import { CornerUpRight } from "lucide-react";
import { MoveUpLeft } from "lucide-react";
import { MoveUpRight } from "lucide-react";
import { MoveUp } from "lucide-react";
import { Goal } from "lucide-react";
import { Map } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { DBNode } from "common/src/types";
import React from "react";

export default function TextDirection(nodes: DBNode[]) {
    let { prompts, turns, floors, previousAngle } = initTextDirection(nodes);

    for (let i = 1; i < nodes.length; i++) {
        const currNode = nodes[i];
        const nextNode = nodes[i + 1];

        if (!currNode) break;
        if (!nextNode) {
            // on last node
            prompts.push(
                `You have reached your destination, ${currNode.longName}.`,
            );
            turns.push("end");
            floors.push(`${currNode.floor}`);
            break;
        }

        ////////////////////////////////////////////////////////////////////////

        // if in the same building and floor
        if (
            currNode.floor === nextNode.floor &&
            currNode.building === nextNode.building
        ) {
            const promptType: string = "same building and floor";
            const { promptArr, turnArr, floorArr, prevAngle } = determinePrompt(
                nextNode,
                currNode,
                previousAngle,
                prompts,
                turns,
                floors,
                promptType,
            );

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
            const promptType: string = "diff building same floor";
            const { promptArr, turnArr, floorArr, prevAngle } = determinePrompt(
                nextNode,
                currNode,
                previousAngle,
                prompts,
                turns,
                floors,
                promptType,
            );

            previousAngle = prevAngle;
            prompts = promptArr;
            turns = turnArr;
            floors = floorArr;
        }

        ///////////////////////////////////////////////////////////////////////////

        // entering new floor
        else if (currNode.floor !== nextNode.floor) {
            const promptType: string = "diff floor";
            const { promptArr, turnArr, floorArr, prevAngle } = determinePrompt(
                nextNode,
                currNode,
                previousAngle,
                prompts,
                turns,
                floors,
                promptType,
            );

            previousAngle = prevAngle;
            prompts = promptArr;
            turns = turnArr;
            floors = floorArr;
        }

        ////////////////////////////////////////////////////////////////////////////////////////////
        else {
            prompts.push("Bang! Unexpected node condition.");
            turns.push("Error");
            floors.push("Error");
        }
    }

    // promptArr.push(`${nodes}`);
    return { prompts, turns, floors };
}

//////////////////////////////////////////////////////////

interface TextDirectionProps {
    prompts: string[];
    turns: string[];
    floors: string[];
    currFloor: number;
}

// this is what actually displays to screen
export function TextDirectionComponent(props: TextDirectionProps) {
    const prompts = props.prompts;
    const turns = props.turns;
    const floors = props.floors;
    const currFloor = props.currFloor;

    // Define a mapping object
    const componentMapping: { [key: string]: React.ComponentType } = {
        SLR: MoveUpRight,
        R: CornerUpRight,
        SHR: MoveDownRight,
        SHL: MoveDownLeft,
        L: CornerUpLeft,
        SLL: MoveUpLeft,
        S: MoveUp,
        start: Map,
        end: Goal,
        arise: ArrowUpDown,
    };

    const floor =
        currFloor === 0
            ? "L2"
            : currFloor === 1
              ? "L1"
              : currFloor === 2
                ? "1"
                : currFloor === 3
                  ? "2"
                  : "3";

    const filteredPrompts = prompts.filter(
        (_, index) => floors[index] === floor,
    );
    const filteredTurns = turns.filter((_, index) => floors[index] === floor);

    return (
        <div className="z-10 scrollbar scrollbar-track-rounded-full scrollbar-track-background scrollbar-thumb-rounded-full  scrollbar-thumb-primary w-[400px] h-[300px] absolute ml-14 top-2/3 mb-10 flex flex-col grow overflow-auto">
            {filteredPrompts?.map((prompt, index) => (
                <div
                    key={index}
                    className="flex-row p-2 border drop-shadow-xl z-10 bg-secondary shadow-md text-foreground rounded-lg flex items-center"
                >
                    <div className="border-black rounded-lg p-1">
                        {componentMapping[filteredTurns[index]]
                            ? React.createElement(
                                  componentMapping[filteredTurns[index]],
                              )
                            : `?`}
                    </div>
                    <div className="px-3">{prompt}</div>
                </div>
            ))}
        </div>
    );
}

//////////////////REFACTORED FOR CODE REUSE////////////////////////////////////

// first directions, establishes orientation
function initTextDirection(nodes: DBNode[]) {
    const distance = Math.round(euclideanDistance(nodes[0], nodes[1]));
    const prompts = [
        `Directions from ${nodes[0].longName} to ${nodes[nodes.length - 1].longName}:`,
    ]; // stores prompts

    // decide how to start the directions
    if (
        nodes[0].floor === nodes[1].floor &&
        nodes[0].building === nodes[1].building
    ) {
        // same floor same building
        prompts.push(
            `Head towards ${nodes[1].longName} for ${distance} units of distance.`,
        );
    } else if (
        nodes[0].floor === nodes[1].floor &&
        nodes[0].building !== nodes[1].building
    ) {
        // same floor different building
        prompts.push(
            `Head towards ${nodes[1].longName} in building ${nodes[1].building} for ${distance} units of distance.`,
        );
    } else if (nodes[0].floor !== nodes[1].floor) {
        // different floor
        let medium: string;
        if (nodes[0].nodeType === "ELEV") medium = "elevator";
        else if (nodes[0].nodeType === "STAI") medium = "stairs";
        else medium = "";
        prompts.push(`Take the ${medium} to floor ${nodes[1].floor}.`);
    } else prompts.push("Bang! If you see this there is an error.");

    const turns = ["start"]; // stores turns at each node, start assuming user is facing direction of line
    turns.push("S");
    const floors = [`${nodes[0].floor}`, `${nodes[0].floor}`]; // stores floor of each node

    const deltaX = nodes[1].xcoord - nodes[0].xcoord;
    const deltaY = nodes[1].ycoord - nodes[0].ycoord;

    let absoluteAngle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI; // degrees
    if (absoluteAngle < 0) absoluteAngle += 360;
    const previousAngle = absoluteAngle; // previous absolute angle, start in same dir as path

    return { prompts, turns, floors, previousAngle };
}

// determines the next prompt to store in array based on the inputs provided
function determinePrompt(
    nextNode: DBNode,
    currNode: DBNode,
    prevAngle: number,
    promptArr: string[],
    turnArr: string[],
    floorArr: string[],
    promptType: string,
) {
    let scriptArr: string[] = [""]; // set of listed possible prompts
    let turnScriptArr: string[] = [""]; // set of listed possible turns
    if (promptType === "same building and floor") {
        // same building and floor between this node and the next
        const distance = Math.round(euclideanDistance(currNode, nextNode));
        scriptArr = [
            `Take a slight right and continue for ${distance} units of distance until you reach ${nextNode.shortName}.`,
            `Take a right and continue for ${distance} units of distance until you reach ${nextNode.shortName}.`,
            `Take a sharp right and continue for ${distance} units of distance until you reach ${nextNode.shortName}.`,
            `Take a sharp left and continue for ${distance} units of distance until you reach ${nextNode.shortName}.`,
            `Take a left and continue for ${distance} units of distance until you reach ${nextNode.shortName}.`,
            `Take a slight left and continue for ${distance} units of distance until you reach ${nextNode.shortName}.`,
            `Head straight for ${distance} units of distance until you reach ${nextNode.shortName}.`,
        ];
        turnScriptArr = ["SLR", "R", "SHR", "SHL", "L", "SLL", "S"];
    } else if (promptType === "diff building same floor") {
        // different building but same floor between this node and the next
        const distance = Math.round(euclideanDistance(currNode, nextNode));
        scriptArr = [
            `Take a slight right into building ${nextNode.building} and continue for ${distance} units of distance until you reach ${nextNode.shortName}.`,
            `Take a right into building ${nextNode.building} and continue for ${distance} units of distance until you reach ${nextNode.shortName}.`,
            `Take a sharp right into building ${nextNode.building} and continue for ${distance} units of distance until you reach ${nextNode.shortName}.`,
            `Take a sharp left into building ${nextNode.building} and continue for ${distance} units of distance until you reach ${nextNode.shortName}.`,
            `Take a left into building ${nextNode.building} and continue for ${distance} units of distance until you reach ${nextNode.shortName}.`,
            `Take a slight left into building ${nextNode.building} and continue for ${distance} units of distance until you reach ${nextNode.shortName}.`,
            `Head straight into building ${nextNode.building} for ${distance} units of distance until you reach ${nextNode.shortName}.`,
        ];
        turnScriptArr = ["SLR", "R", "SHR", "SHL", "L", "SLL", "S"];
    } else if (promptType === "diff floor") {
        // different floor between this node and the next, so elevator or stairs
        let medium: string;
        if (currNode.nodeType === "ELEV") medium = "elevator";
        else if (currNode.nodeType === "STAI") medium = "stairs";
        else medium = ""; // set medium to be elevator or stairs, depending on node type

        for (let i = 0; i < 7; i++)
            scriptArr[i] = `Take the ${medium} to floor ${nextNode.floor}.`;
        for (let i = 0; i < 7; i++) turnScriptArr[i] = "arise";
    } else scriptArr = ["Bang! Should not be possible to see this :/"];

    const deltaX = nextNode.xcoord - currNode.xcoord;
    const deltaY = nextNode.ycoord - currNode.ycoord;

    let absoluteAngle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI; // degrees
    if (absoluteAngle < 0) absoluteAngle += 360; // shift range to be from 0-360

    // indicates rotation direction and amount
    let relativeAngle =
        absoluteAngle - prevAngle < -180
            ? absoluteAngle - prevAngle + 360 // keeps relative angle in the right 'domain'
            : absoluteAngle - prevAngle; // keeps relative angel in the right 'domain'
    if (relativeAngle > 180) relativeAngle -= 360;

    // by taking the difference of current heading and last heading, relativeAngle indicates relative rotation
    // -90 left turn, 90 right turn, etc.
    const SlightRight = 25 <= relativeAngle && relativeAngle <= 60;
    const Right = 60 < relativeAngle && relativeAngle < 120;
    const SharpRight = 120 <= relativeAngle && relativeAngle <= 155;
    // Straight -150 +/-180 150
    const SharpLeft = -120 >= relativeAngle && relativeAngle >= -155;
    const Left = -60 > relativeAngle && relativeAngle > -120;
    const SlightLeft = -25 >= relativeAngle && relativeAngle >= -60;

    // select correct prompt to push
    const index = SlightRight
        ? 0
        : Right
          ? 1
          : SharpRight
            ? 2
            : SharpLeft
              ? 3
              : Left
                ? 4
                : SlightLeft
                  ? 5
                  : 6;

    promptArr.push(scriptArr[index]); // for this node, display this prompt
    turnArr.push(turnScriptArr[index]); // for this node, the next direction will be this turn
    floorArr.push(`${currNode.floor}`); // keep track of which floor current node is on

    prevAngle = absoluteAngle; // used to determine relative direction for next node
    return { promptArr, turnArr, floorArr, prevAngle };
}

// adjusted to take DBNode
function euclideanDistance(nodeA: DBNode, nodeB: DBNode): number {
    return Math.sqrt(
        Math.pow(nodeA.xcoord - nodeB.xcoord, 2) +
            Math.pow(nodeA.ycoord - nodeB.ycoord, 2),
    );
}
