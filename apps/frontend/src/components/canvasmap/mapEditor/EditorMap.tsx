import React, { useEffect, useState, useRef } from "react";
import {
    TransformWrapper,
    TransformComponent,
    ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import { DBNode } from "common/src/types";
import LLevel1 from "../mapImages/00_thelowerlevel1.png";
import LLevel2 from "../mapImages/00_thelowerlevel2.png";
import Level1 from "../mapImages/01_thefirstfloor.png";
import Level2 from "../mapImages/02_thesecondfloor.png";
import Level3 from "../mapImages/03_thethirdfloor.png";
import drawGraph from "@/components/canvasmap/mapEditor/RenderGraph.tsx";
import NodeEditor from "./NodeEditor";

// Array of map images for each level
const MapImage = [LLevel2, LLevel1, Level1, Level2, Level3];

// Interface for the component's props
interface CanvasMapProps {
    nodes: DBNode[];
    path: DBNode[][];
    level: number;
}

// EditorMap component function
export default function EditorMap(props: CanvasMapProps) {
    const { nodes, path, level } = props;

    // State for selected node
    const [selectedNode, setSelectedNode] = useState<DBNode | null>(null);
    const [hoverNode, setHoverNode] = useState<DBNode | null>(null);
    const [dragNode, setDragNode] = useState<DBNode | null>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    // Existing states and refs
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const [nodeInfoPosition, setNodeInfoPosition] = useState({ x: 0, y: 0, });

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [mouseState, setMouseState] = useState({ down: false });


    // Effect to handle image loading and updating container size
    useEffect(() => {
        const image = new Image();
        image.src = MapImage[level];
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
    }, [level]);

    // Function to update container size
    const updateContainerSize = () => {
        setContainerSize({
            width: window.outerWidth,
            height: window.outerHeight,
        });
    };

    // Function to handle panning stop events
    const handlePanningStopped = (e: ReactZoomPanPinchRef) => {
        const x = e.state.positionX;
        const y = e.state.positionY;
        const scale = e.state.scale;

        // Center image if it's smaller than the container
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

    // Map current mouse position onto canvas
    const handleMouseMoveCanvas = (
        event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    ) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();

        const scaleX = canvas.width / rect.width; // relationship bitmap vs. element for X
        const scaleY = canvas.height / rect.height; // relationship bitmap vs. element for Y

        const x = (event.clientX - rect.left) * scaleX; // scale mouse coordinates after they have
        const y = (event.clientY - rect.top) * scaleY; // been adjusted to be relative to element

        setMousePosition({ x, y });
        setNodeInfoPosition({
            x: event.nativeEvent.clientX,
            y: event.nativeEvent.clientY,
        });

        for (let i = 0; i < nodes.length; i++) {
            if ((selectedNode?.nodeID == nodes[i].nodeID && mouseState.down) && isDragging) {
                nodes[i].xcoord = mousePosition.x;
                nodes[i].ycoord = mousePosition.y;
            }
        }
    };

    const handleMouseDown = (
    ) => {
        setMouseState({ down: true });
        for (let i = 0; i < nodes.length; i++) {
            if ((selectedNode?.nodeID == nodes[i].nodeID) && (calculateDistance(mousePosition, nodes[i]) < 9)) {
                setDragNode(nodes[i]);
                setIsDragging(true);
            }
        }
    };

    const handleMouseUp = (
    ) => {
        setMouseState({ down: false });
        setDragNode(null);
        setIsDragging(false);
    };

    // Function to handle mouse click on canvas
    const handleMouseClick = (
        event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    ) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();

        const scaleX = canvas.width / rect.width; // relationship bitmap vs. element for X
        const scaleY = canvas.height / rect.height; // relationship bitmap vs. element for Y

        const x = (event.clientX - rect.left) * scaleX; // scale mouse coordinates after they have
        const y = (event.clientY - rect.top) * scaleY; // been adjusted to be relative to element

        // Check if a node is clicked and set it as selected
        if (hoverNode != null) {
            console.log(x, y, hoverNode.longName);
            setSelectedNode(hoverNode);
        }
    };

    //DRAWING OF NODES AND PATH
    useEffect(() => {
        const xMult = imageSize.width / 5000;
        const yMult = imageSize.height / 3400;

        //This shit supposed to draw the image and the nodes let's goooo
        const image = new Image();
        image.src = MapImage[level];
        // Path to your image file
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
            if (context) {
                image.onload = () => {
                    context.drawImage(image, 0, 0, canvas.width, canvas.height);
                    drawGraph(
                        context!,
                        xMult,
                        yMult,
                        path,
                        nodes,
                        level,
                        mousePosition,
                        dragNode,
                    );
                };
            }
        }
    }, [nodes, path, imageSize, level, mousePosition, dragNode]);

    function calculateDistance(point1: { x: number; y: number }, node: DBNode) {
        return Math.sqrt(
            Math.pow(node.xcoord - point1.x, 2) +
                Math.pow(node.ycoord - point1.y, 2),
        );
    }

    // Effect to detect hover node
    useEffect(() => {
        const floor = ["L2", "L1", "1", "2", "3"];

        for (const node of nodes) {
            if (node.floor === floor[level]) {
                if (calculateDistance(mousePosition, node) < 9) {
                    setHoverNode(node);
                    break;
                }
                setHoverNode(null);
            }
        }
    }, [nodes, hoverNode, mousePosition, level, nodeInfoPosition]);

    return (
        <>
            {/* Node Editor */}
            {selectedNode && <NodeEditor node={selectedNode} />}

            {/* Render map and canvas */}
            <TransformWrapper
                initialScale={1.5}
                centerOnInit={true}
                limitToBounds={true}
                minScale={1}
                maxScale={4}
                wheel={{ step: 0.5 }}
                doubleClick={{ disabled: false }}
                onPanningStop={handlePanningStopped}
                disabled={isDragging}
            >
                <TransformComponent>
                    <canvas
                        ref={canvasRef}
                        height={3400}
                        width={5000}
                        style={{
                            width: "78%",
                        }}
                        id="layer1"
                        onMouseMove={handleMouseMoveCanvas}
                        onClick={handleMouseClick}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                    />
                </TransformComponent>
            </TransformWrapper>
        </>
    );
}
