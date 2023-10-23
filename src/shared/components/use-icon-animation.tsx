'use client';

import { useState, useRef, useLayoutEffect, forwardRef, FC } from 'react';

export const useIconAnimation = forwardRef<HTMLDivElement>(({}, ref) => {
  const [isHovered, setHovered] = useState(false);

  useLayoutEffect(() => {
    const handleMouseOver = () => {
      setHovered(true);
    };

    const handleMouseOut = () => {
      setHovered(false);
    };

    if (ref) {
      ref.addEventListener('mouseover', handleMouseOver);
      ref.addEventListener('mouseout', handleMouseOut);

      return () => {
        ref.removeEventListener('mouseover', handleMouseOver);
        ref.removeEventListener('mouseout', handleMouseOut);
      };
    }
  }, [ref]);

  return isHovered;
});
