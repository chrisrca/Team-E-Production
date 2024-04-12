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
import NodeEditor from "./NodeEditor"; // Import NodeEditor function
import NodeEditorButton from "./NodeEditorButton"; // Adjust the import path as necessary

const MapImage = [LLevel2, LLevel1, Level1, Level2, Level3];
interface CanvasMapProps {
    nodes: DBNode[];
    path: DBNode[][];
    level: number;
}

export default function EditorMap(props: CanvasMapProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const [selectedNode, setSelectedNode] = useState<DBNode | null>(null);
    const [showNodeEditor, setShowNodeEditor] = useState(false);

    const { nodes, path, level } = props;

    // Resize canvas and set container size
    useEffect(() => {
        const image = new Image();
        image.src = MapImage[level];
        image.onload = () => {
            setImageSize({ width: image.width, height: image.height });
        };

        // Update container size on mount and on window resize
        const updateContainerSize = () => {
            setContainerSize({
                width: window.outerWidth,
                height: window.outerHeight,
            });
        };
        updateContainerSize();
        window.addEventListener("resize", updateContainerSize);

        return () => {
            window.removeEventListener("resize", updateContainerSize);
        };
    }, [level]);

    // Handle panning stopped event
    const handlePanningStopped = (e: ReactZoomPanPinchRef) => {
        const x = e.state.positionX;
        const y = e.state.positionY;
        const scale = e.state.scale;

        // Center image if smaller than container
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
                (containerSize.height - imageSize.height * scale) / 2,
                scale,
            );
        }
    };

    // Handle node click
    const handleNodeClick = (node: DBNode) => {
        setSelectedNode(node);
        setShowNodeEditor(true);
    };

    // Draw nodes and paths on the canvas
    useEffect(() => {
        const floor = ["L2", "L1", "1", "2", "3"];
        const xMult = imageSize.width / 5000;
        const yMult = imageSize.height / 3400;

        function drawNodes(ctx: CanvasRenderingContext2D) {
            // Node drawing
            nodes.forEach((node) => {
                if (node.floor !== floor[level]) return;

                // Original dot
                ctx.beginPath();
                ctx.fillStyle = "#002244";
                ctx.arc(
                    node.xcoord * xMult,
                    node.ycoord * yMult,
                    3,
                    0,
                    2 * Math.PI,
                );
                ctx.fill();

                // Ring around the dot
                ctx.setLineDash([5, 0]);
                ctx.beginPath();
                ctx.strokeStyle = "#012d5a";
                ctx.lineWidth = 2;
                ctx.arc(
                    node.xcoord * xMult,
                    node.ycoord * yMult,
                    6,
                    0,
                    2 * Math.PI,
                );
                ctx.stroke();

                // Add event listener for node clicks
                canvasRef.current?.addEventListener("click", (e) => {
                    // Calculate the click position in the canvas
                    const rect = canvasRef.current.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const clickY = e.clientY - rect.top;

                    // Calculate the distance between the click position and the node
                    const dx = clickX - node.xcoord * xMult;
                    const dy = clickY - node.ycoord * yMult;
                    const distance = Math.sqrt(dx ** 2 + dy ** 2);

                    // If the click is within the radius of the ring around the node, handle the node click
                    if (distance <= 6) {
                        handleNodeClick(node);
                    }
                });
            });

            // Path drawing
            if (path.length > 0) {
                ctx.setLineDash([5, 0]);
                ctx.strokeStyle = "#1d3e60";
                ctx.lineWidth = 4;

                for (const group of path) {
                    if (group.length > 0 && group[0].floor === floor[level]) {
                        ctx.beginPath();
                        ctx.moveTo(
                            group[0].xcoord * xMult,
                            group[0].ycoord * yMult,
                        );

                        for (let i = 1; i < group.length; i++) {
                            const node = group[i];
                            if (node.floor === floor[level]) {
                                ctx.lineTo(
                                    node.xcoord * xMult,
                                    node.ycoord * yMult,
                                );
                            }
                        }

                        ctx.stroke();
                    }
                }
            }
        }

        // Load image and draw nodes
        const image = new Image();
        image.src = MapImage[level];
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
            if (context) {
                image.onload = () => {
                    context.drawImage(image, 0, 0, canvas.width, canvas.height);
                    drawNodes(context);
                };
            }
        }
    }, [nodes, path, imageSize, level]);

    return (
        <div style={{ position: "relative" }}>
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
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "block",
                        }}
                        id="layer1"
                    />
                </TransformComponent>
            </TransformWrapper>

            {/* Add NodeEditorButton and position it to the side */}
            <NodeEditorButton
                openNodeEditor={() => setShowNodeEditor(true)}
                style={{ position: "absolute", right: 10, top: 10 }}
            />

            {/* Conditionally render NodeEditor */}
            {showNodeEditor && selectedNode && (
                <NodeEditor
                    node={selectedNode}
                    onSave={(updatedNode) => {
                        console.log(updatedNode);
                        // Handle save logic here
                        setShowNodeEditor(false);
                    }}
                    onCancel={() => setShowNodeEditor(false)}
                />
            )}
        </div>
    );
}
