'use client';
import { FC, ReactNode, useLayoutEffect, useRef } from 'react';

type TachometerProps = {
  children?: ReactNode;
  bgTachometerColor?: string;
  tachometerLineColor?: string;
  pointScale?: number | null;
  currentScore?: number;
  strokeDasharray?: string;
  strokeWidth?: number;
  radius?: number;
};

export const Tachometer: FC<TachometerProps> = ({
  children,
  bgTachometerColor = '#070335',
  currentScore = 5,
  pointScale = 12,
  tachometerLineColor = '#2E249F',
  strokeDasharray = '100 199.77821350097656',
  strokeWidth = 3,
  radius = 90,
}) => {
  const circleRef = useRef<SVGCircleElement | null>(null);
  const circle = circleRef.current;

  const startValue = 100;
  const valueGap = pointScale ? startValue / (pointScale + 1.5) : 10;
  const value = startValue + valueGap * currentScore;

  const points = [];
  const midCircle = 175;
  if (pointScale) {
    for (let i = 0; i < pointScale; i++) {
      const angle = (i / (pointScale - 1)) * Math.PI;
      const x = midCircle + radius * Math.cos(angle);
      const y = 180 - midCircle - radius * Math.sin(angle);
      const value = pointScale - i;
      points.push({ x, y, value });
    }
  }

  useLayoutEffect(() => {
    if (!circle) return;
    circle.style.strokeDasharray = (100 + 58).toString();
  }, [circle, value]);

  return (
    <>
      <div className="flex flex-col">
        <div className="w-fit h-fit self-center border-b-2 border-blue-450 flex items-center justify-center relative">
          <svg width="360" viewBox="0 15 100 35">
            <circle
              r="31.84713375796178"
              cx="50"
              cy="50"
              fill="none"
              stroke={bgTachometerColor}
              strokeWidth={strokeWidth}
            />

            <circle
              r="31.84713375796178"
              cx="50"
              cy="50"
              fill="none"
              stroke={tachometerLineColor}
              strokeWidth={strokeWidth + 0.2}
              strokeDasharray={strokeDasharray}
              ref={circleRef}
            />
          </svg>
          {pointScale &&
            points.map((point, index) => (
              <span
                key={index}
                className="absolute"
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
