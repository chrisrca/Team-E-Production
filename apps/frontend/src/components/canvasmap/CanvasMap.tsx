import React, { useRef, useEffect } from "react";

const CanvasMap = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const image = new Image();
    image.src = "../../src/assets/00_thelowerlevel1.png"; // Path to your image file
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context) {
        context.beginPath();
        context.arc(50, 50, 50, 0, 2 * Math.PI);
        context.fill();
        image.onload = () => {
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
        };
      }
      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
    }
  }, []);

  return (
    <div className="absolute">
      <canvas
        ref={canvasRef}
        style={{ width: "100vw", height: "100vh", display: "block" }}
        className="px-0 py-0"
      />
      <div className={"flex flex-col gap-5"}></div>
    </div>
  );
};

export default CanvasMap;
