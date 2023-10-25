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
  // const circleRef = useRef<SVGCircleElement | null>(null);
  // const circle = circleRef.current;

  // const startValue = 100;
  const value = pointScale && (currentScore / pointScale) * 100;

  const points = [];
  const midCircle = 120;
  if (pointScale) {
    for (let i = 0; i < pointScale; i++) {
      const angle = (i / (pointScale - 1)) * Math.PI;
      const x = midCircle + radius * Math.cos(angle);
      const y = 115 - midCircle - radius * Math.sin(angle);
      const value = pointScale - i;
      points.push({ x, y, value });
    }
  }

  // useLayoutEffect(() => {
  //   if (!circle) return;
  //   // circle.style.strokeDasharray = (100 + 20).toString();
  //   // circle.style.strokeDasharray = `${(value - 4.287).toString()} 9`;
  // }, [circle, value]);

  return (
    <>
      <div className="w-64 h-44 bg-red-1000 self-center border-b-2 border-blue-450 flex items-center justify-center relative">
        {/* <svg width="360" viewBox="0 15 100 35">
            <circle
              r="31.84713375796178"
              cx="50"
              cy="50"
              fill="none"
              stroke={bgTachometerColor}
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
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
          </svg> */}
        <span
          style={{
            '--r': value ? value - 4 : 0,
            borderColor: bgTachometerColor,
            borderWidth: strokeWidth,
            borderStyle: borderStyle,
            borderBottom: 'none',
          }}
          className="speedometer border-solid inline-block scale-150 w-40 h-20 bottom-0 bg-blue-800 absolute"
        />
      </div>
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
      {children}
    </>
  );
};
