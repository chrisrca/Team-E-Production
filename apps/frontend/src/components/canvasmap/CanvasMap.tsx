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
import drawGraph from "@/components/canvasmap/RenderGraph.tsx";

const MapImage = [LLevel2, LLevel1, Level1, Level2, Level3];
interface CanvasMapProps {
    nodes: DBNode[];
    path: DBNode[];
    level: number;
}

export default function CanvasMap(nodes: CanvasMapProps) {
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
                    );
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
