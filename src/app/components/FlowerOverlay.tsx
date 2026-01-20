import React, { useMemo } from 'react';
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


const SIZE_CLASSES = {
  small: 'w-8 h-8 md:w-12 md:h-12',
  medium: 'w-10 h-10 md:w-16 md:h-16',
  large: 'w-16 h-16 md:w-20 md:h-20',
} as const;

const COLOR_CLASSES = {
  pink: 'text-brand-pink',
  purple: 'text-brand-purple',
  orange: 'text-brand-orange',
} as const;

const ANIMATION_CLASSES = {
  slow: 'animate-spin-slow',
  slowest: 'animate-spin-slowest',
  slower: 'animate-spin-slower',
} as const;

export default React.memo(function FlowerOverlay({
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

  // Build className without tv() to prevent cache accumulation
  const className = useMemo(
    () => `absolute ${SIZE_CLASSES[size]} ${COLOR_CLASSES[color]} ${ANIMATION_CLASSES[defaultAnimationSpeed]}`,
    [size, color, defaultAnimationSpeed]
  );

  const positionStyle: React.CSSProperties = useMemo(
    () => ({
      ...(top && { top }),
      ...(bottom && { bottom }),
      ...(left && { left }),
      ...(right && { right }),
    }),
    [top, bottom, left, right]
  );

  return (
    <div
      className={className}
      style={positionStyle}
    >
      <Flower />
    </div>
  );
});
