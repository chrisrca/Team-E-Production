import React, { useRef, useEffect } from "react";
import { DBNode } from "common/src/types";

interface CanvasMapProps {
  nodes: DBNode[];
}

const CanvasMap = (nodes: CanvasMapProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const nodeData = nodes.nodes;
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

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

  useEffect(() => {
    const xMult = dimensions.width / 5000;
    const yMult = dimensions.height / 3400;
    function drawNodes(ctx: CanvasRenderingContext2D) {
      //PATH DRAWING
      //   ctx.fillStyle = "black";
      //   ctx.lineWidth = 4;

      //   if (nodeData.length > 0) {
      //     ctx.beginPath();
      //     ctx.moveTo(
      //       nodeData[0].xcoord * xMult,
      //       nodeData[0].ycoord * yMult,
      //     );

      //     for (let i = 1; i < nodeData.length; i++) {
      //       const node = nodeData[i];
      //       ctx.lineTo(node.xcoord * xMult, node.ycoord * yMult);
      //     }
      //     ctx.stroke();
      //   }
      //NODE DRAWING
      nodeData.forEach((node) => {
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.arc(node.xcoord * xMult, node.ycoord * yMult, 5, 0, 2 * Math.PI);
        ctx.fill();
        //   ctx.fillStyle = "white";
        //   ctx.font = "12px Arial";

        //   const textWidth = ctx.measureText(node.longName).width;

        //   ctx.fillText(
        //     node.longName,
        //     parseInt(node.coords.xcoord) * xMult - textWidth / 2,
        //     node.coords.ycoord * yMult - 10,
        //   );
        //   ctx.fillStyle = "black";
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
  }, [nodeData, dimensions]);

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
