'use client';
import { useEffect, useState } from 'react';
import { screenTypes } from '../types/max-items-for-screen';

export const useScreenSize = () => {
  const [screenType, setScreenType] = useState<screenTypes>(
    screenTypes.PHONE_M
  );
  const [screenWidth, setScreenWidth] = useState(0);
  useEffect(() => {
    console.log(1, window.innerWidth);
    const windowResizeHandler = () => {
      const currentScreenWidth = window.innerWidth;
      setScreenWidth(currentScreenWidth);
      if (currentScreenWidth > 1440) {
        setScreenType(screenTypes.DECTOP_M);
      } else if (currentScreenWidth > 1280) {
        setScreenType(screenTypes.DECTOP_S);
      } else if (currentScreenWidth > 1024) {
        setScreenType(screenTypes.TABLET_M);
      } else if (currentScreenWidth > 768) {
        setScreenType(screenTypes.TABLET_S);
      } else if (currentScreenWidth > 480) {
        setScreenType(screenTypes.PHONE_M);
      } else if (currentScreenWidth > 320) {
        setScreenType(screenTypes.PHONE_S);
      }
    };
    document.addEventListener('resize', windowResizeHandler);
    windowResizeHandler();
    return () => window.removeEventListener('resize', windowResizeHandler);
  }, []);

  return { screenType, screenWidth };
};
