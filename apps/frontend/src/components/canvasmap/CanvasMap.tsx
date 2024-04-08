import React, { useEffect, useState, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { DBNode } from "common/src/types";
import MapImage from "../../assets/00_thelowerlevel1.png";

interface CanvasMapProps {
    nodes: DBNode[];
    path: DBNode[];
}

export default function CanvasMap(nodes: CanvasMapProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const nodeData = nodes.nodes;
    const pathData = nodes.path;

    //RESIZING OF CANVAS
    useEffect(() => {
        const image = new Image();
        image.src = "../../src/assets/00_thelowerlevel1.png";
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
    }, []);

    // Function to update container size
    const updateContainerSize = () => {
        setContainerSize({
            width: window.outerWidth,
            height: window.outerHeight,
        });
    };

    // Function to handle panning stopped event
    const handlePanningStopped = (e) => {
        const transformComponent = e.target;
        const { x, y } = transformComponent.getTransformPosition();
        const { scaleX, scaleY } = transformComponent.getTransformScale();

        // If image is smaller than the container, center it
        if (imageSize.width * scaleX < containerSize.width) {
            transformComponent.setTransformPosition({
                x: (containerSize.width - imageSize.width * scaleX) / 2,
                y,
            });
        }
        if (imageSize.height * scaleY < containerSize.height) {
            transformComponent.setTransformPosition({
                x,
                y: (containerSize.height - imageSize.height * scaleY) / 2,
            });
        }
    };

    //DRAWING OF NODES AND PATH
    useEffect(() => {
        const xMult = imageSize.width / 5000;
        const yMult = imageSize.height / 3400;
        function drawNodes(ctx: CanvasRenderingContext2D) {
            //NODE DRAWING
            nodeData.forEach((node) => {
                ctx.beginPath();
                ctx.fillStyle = "blue";
                ctx.arc(
                    node.xcoord * xMult,
                    node.ycoord * yMult,
                    3,
                    0,
                    2 * Math.PI,
                );
                ctx.fill();
                //PATH DRAWING
                ctx.strokeStyle = "red";
                ctx.lineWidth = 4;

                if (pathData.length > 0) {
                    ctx.beginPath();
                    ctx.moveTo(
                        pathData[0].xcoord * xMult,
                        pathData[0].ycoord * yMult,
                    );

                    for (let i = 1; i < pathData.length; i++) {
                        const node = pathData[i];
                        //LINE DRAWING
                        ctx.strokeStyle = "red";
                        ctx.lineTo(node.xcoord * xMult, node.ycoord * yMult);
                        //TEXT DRAWING
                        if (i === pathData.length - 1 || i === 1) {
                            ctx.fillStyle = "black";
                            ctx.font = "20px Arial";
                            const textWidth = ctx.measureText(
                                node.longName,
                            ).width;
                            ctx.fillText(
                                node.longName,
                                node.xcoord * xMult - textWidth / 2,
                                node.ycoord * yMult - 10,
                            );
                        }
                    }
                    ctx.stroke();
                }
            });
        }
        //This shit supposed to draw the image and the nodes let's goooo
        const image = new Image();
        image.src = MapImage; // Path to your image file
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
            drawNodes(context!);
            if (context) {
                context.beginPath();
                context.arc(500, 500, 500, 0, 2 * Math.PI);
                context.fill();
                image.onload = () => {
                    context.drawImage(image, 0, 0, canvas.width, canvas.height);
                    drawNodes(context!);
                };
            }
        }
    }, [nodeData, pathData, imageSize]);

    return (
        <TransformWrapper
            initialScale={1.5}
            centerOnInit={true}
            limitToBounds={true}
            minScale={1}
            maxScale={4}
            wheel={{ step: 0.5 }}
            options={{ limitToBounds: false }}
            doubleClick={{ disabled: false }}
            defaultPositionY={-100}
        >
            {" "}
            {() => (
                <React.Fragment>
                    <TransformComponent onPanningStopped={handlePanningStopped}>
                        <div>Yooo</div>
                        {/* <canvas ref={canvasRef} style={{margin: '-7.5%' width: "200vw", height: "200vh", display: "block" }} className="px-0 py-0 z-0 absolute" id="layer1"/> */}
                    </TransformComponent>
                </React.Fragment>
            )}
        </TransformWrapper>
    );
    // return (
    //     <div className="aspect-[5000/3400] relative">
    //                     <div
    //                         style={{
    //                             margin: '-7.5%',
    //                             width: '200vh',
    //                             height: '200vh',
    //                             backgroundImage: `url('../../src/assets/00_thelowerlevel1.png')`,
    //                             backgroundSize: 'contain',
    //                             backgroundRepeat: 'no-repeat',
    //                         }}
    //                     />
    //     </div>
    // );
}
