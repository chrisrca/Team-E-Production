import React, { useEffect, useState, useRef, useMemo } from "react";
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
import drawGraph from "@/components/canvasmap/map/RenderGraph.tsx";

const MapImage = [LLevel2, LLevel1, Level1, Level2, Level3];
interface CanvasMapProps {
    nodes: DBNode[];
    path: DBNode[];
    level: number;
    setLevel: (level: number) => void;
    start: (start: string) => void;
    end: (end: string) => void;
}

export default function CanvasMap(nodes: CanvasMapProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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
            blocked: false,
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

        const floor = ["L2", "L1", "1", "2", "3"];

        let tempHoverNode: DBNode = nullNode;

        for (const node of nodeData) {
            if (node.floor === floor[mapLevel]) {
                if (calculateDistance(mousePosition, node) < 12) {
                    sethoverNode(node);
                    tempHoverNode = node;
                    break;
                }
                sethoverNode(nullNode);
            }
        }

        if (tempHoverNode.nodeType == "ELEV") {
            for (let i = 0; i < pathData.length - 1; i++) {
                if (
                    pathData[i].nodeID == tempHoverNode.nodeID &&
                    pathData[i].nodeType == "ELEV" &&
                    pathData[i + 1].nodeType == "ELEV"
                ) {
                    sethoverNode(nullNode);
                    nodes.setLevel(floor.indexOf(pathData[i + 1].floor));
                }
            }
        }

        if (tempHoverNode.nodeType == "ELEV") {
            for (let i = pathData.length - 1; i > 0; i--) {
                if (
                    pathData[i].nodeID == tempHoverNode.nodeID &&
                    pathData[i].nodeType == "ELEV" &&
                    pathData[i - 1].nodeType == "ELEV"
                ) {
                    sethoverNode(nullNode);
                    nodes.setLevel(floor.indexOf(pathData[i - 1].floor));
                }
            }
        }

        if (tempHoverNode.nodeType == "STAI") {
            for (let i = 0; i < pathData.length - 1; i++) {
                if (
                    pathData[i].nodeID == tempHoverNode.nodeID &&
                    pathData[i].nodeType == "STAI" &&
                    pathData[i + 1].nodeType == "STAI"
                ) {
                    sethoverNode(nullNode);
                    nodes.setLevel(floor.indexOf(pathData[i + 1].floor));
                }
            }
        }

        if (tempHoverNode.nodeType == "STAI") {
            for (let i = pathData.length - 1; i > 0; i--) {
                if (
                    pathData[i].nodeID == tempHoverNode.nodeID &&
                    pathData[i].nodeType == "STAI" &&
                    pathData[i - 1].nodeType == "STAI"
                ) {
                    sethoverNode(nullNode);
                    nodes.setLevel(floor.indexOf(pathData[i - 1].floor));
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

    function setColor(node: DBNode) {
        switch (node.nodeType) {
            case "HALL":
                return "#0a2ce1";
            case "CONF":
                return "#25982a";
            case "DEPT":
                return "#e04545";
            case "ELEV":
                return "#da8f08";
            case "EXIT":
                return "#ddde1f";
            case "INFO":
                return "#1fe18a";
            case "LABS":
                return "#9608da";
            case "REST":
                return "#5cdbda";
            case "BATH":
                return "#ce24d4";
            case "RETL":
                return "#0b6009";
            case "STAI":
                return "#82a7f6";
            case "SERV":
                return "#67c537";
        }
    }

    return (
        <>
            {hoverNode.longName && (
                <div
                    className="absolute z-10 rounded-md bg-background shadow-lg top-[300px] left-[60px] "
                    style={{
                        top: `300px`,
                        left: `60px`,
                        zIndex: `9999px`,
                        whiteSpace: "nowrap",
                        minWidth: "fit-content",
                        maxWidth: "calc(100% - 20px)",
                    }}
                >
                    {/* Top color bar */}
                    <div
                        className="text-foreground text-lg font-bold rounded-t-md px-4 py-2"
                        style={{ backgroundColor: setColor(hoverNode) }}
                    >
                        {hoverNode.longName}
                    </div>

                    {/* Node details */}
                    <div className="p-5 text-sm text-foreground">
                        <p>Building: {hoverNode.building}</p>
                        <p>Floor: {hoverNode.floor}</p>
                        <p>ID: {hoverNode.nodeID}</p>
                        <p>Type: {hoverNode.nodeType}</p>
                        <p>
                            Coordinates: ({hoverNode.xcoord}, {hoverNode.ycoord}
                            )
                        </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex justify-evenly p-5 space-x-2">
                        <button
                            className="bg-accent text-foreground rounded-full px-4 py-2"
                            onClick={() => nodes.start(hoverNode.nodeID)}
                        >
                            Set as Start
                        </button>
                        <button
                            className="bg-destructive text-foreground rounded-full px-4 py-2"
                            onClick={() => nodes.end(hoverNode.nodeID)}
                        >
                            Set as End
                        </button>
                    </div>
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
