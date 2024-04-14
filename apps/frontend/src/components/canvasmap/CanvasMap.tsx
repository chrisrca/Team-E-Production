import React, { useEffect, useState, useRef, useMemo } from "react";
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
import drawGraph from "@/components/canvasmap/RenderGraph.tsx";

const MapImage = [LLevel2, LLevel1, Level1, Level2, Level3];
interface CanvasMapProps {
    nodes: DBNode[];
    path: DBNode[];
    level: number;
    setLevel: (level: number) => void; // Add setLevel prop
}

export default function CanvasMap(nodes: CanvasMapProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [nodeInfoPosition, setNodeInfoPosition] = useState({
        x: 0,
        y: 0,
        z: 0,
    });
    const nullNode: DBNode = useMemo(
        () => ({
            building: "",
            edges: [],
            floor: "",
            longName: "",
            nodeID: "",
            nodeType: "",
            shortName: "",
            xcoord: 0,
            ycoord: 0,
        }),
        [],
    );
    const [hoverNode, sethoverNode] = useState(nullNode);
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

    // This function took like 3 hours dont touch it
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
            z: 9999,
        });
    };

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

        if (hoverNode.longName !== "") {
            console.log(x, y, hoverNode.longName);
        }

        if (hoverNode.nodeType == "ELEV") {
            for (let i = 0; i < pathData.length - 1; i++) {
                if (
                    pathData[i].nodeID == hoverNode.nodeID &&
                    pathData[i].nodeType == "ELEV" &&
                    pathData[i + 1].nodeType == "ELEV"
                ) {
                    const floor = ["L2", "L1", "1", "2", "3"];
                    nodes.setLevel(floor.indexOf(pathData[i + 1].floor));
                }
            }
        }
    };

    //DRAWING OF NODES AND PATH
    useEffect(() => {
        const xMult = imageSize.width / 5000;
        const yMult = imageSize.height / 3400;

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
                    drawGraph(
                        context!,
                        xMult,
                        yMult,
                        pathData,
                        nodeData,
                        mapLevel,
                        mousePosition,
                    );
                };
            }
        }
    }, [nodeData, pathData, imageSize, mapLevel, mousePosition]);

    function calculateDistance(point1: { x: number; y: number }, node: DBNode) {
        return Math.sqrt(
            Math.pow(node.xcoord - point1.x, 2) +
                Math.pow(node.ycoord - point1.y, 2),
        );
    }

    useEffect(() => {
        const floor = ["L2", "L1", "1", "2", "3"];

        for (const node of nodeData) {
            if (node.floor === floor[mapLevel]) {
                if (calculateDistance(mousePosition, node) < 9) {
                    sethoverNode(node);
                    break;
                }
                sethoverNode(nullNode);
            }
        }
    }, [
        nodeData,
        hoverNode,
        mousePosition,
        nullNode,
        mapLevel,
        nodeInfoPosition,
    ]);

    return (
        <>
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 9999,
                    pointerEvents: "none",
                }}
            ></div>
            {hoverNode.longName && (
                <div
                    className={
                        "ml-4 justify-items-center absolute z-10 text-2xl rounded-2xl p-5 flex flex-col rounded-2 float-left top-0"
                    }
                    style={{
                        position: "absolute",
                        top: `${nodeInfoPosition.y}px`,
                        left: `${nodeInfoPosition.x}px`,
                        zIndex: `${nodeInfoPosition.z}px`,
                        background: "#ffffff",
                        whiteSpace: "nowrap", // Prevent text from wrapping
                        fontSize: "14px",
                        padding: "5px", // Adjust padding as needed
                        minWidth: "fit-content", // Allow the div to expand only as much as needed
                        maxWidth: "calc(100% - 20px)", // Limit the maximum width to ensure it doesn't exceed the viewport
                    }}
                >
                    {hoverNode.longName}
                </div>
            )}
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
                        onMouseMove={handleMouseMoveCanvas}
                        onClick={handleMouseClick}
                    />
                </TransformComponent>
            </TransformWrapper>
        </>
    );
}
