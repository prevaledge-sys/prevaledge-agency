import React, { useEffect, useState, useRef } from 'react';

const useAnimatedNumber = (endValue: number, duration: number = 1500) => {
  const [currentValue, setCurrentValue] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out cubic function for a smoother animation
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const nextValue = Math.round(easedProgress * endValue);
      setCurrentValue(nextValue);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [endValue, duration]);

  return currentValue;
};

const ScoreGauge: React.FC<{ score: number }> = ({ score }) => {
  const animatedScore = useAnimatedNumber(score);
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColor = (s: number) => {
    if (s >= 80) return 'text-green-400';
    if (s >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };
  
  const getStrokeColor = (s: number) => {
    if (s >= 80) return 'stroke-green-500';
    if (s >= 50) return 'stroke-yellow-500';
    return 'stroke-red-500';
  };

  return (
    <div className="relative w-48 h-48">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          className="stroke-slate-700"
          strokeWidth="10"
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          className={`transform-gpu -rotate-90 origin-center transition-all duration-1000 ease-out ${getStrokeColor(score)}`}
          strokeWidth="10"
          strokeLinecap="round"
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          strokeDasharray={circumference}
          style={{ strokeDashoffset }}
        />
      </svg>
      <div className={`absolute inset-0 flex items-center justify-center text-5xl font-bold ${getColor(score)}`}>
        {animatedScore}
      </div>
    </div>
  );
};

export default ScoreGauge;