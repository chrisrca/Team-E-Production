import React, { useEffect, useState, useRef } from "react";
import {
    TransformWrapper,
    TransformComponent,
    ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import { DBNode } from "common/src/types";
import LLevel1 from "./mapImages/00_thelowerlevel1.png";
import LLevel2 from "./mapImages/00_thelowerlevel2.png";
import Level1 from "./mapImages/01_thefirstfloor.png";
import Level2 from "./mapImages/02_thesecondfloor.png";
import Level3 from "./mapImages/03_thethirdfloor.png";

const MapImage = [LLevel2, LLevel1, Level1, Level2, Level3];
interface CanvasMapProps {
    nodes: DBNode[];
    path: DBNode[][];
    level: number;
}

export default function EditorMap(nodes: CanvasMapProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const nodeData = nodes.nodes;
    const pathData = nodes.path;
    const mapLevel = nodes.level;

    //RESIZING OF CANVAS
    useEffect(() => {
        const image = new Image();
        image.src = MapImage[mapLevel];
        image.onload = () => {
            setImageSize({ width: image.width, height: image.height });
        };

        // Update container size on mount
        updateContainerSize();
        // Update container size on window resize
        window.addEventListener("resize", updateContainerSize);

        return () => {
            window.removeEventListener("resize", updateContainerSize);
        };
    }, [mapLevel]);

    // Function to update container size
    const updateContainerSize = () => {
        setContainerSize({
            width: window.outerWidth,
            height: window.outerHeight,
        });
    };

    // Function to handle panning stopped event
    const handlePanningStopped = (e: ReactZoomPanPinchRef) => {
        const x = e.state.positionX;
        const y = e.state.positionY;
        const scale = e.state.scale;

        // If image is smaller than the container, center it
        if (imageSize.width * scale < containerSize.width) {
            e.setTransform(
                (containerSize.width - imageSize.width * scale) / 2,
                y,
                scale,
            );
        }
        if (imageSize.height * scale < containerSize.height) {
            e.setTransform(
                x,
                (containerSize.width - imageSize.width * scale) / 2,
                scale,
            );
        }
    };

    //DRAWING OF NODES AND PATH
    useEffect(() => {
        const floor = ["L2", "L1", "1", "2", "3"];
        const xMult = imageSize.width / 5000;
        const yMult = imageSize.height / 3400;
        function drawNodes(ctx: CanvasRenderingContext2D) {
            //NODE DRAWING
            nodeData.forEach((node) => {
                if (node.floor !== floor[mapLevel]) return;
                ctx.fillText(
                    node.nodeID,
                    node.xcoord * xMult,
                    node.ycoord * yMult,
                );
                // Original Dot
                ctx.beginPath();
                ctx.fillStyle = "#002244"; // Color of the dot
                ctx.arc(
                    node.xcoord * xMult,
                    node.ycoord * yMult,
                    3, // Radius of the dot
                    0,
                    2 * Math.PI,
                );
                ctx.fill();

                // Ring around the Dot
                ctx.setLineDash([5, 0]);
                ctx.beginPath();
                ctx.strokeStyle = "#012d5a"; // Color of the ring
                ctx.lineWidth = 2; // Width of the ring
                ctx.arc(
                    node.xcoord * xMult,
                    node.ycoord * yMult,
                    6, // Radius of the ring
                    0,
                    2 * Math.PI,
                );
                ctx.stroke();
            });
            //PATH DRAWING

            if (pathData.length > 0) {
                ctx.setLineDash([5, 0]);
                ctx.strokeStyle = "#1d3e60";
                ctx.lineWidth = 4;
                // Iterate over each path group in pathData
                for (const group of pathData) {
                    // Start a new path for each group
                    if (
                        group.length > 0 &&
                        group[0].floor === floor[mapLevel]
                    ) {
                        ctx.beginPath();
                        ctx.moveTo(
                            group[0].xcoord * xMult,
                            group[0].ycoord * yMult,
                        ); // Move to the start of this path

                        // Draw lines to each subsequent node in the group
                        for (let i = 1; i < group.length; i++) {
                            const node = group[i];
                            if (node.floor === floor[mapLevel]) {
                                ctx.lineTo(
                                    node.xcoord * xMult,
                                    node.ycoord * yMult,
                                );
                            }
                        }

                        // Finish the path for this group
                        ctx.stroke();
                    }
                }
            }
        }
        //This shit supposed to draw the image and the nodes let's goooo
        const image = new Image();
        image.src = MapImage[mapLevel];
        // Path to your image file
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
            if (context) {
                image.onload = () => {
                    context.drawImage(image, 0, 0, canvas.width, canvas.height);
                    drawNodes(context!);
                };
            }
        }
    }, [nodeData, pathData, imageSize, mapLevel]);

    return (
        <TransformWrapper
            initialScale={1.5}
            centerOnInit={true}
            limitToBounds={true}
            minScale={1}
            maxScale={4}
            wheel={{ step: 0.5 }}
            doubleClick={{ disabled: false }}
            onPanningStop={handlePanningStopped}
        >
            <TransformComponent>
                <canvas
                    ref={canvasRef}
                    height={3400}
                    width={5000}
                    style={{ width: "100%", height: "100%", display: "block" }}
                    id="layer1"
                />
            </TransformComponent>
        </TransformWrapper>
    );
}
