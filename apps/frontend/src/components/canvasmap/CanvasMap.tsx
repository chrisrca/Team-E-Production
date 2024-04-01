import React, { useRef, useEffect } from "react";

const CanvasMap = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const xMult = 1710 / 5000;
    const yMult = 920 / 3400;
    function drawNodes(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = "blue";
      // ctx.lineWidth = 2;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(2255 * xMult, 849 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(2665 * xMult, 1043 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(2445 * xMult, 1245 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(1980 * xMult, 844 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(1845 * xMult, 844 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(2310 * xMult, 1043 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(1732 * xMult, 924 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(2445 * xMult, 1043 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(2445 * xMult, 1284 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(2770 * xMult, 1070 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(1750 * xMult, 1284 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(2130 * xMult, 1284 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(2130 * xMult, 1045 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(2215 * xMult, 1045 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(2220 * xMult, 904 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(2265 * xMult, 904 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(2360 * xMult, 849 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(2130 * xMult, 904 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(2130 * xMult, 844 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(1845 * xMult, 924 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(2300 * xMult, 849 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(1965 * xMult, 1284 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(1750 * xMult, 1090 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(2290 * xMult, 1284 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(2320 * xMult, 1284 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(2770 * xMult, 1284 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(1732 * xMult, 1019 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(2065 * xMult, 1284 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(2300 * xMult, 879 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(2770 * xMult, 1160 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(2185 * xMult, 904 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(2490 * xMult, 1043 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(2015 * xMult, 1280 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(1637 * xMult, 2116 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(1702 * xMult, 2260 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(1702 * xMult, 2167 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(1688 * xMult, 2167 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(1666 * xMult, 2167 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(1688 * xMult, 2131 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(1665 * xMult, 2116 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(1720 * xMult, 2131 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(2715 * xMult, 1070 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(2360 * xMult, 799 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(2220 * xMult, 974 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(1785 * xMult, 924 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(1820 * xMult, 1284 * yMult, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();

      // ctx.stroke();
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
  }, []);

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
