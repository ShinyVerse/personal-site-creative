import React from 'react';

interface FlowerProps {
  color?: string;
  className?: string;
}

export default function Flower({ color = "currentColor", className = "" }: FlowerProps) {
  return (
    <svg 
      width="200" 
      height="200" 
      viewBox="0 0 200 200" 
      xmlns="http://www.w3.org/2000/svg" 
      className={`w-full h-full ${className}`}
    >
      <ellipse cx="100" cy="50" rx="25" ry="40" fill={color} transform="rotate(0 100 100)"/>
      <ellipse cx="100" cy="50" rx="25" ry="40" fill={color} transform="rotate(60 100 100)"/>
      <ellipse cx="100" cy="50" rx="25" ry="40" fill={color} transform="rotate(120 100 100)"/>
      <ellipse cx="100" cy="50" rx="25" ry="40" fill={color} transform="rotate(180 100 100)"/>
      <ellipse cx="100" cy="50" rx="25" ry="40" fill={color} transform="rotate(240 100 100)"/>
      <ellipse cx="100" cy="50" rx="25" ry="40" fill={color} transform="rotate(300 100 100)"/>
    </svg>
  );
}
