import React from 'react';
import Flower from './Flower';

interface FlowerOverlayProps {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  size: 'small' | 'medium' | 'large';
  color: 'pink' | 'purple' | 'orange';
  animationSpeed?: 'slow' | 'slowest' | 'slower';
}

const sizeClasses = {
  small: 'w-8 h-8 md:w-12 md:h-12',
  medium: 'w-10 h-10 md:w-16 md:h-16',
  large: 'w-16 h-16 md:w-20 md:h-20',
};

const colorClasses = {
  pink: 'text-brand-pink',
  purple: 'text-brand-purple',
  orange: 'text-brand-orange',
};

const animationClasses = {
  slow: 'animate-spin-slow',
  slowest: 'animate-spin-slowest',
  slower: 'animate-spin-slower',
};

export default function FlowerOverlay({
  top,
  bottom,
  left,
  right,
  size,
  color,
  animationSpeed,
}: FlowerOverlayProps) {
  // Default animation speed based on size if not provided
  const defaultAnimationSpeed = animationSpeed || 
    (size === 'large' ? 'slower' : size === 'medium' ? 'slowest' : 'slow');

  const positionClasses = [
    'absolute',
    top && `top-[${top}]`,
    bottom && `bottom-[${bottom}]`,
    left && `left-[${left}]`,
    right && `right-[${right}]`,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={`${positionClasses} ${sizeClasses[size]} ${colorClasses[color]} ${animationClasses[defaultAnimationSpeed]}`}
    >
      <Flower />
    </div>
  );
}
