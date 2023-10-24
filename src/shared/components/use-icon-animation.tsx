'use client';
import { useState, useLayoutEffect, RefObject } from 'react';
export const useIconAnimation = <T extends HTMLElement>(
  ref: RefObject<T>
): boolean => {
  const [isHovered, setHovered] = useState(false);

  useLayoutEffect(() => {
    const handleMouseOver = () => {
      setHovered(true);
    };

    const handleMouseOut = () => {
      setHovered(false);
    };

    const element = ref.current;

    if (element) {
      element.addEventListener('mouseover', handleMouseOver);
      element.addEventListener('mouseout', handleMouseOut);

      return () => {
        element.removeEventListener('mouseover', handleMouseOver);
        element.removeEventListener('mouseout', handleMouseOut);
      };
    }
  }, [ref]);

  return isHovered;
};
