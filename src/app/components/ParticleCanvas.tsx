import { useEffect, useRef } from 'react';

type Section = 'hero' | 'about' | 'work' | 'contact';

export default function ParticleCanvas({ section }: { section: Section }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0;

    const drawGrid = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;

      ctx.clearRect(0, 0, W, H);
      
      const isLight = document.documentElement.classList.contains('light');

      // Extremely subtle blueprint grid lines
      ctx.strokeStyle = isLight ? 'rgba(15, 23, 42, 0.028)' : 'rgba(59, 130, 246, 0.028)';
      ctx.lineWidth = 1;

      const gridSize = 64; // px size of squares
      
      // Draw vertical lines
      for (let x = 0; x < W; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let y = 0; y < H; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // Draw subtle intersection coordinates or tiny crosshair ticks
      ctx.fillStyle = isLight ? 'rgba(2, 132, 199, 0.07)' : 'rgba(59, 130, 246, 0.06)';
      for (let x = gridSize; x < W; x += gridSize * 2) {
        for (let y = gridSize; y < H; y += gridSize * 2) {
          // Draw a small 4x4 tick at cross sections
          ctx.fillRect(x - 1.5, y - 1.5, 3, 3);
        }
      }

      // Accent diagonal line for hero
      if (section === 'hero') {
        ctx.strokeStyle = isLight ? 'rgba(2, 132, 199, 0.035)' : 'rgba(59, 130, 246, 0.03)';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(W, H);
        ctx.stroke();
      }
    };

    const handleResize = () => {
      drawGrid();
    };

    const observer = new MutationObserver(() => {
      drawGrid();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    window.addEventListener('resize', handleResize, { passive: true });
    drawGrid();

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [section]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
