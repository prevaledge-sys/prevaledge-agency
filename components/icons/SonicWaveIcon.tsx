
import React from 'react';

const SonicWaveIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg" {...props}>
    <style>{`
      .wave-path {
        stroke-width: 2;
        fill: none;
        stroke: currentColor;
        animation: wave 2s linear infinite;
      }
      @keyframes wave {
        0% {
          d: path("M 0 25 Q 12.5 10, 25 25 T 50 25 T 75 25 T 100 25");
        }
        50% {
          d: path("M 0 25 Q 12.5 40, 25 25 T 50 25 T 75 25 T 100 25");
        }
        100% {
          d: path("M 0 25 Q 12.5 10, 25 25 T 50 25 T 75 25 T 100 25");
        }
      }
    `}</style>
    <path className="wave-path" style={{ animationDelay: '0s' }} />
    <path className="wave-path" style={{ animationDelay: '-0.5s', opacity: 0.7 }} />
    <path className="wave-path" style={{ animationDelay: '-1s', opacity: 0.4 }} />
  </svg>
);

export default SonicWaveIcon;
