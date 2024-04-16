import { DBNode } from "common/src/types";
import drawNodes from "@/components/canvasmap/map/MapShapes.tsx";

// let oldPathData = null;

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

    // const drawnLines = [];

    // function animateLine(ctx, pathData, speed, floor, mapLevel) {
    //     let i = 0;
    //     let startTime = performance.now();
    //     let duration = getDuration(pathData[i], pathData[i + 1], speed);

    //     function getDuration(node1, node2, speed) {
    //         const dx = node2.xcoord - node1.xcoord;
    //         const dy = node2.ycoord - node1.ycoord;
    //         const distance = Math.sqrt(dx * dx + dy * dy);
    //         return distance / speed;
    //     }

    //     function drawLine(timestamp) {
    //         const progress = Math.min((timestamp - startTime) / duration, 1);

    //         if (i < pathData.length - 1) {
    //             const node1 = pathData[i];
    //             const node2 = pathData[i + 1];

    //             if (node1.floor === floor[mapLevel] && node2.floor === floor[mapLevel]) {
    //                 ctx.beginPath();
    //                 ctx.moveTo(node1.xcoord, node1.ycoord);
    //                 ctx.lineTo(node1.xcoord + (node2.xcoord - node1.xcoord) * progress, node1.ycoord + (node2.ycoord - node1.ycoord) * progress);
    //                 ctx.stroke();

    //                 // Add the new line segment to drawnLines
    //                 if (progress >= 1) {
    //                     drawnLines.push({ node1, node2 });
    //                 }
    //             }

    //             if (progress >= 1) {
    //                 i++;
    //                 startTime = performance.now();
    //                 if (i < pathData.length - 1) {
    //                     duration = getDuration(pathData[i], pathData[i + 1], speed);
    //                 }
    //             }
    //         }

    //         if (i < pathData.length - 1) {
    //             window.requestAnimationFrame(drawLine);
    //         }
    //     }

    //     window.requestAnimationFrame(drawLine);
    // }

    //PATH DRAWING
    if (pathData.length > 0) {
        //     animateLine(ctx, pathData, 0.1, floor, mapLevel);
        //     // ctx.setLineDash([7, 3]);
        //     // ctx.strokeStyle = "#000000";
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

    // Redraw the lines in drawnLines
    // for (const { node1, node2 } of drawnLines) {
    //     if (
    //         node1.floor === floor[mapLevel] &&
    //         node2.floor === floor[mapLevel]
    //     ) {
    //         ctx.beginPath();
    //         ctx.moveTo(node1.xcoord, node1.ycoord);
    //         ctx.lineTo(node2.xcoord, node2.ycoord);
    //         ctx.stroke();
    //     }
    // }
    // if (JSON.stringify(pathData) != JSON.stringify(oldPathData)) {
    //     oldPathData = pathData;
    //     animateLine(ctx, pathData, 0.1, floor, mapLevel);
    // }

    //NODE DRAWING
    drawNodes(ctx, nodeData, xMult, yMult, mapLevel, mousePosition);
    drawElevators(ctx, pathData, xMult, yMult, floor[mapLevel], mousePosition);
    drawStairs(ctx, pathData, xMult, yMult, floor[mapLevel], mousePosition);
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
                "#3f8f29",
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
                "#de1a24",
            );
        }
    }
}

function drawStairs(
    ctx: CanvasRenderingContext2D,
    pathData: DBNode[],
    xMult: number,
    yMult: number,
    mapLevel: string,
    mousePosition: { x: number; y: number },
) {
    for (let i = 0; i < pathData.length - 1; i++) {
        if (
            pathData[i].nodeType == "STAI" &&
            pathData[i + 1].nodeType == "STAI"
        ) {
            drawNewFloor(
                ctx,
                pathData[i],
                xMult,
                yMult,
                mapLevel,
                mousePosition,
                pathData[i + 1].floor,
                "#3f8f29",
            );
        }
    }

    for (let i = pathData.length - 1; i > 0; i--) {
        if (
            pathData[i].nodeType == "STAI" &&
            pathData[i - 1].nodeType == "STAI"
        ) {
            drawNewFloor(
                ctx,
                pathData[i],
                xMult,
                yMult,
                mapLevel,
                mousePosition,
                pathData[i - 1].floor,
                "#de1a24",
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
