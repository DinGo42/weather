'use client';
import { FC, ReactNode } from 'react';
import { twJoin } from 'tailwind-merge';

type TachometerProps = {
  children?: ReactNode;
  bgTachometerColor?: string;
  pointScale?: number | null;
  visibleScale?: boolean;
  currentScore?: number;
  strokeWidth?: number;
  borderStyle?: 'dashed' | 'solid';
  radius?: number;
};

export const Tachometer: FC<TachometerProps> = ({
  children,
  bgTachometerColor = '#fff',
  visibleScale = false,
  currentScore = 5,
  pointScale = 10,
  strokeWidth = 4,
  borderStyle = 'solid',
  radius = 95,
}) => {
  const value = pointScale && (currentScore / pointScale) * 100;

  const points = [];
  const midCircle = 110;
  if (pointScale) {
    for (let i = 0; i < pointScale; i++) {
      const angle = (i / (pointScale - 1)) * Math.PI;
      const x = midCircle + radius * Math.cos(angle);
      const y = 115 - midCircle - radius * Math.sin(angle);
      const value = pointScale - i;
      points.push({ x, y, value });
    }
  }


  return (
    <>
    <div className='w-fit h-full flex items-center justify-center flex-col'>
    <div className='w-[240px] after:border-b-2 after:w-[280px] after:h-11 after:-bottom-2 after:absolute after:border-blue-400 mb-1 h-full flex relative justify-center'>
    <span
          style={{
            '--r': value ? value - 5 : 0,
            borderColor: bgTachometerColor,
            borderWidth: strokeWidth,
            borderStyle: borderStyle,
            borderBottom: 'none',
          }}
          className="speedometer border-solid inline-block scale-150 w-40 h-20 bottom-5 bg-blue-800 absolute"
        />
        {visibleScale &&
        pointScale &&
        points.map((point, index) => (
          <span
            key={index}
            className={twJoin(
              'absolute',
              currentScore !== point.value && 'text--1000'
            )}
            style={{ left: point.x + 'px', bottom: -point.y + 'px' }}
            >
            {point.value}
          </span>
        ))} 
    </div>
      {children}
      </div>
    </>
  );
};
