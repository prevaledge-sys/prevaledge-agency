import React, { useRef, useEffect } from 'react';

interface AuraVisualizerProps {
  seed: string;
  onClose: () => void;
}

const AuraVisualizer: React.FC<AuraVisualizerProps> = ({ seed, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // --- Seeding and Parameter Generation ---
    const simpleHash = (str: string): number => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32bit integer
      }
      return Math.abs(hash);
    };

    const hash = simpleHash(seed);
    const baseHue = hash % 360;
    const colorPalette = [
      `hsl(${baseHue}, 100%, 70%)`,
      `hsl(${(baseHue + 60) % 360}, 100%, 70%)`,
      `hsl(${(baseHue + 180) % 360}, 100%, 70%)`,
    ];
    
    const numLines = 5 + (hash % 10);
    const complexity = 0.0005 + ((hash >> 4) % 10) * 0.0001;
    const speed = 0.0002 + ((hash >> 8) % 10) * 0.0001;
    const radius = Math.min(width, height) * (0.2 + ((hash >> 12) % 10) * 0.02);

    let time = 0;
    let animationFrameId: number;

    const animate = () => {
      ctx.fillStyle = 'rgba(2, 6, 23, 0.1)'; // Fading trail effect
      ctx.fillRect(0, 0, width, height);
      ctx.save();
      ctx.translate(width / 2, height / 2);

      for (let i = 0; i < numLines; i++) {
        ctx.beginPath();
        ctx.strokeStyle = colorPalette[i % colorPalette.length];
        ctx.lineWidth = 1 + (i % 3);
        
        let lastX: number | null = null;
        let lastY: number | null = null;

        for (let angle = 0; angle < Math.PI * 2; angle += 0.01) {
            const noiseFactor = (Math.sin(angle * (3 + i)) + Math.cos(time + angle * i)) * 50;
            const x = Math.cos(angle * (i * 0.5 + 1)) * (radius + noiseFactor) + Math.sin(time * (i+1) * 0.5) * 50;
            const y = Math.sin(angle * (i * 0.5 + 1)) * (radius + noiseFactor) + Math.cos(time * (i+1) * 0.5) * 50;
            
            if(lastX === null) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
            lastX = x;
            lastY = y;
        }
        ctx.stroke();
      }

      ctx.restore();
      time += speed * 20; // Adjust speed multiplier
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('keydown', handleEsc);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [seed, onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 animate-fade-in">
      <canvas ref={canvasRef} className="w-full h-full" />
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors z-10"
        aria-label="Close Visualizer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-slate-400 font-mono">
        <p>Brand Essence for: <span className="text-white">{seed}</span></p>
        <p className="text-xs mt-1">(Press 'Esc' to close)</p>
      </div>
    </div>
  );
};

export default AuraVisualizer;