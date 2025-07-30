import React, { useEffect, useState, useRef } from "react";

export default function CampoCanvasDibujo({ esDibujante, socket, color, grosor }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPoint, setLastPoint] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    // escuchar socket evento de dibujo
    socket.on("dibujo", ({ x0, y0, x1, y1, color, grosor }) => {
      dibujarLinea(ctx, x0, y0, x1, y1, color, grosor);
    });
    return () => {
      socket.off("dibujo");
    };
  }, [socket]);

  const getCoords = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const startDrawing = (e) => {
    if (!esDibujante) return;
    setIsDrawing(true);
    const { x, y } = getCoords(e);
    setLastPoint({ x, y });
  };

  const draw = (e) => {
    if (!esDibujante || !isDrawing || !lastPoint) return;
    const ctx = canvasRef.current.getContext("2d");
    const { x, y } = getCoords(e);
    // dibuja localmente
    dibujarLinea(ctx, lastPoint.x, lastPoint.y, x, y, color, grosor);
    // emitir por socket el dibujo
    socket.emit("dibujo", {
      x0: lastPoint.x,
      y0: lastPoint.y,
      x1: x,
      y1: y,
      color,
      grosor
    });
    setLastPoint({ x, y });
  };

  const endDrawing = () => {
    if (!esDibujante) return;
    setIsDrawing(false);
    setLastPoint(null);
  };

  const dibujarLinea = (ctx, x0, y0, x1, y1, color, grosor) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = grosor;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={endDrawing}
      onMouseLeave={endDrawing}
      className="absolute top-0 left-0"
      width={600}
      height={545}
    />
  );
}
