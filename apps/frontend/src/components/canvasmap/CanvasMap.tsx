import React, { useRef, useEffect } from "react";
import { DBNode } from "common/src/types";

interface CanvasMapProps {
  nodes: DBNode[];
  path: DBNode[];
}

const CanvasMap = (nodes: CanvasMapProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const nodeData = nodes.nodes;
  const pathData = nodes.path;
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  //RESIZING OF CANVAS
  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //DRAWING OF NODES AND PATH
  useEffect(() => {
    const xMult = dimensions.width / 5000;
    const yMult = dimensions.height / 3400;
    function drawNodes(ctx: CanvasRenderingContext2D) {
      //NODE DRAWING
      nodeData.forEach((node) => {
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.arc(node.xcoord * xMult, node.ycoord * yMult, 3, 0, 2 * Math.PI);
        ctx.fill();
        //PATH DRAWING
        ctx.strokeStyle = "red";
        ctx.lineWidth = 4;

        if (pathData.length > 0) {
          ctx.beginPath();
          ctx.moveTo(pathData[0].xcoord * xMult, pathData[0].ycoord * yMult);

          for (let i = 1; i < pathData.length; i++) {
            const node = pathData[i];
            //LINE DRAWING
            ctx.strokeStyle = "red";
            ctx.lineTo(node.xcoord * xMult, node.ycoord * yMult);
            //TEXT DRAWING
            if (i === pathData.length - 1 || i === 1) {
              ctx.fillStyle = "black";
              ctx.font = "20px Arial";
              const textWidth = ctx.measureText(node.longName).width;
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
    const image = new Image();
    image.src = "../../src/assets/00_thelowerlevel1.png"; // Path to your image file
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
      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
    }
  }, [nodeData, pathData, dimensions]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        style={{ width: "100vw", height: "100vh", display: "block" }}
        className="px-0 py-0 z-0 absolute"
        id="layer1"
      />
      <div className={"flex flex-col gap-5 absolute"}></div>
    </div>
  );
};

export default CanvasMap;
