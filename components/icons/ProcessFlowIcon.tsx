import React from 'react';

const ProcessFlowIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" {...props}>
    <style>{`
      .node-circle {
        fill: #1e3a8a; /* blue-900 */
        stroke: #3b82f6; /* blue-500 */
        stroke-width: 2;
        opacity: 0;
        animation: fadeIn 0.5s ease-out forwards;
      }
      .node-text {
        fill: #cbd5e1; /* slate-300 */
        font-family: sans-serif;
        font-size: 14px;
        font-weight: bold;
        text-anchor: middle;
        opacity: 0;
        animation: fadeIn 0.5s ease-out 0.2s forwards;
      }
      .path-line {
        stroke: #3b82f6; /* blue-500 */
        stroke-width: 2;
        stroke-dasharray: 200;
        stroke-dashoffset: 200;
        animation: drawPath 1s ease-in-out forwards;
      }
      @keyframes fadeIn {
        to { opacity: 1; }
      }
      @keyframes drawPath {
        to { stroke-dashoffset: 0; }
      }
    `}</style>

    {/* Nodes */}
    <g style={{ animationDelay: '0.2s' }}>
      <circle cx="50" cy="50" r="30" className="node-circle" />
      <text x="50" y="55" className="node-text">Discover</text>
    </g>
    <g style={{ animationDelay: '0.8s' }}>
      <circle cx="250" cy="50" r="30" className="node-circle" />
      <text x="250" y="55" className="node-text">Strategize</text>
    </g>
    <g style={{ animationDelay: '1.4s' }}>
      <circle cx="250" cy="150" r="30" className="node-circle" />
      <text x="250" y="155" className="node-text">Execute</text>
    </g>
    <g style={{ animationDelay: '2.0s' }}>
      <circle cx="50" cy="150" r="30" className="node-circle" />
      <text x="50" y="155" className="node-text">Optimize</text>
    </g>

    {/* Paths */}
    <path d="M 80 50 H 220" fill="none" className="path-line" style={{ animationDelay: '0.4s' }} />
    <path d="M 250 80 V 120" fill="none" className="path-line" style={{ animationDelay: '1.0s' }} />
    <path d="M 220 150 H 80" fill="none" className="path-line" style={{ animationDelay: '1.6s' }} />
    <path d="M 50 120 V 80" fill="none" className="path-line" style={{ animationDelay: '2.2s' }} />
  </svg>
);

export default ProcessFlowIcon;