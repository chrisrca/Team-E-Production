import { DBNode } from "common/src/types";
import drawNodes from "@/components/canvasmap/map/MapShapes.tsx";

export default function drawGraph(
    ctx: CanvasRenderingContext2D,
    xMult: number,
    yMult: number,
    pathData: DBNode[],
    nodeData: DBNode[],
    mapLevel: number,
    mousePosition: { x: number; y: number },
) {
    const floor = ["L2", "L1", "1", "2", "3"];
    ctx.imageSmoothingEnabled = true;

    //PATH DRAWING
    if (pathData.length > 0) {
        // ctx.setLineDash([7, 3]);
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 4;
        if (pathData[0].floor === floor[mapLevel]) {
            ctx.beginPath();
            ctx.moveTo(pathData[0].xcoord * xMult, pathData[0].ycoord * yMult);
        }
        for (let i = 1; i < pathData.length; i++) {
            const node = pathData[i];
            if (node.floor === floor[mapLevel]) {
                //LINE DRAWING
                ctx.lineTo(node.xcoord * xMult, node.ycoord * yMult);
            }
            if (node.floor !== floor[mapLevel]) {
                ctx.stroke();
                ctx.beginPath();
                continue;
            }

            if (pathData[pathData.length - 1].floor === floor[mapLevel]) {
                ctx.stroke();
            }
        }
        ctx.setLineDash([5, 0]);
        ctx.lineWidth = 2;
    }

    //NODE DRAWING
    drawNodes(ctx, nodeData, xMult, yMult, mapLevel, mousePosition);
    drawElevators(ctx, pathData, xMult, yMult, floor[mapLevel], mousePosition);
}

function drawElevators(
    ctx: CanvasRenderingContext2D,
    pathData: DBNode[],
    xMult: number,
    yMult: number,
    mapLevel: string,
    mousePosition: { x: number; y: number },
) {
    for (let i = 0; i < pathData.length - 1; i++) {
        if (
            pathData[i].nodeType == "ELEV" &&
            pathData[i + 1].nodeType == "ELEV"
        ) {
            drawNewFloor(
                ctx,
                pathData[i],
                xMult,
                yMult,
                mapLevel,
                mousePosition,
                pathData[i + 1].floor,
                "#3f8f29"
            );
        }
    }

    for (let i = pathData.length - 1; i > 0; i--) {
        if (
            pathData[i].nodeType == "ELEV" &&
            pathData[i - 1].nodeType == "ELEV"
        ) {
            drawNewFloor(
                ctx,
                pathData[i],
                xMult,
                yMult,
                mapLevel,
                mousePosition,
                pathData[i - 1].floor,
                "#de1a24"
            );
        }
    }
}

function drawNewFloor(
    ctx: CanvasRenderingContext2D,
    node: DBNode,
    xMult: number,
    yMult: number,
    mapLevel: string,
    mousePosition: { x: number; y: number },
    floor: string,
    color: string,
) {
    if (node.floor !== mapLevel) return;
    let size = 12;
    if (calculateDistance(mousePosition, node) < 12) {
        size *= 2;
    }
    ctx.beginPath();
    ctx.fillStyle = "#ffffff";
    ctx.arc(node.xcoord * xMult, node.ycoord * yMult, size, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#ffffff";
    if (calculateDistance(mousePosition, node) < 12) {
        if (floor.length > 1) {
            ctx.font = "30px Arial";
            ctx.fillText(
                floor,
                node.xcoord * xMult - 15,
                node.ycoord * yMult + 12,
            );
        } else {
            ctx.font = "30px Arial";
            ctx.fillText(
                floor,
                node.xcoord * xMult - 8,
                node.ycoord * yMult + 12,
            );
        }
    } else {
        if (floor.length > 1) {
            ctx.font = "14px Arial";
            ctx.fillText(
                floor,
                node.xcoord * xMult - 7,
                node.ycoord * yMult + 6,
            );
        } else {
            ctx.font = "14px Arial";
            ctx.fillText(
                floor,
                node.xcoord * xMult - 4,
                node.ycoord * yMult + 6,
            );
        }
    }
}

function calculateDistance(point1: { x: number; y: number }, node: DBNode) {
    return Math.sqrt(
        Math.pow(node.xcoord - point1.x, 2) +
            Math.pow(node.ycoord - point1.y, 2),
    );
}
