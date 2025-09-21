import React from 'react';

const AgentIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 8V4H8" />
    <rect x="4" y="12" width="16" height="8" rx="2" />
    <path d="M6 12v-2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M18 12v-2a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <path d="M12 12v-2" />
    <circle cx="9" cy="16" r=".5" fill="currentColor"/>
    <circle cx="15" cy="16" r=".5" fill="currentColor"/>
  </svg>
);

export default AgentIcon;