import React, { useState, useEffect, useRef, useContext } from 'react';
import Button from './ui/Button';
import Tooltip from './ui/Tooltip';
import InfoIcon from './icons/InfoIcon';
import { SiteDataContext } from '../data/siteDataContext';

const BrandSonifier: React.FC = () => {
  const { logAiToolUsage } = useContext(SiteDataContext);
  const [brandName, setBrandName] = useState<string>('');
  const [isSonifying, setIsSonifying] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isSonifying || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    setupCanvas();
    
    // --- Seeding from brand name ---
    const simpleHash = (str: string): number => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0;
      }
      return Math.abs(hash);
    };

    const hash = simpleHash(brandName);
    const baseHue = hash % 360;
    const numBars = 20 + (hash % 20);
    const barWidth = canvas.offsetWidth / numBars;
    const speed = 0.02 + ((hash >> 4) % 10) * 0.005;
    const complexity = 2 + ((hash >> 8) % 5);

    let time = 0;

    const animate = () => {
      const canvasWidth = canvas.offsetWidth;
      const canvasHeight = canvas.offsetHeight;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < numBars; i++) {
        const x = barWidth * i;
        const noise = Math.sin(i / complexity + time) * Math.cos(i / (complexity / 2) + time);
        const barHeight = (noise + 1) / 2 * (canvasHeight * 0.9) + (canvasHeight * 0.05);
        
        const hue = (baseHue + i * 2) % 360;
        const gradient = ctx.createLinearGradient(x, canvasHeight, x, canvasHeight - barHeight);
        gradient.addColorStop(0, `hsl(${hue}, 100%, 50%)`);
        gradient.addColorStop(0.5, `hsl(${(hue + 20) % 360}, 100%, 60%)`);
        gradient.addColorStop(1, `hsl(${(hue + 40) % 360}, 100%, 70%)`);

        ctx.fillStyle = gradient;
        ctx.shadowColor = `hsl(${hue}, 100%, 60%)`;
        ctx.shadowBlur = 10;
        
        const actualBarWidth = barWidth * 0.7;
        const barX = x + (barWidth - actualBarWidth) / 2;

        ctx.fillRect(barX, canvasHeight - barHeight, actualBarWidth, barHeight);
      }
      
      ctx.shadowBlur = 0; // reset shadow
      time += speed;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', setupCanvas);

    return () => {
      window.removeEventListener('resize', setupCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isSonifying, brandName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (brandName.trim()) {
      setIsSonifying(true);
      logAiToolUsage('brandSonifier');
    } else {
      setIsSonifying(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrandName(e.target.value);
    // Stop animation if user types again for a better UX
    if (isSonifying) {
        setIsSonifying(false);
    }
  };

  return (
    <section id="brand-sonifier" className="py-20 text-center relative" aria-labelledby="sonifier-heading">
      <div className="absolute top-8 right-8 z-20">
        <Tooltip text="Translates your brand's name into a unique sonic identity, creating an audible frequency for your brand.">
          <InfoIcon className="w-6 h-6 text-slate-500 hover:text-blue-400 transition-colors cursor-help" />
        </Tooltip>
      </div>
      <h2 id="sonifier-heading" className="text-4xl font-bold mb-4">
        Hear Your <span className="text-blue-400">Brand's Voice</span>
      </h2>
      <p className="max-w-2xl mx-auto text-slate-400 mb-8">
        Translate your brand's name into a unique sonic identity. Discover the sound of your brand's digital frequency.
      </p>

      <div className="max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={brandName}
            onChange={handleInputChange}
            placeholder="e.g., 'Aura Fashion' or your brand"
            className="flex-grow bg-slate-800/50 border border-slate-700 rounded-md px-4 py-3 text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            aria-label="Your brand name"
          />
          <Button type="submit">
            Sonify
          </Button>
        </form>
      </div>

      <div className="mt-8 min-h-[190px] flex items-center justify-center">
        {isSonifying ? (
          <div className="w-full max-w-md animate-fade-in">
            <canvas ref={canvasRef} className="w-full h-[150px]" />
            <p className="mt-4 text-slate-300">Digital Voiceprint for: <span className="font-bold text-white">{brandName}</span></p>
          </div>
        ) : (
          <p className="text-slate-500">Enter your brand name to generate its unique sonic signature.</p>
        )}
      </div>
    </section>
  );
};

export default BrandSonifier;