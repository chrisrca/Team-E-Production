import { Node } from "common/src/types";
import React, { useRef, useEffect } from "react";

export default function NodeDisplay(props: { node: Node }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context) {
        context.beginPath();
        context.arc(
          props.node.coords.xcoord,
          props.node.coords.ycoord,
          50,
          0,
          2 * Math.PI,
        );
        context.fill();
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw circles
        context.beginPath();
        context.arc(500, 500, 30, 0, 2 * Math.PI); // x, y, radius, startAngle, endAngle
        context.fillStyle = "red";
        context.fill();

        context.beginPath();
        context.arc(120, 80, 50, 0, 2 * Math.PI);
        context.fillStyle = "blue";
        context.fill();
      }
      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
    }
  }, [props.node.coords.xcoord, props.node.coords.ycoord]);

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={200}
      className="absolute z-2 flex flex-col rounded-2"
    />
  );
}
