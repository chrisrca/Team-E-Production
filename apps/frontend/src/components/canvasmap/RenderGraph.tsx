import { DBNode } from "common/src/types";
import drawNodes from "@/components/canvasmap/MapShapes.ts";

export default function drawGraph(
    ctx: CanvasRenderingContext2D,
    xMult: number,
    yMult: number,
    pathData: DBNode[],
    nodeData: DBNode[],
    mapLevel: number,
) {
    const floor = ["L2", "L1", "1", "2", "3"];
    ctx.imageSmoothingEnabled = true;

    //PATH DRAWING
    if (pathData.length > 0) {
        ctx.setLineDash([7, 3]);
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
    drawNodes(ctx, nodeData, xMult, yMult, mapLevel);
}
