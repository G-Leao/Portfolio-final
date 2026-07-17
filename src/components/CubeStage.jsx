import { useRef, useEffect } from "react";

export default function CubeStage() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let angle = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const size = Math.min(canvas.width, canvas.height) * 0.2;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);

      // Draw cube faces
      ctx.strokeStyle = "hsl(var(--primary))";
      ctx.lineWidth = 2;
      ctx.strokeRect(-size, -size, size * 2, size * 2);

      ctx.strokeStyle = "hsl(var(--muted-foreground))";
      ctx.strokeRect(-size * 0.7, -size * 0.7, size * 2, size * 2);

      ctx.restore();
      angle += 0.01;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />
  );
}
