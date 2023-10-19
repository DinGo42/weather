'use client';
import {
  FC,
  SVGProps,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

export const SunRise: FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const circleRef = useRef<SVGCircleElement | null>(null);
  const textRef = useRef<SVGTextElement | null>(null);
  const circle = circleRef.current;
  const range = inputRef.current;
  const text = textRef.current;
  const [value, setValue] = useState(150);

  const radius = 90;
  const numPoints = 12;
  const points = [];
  const midCircle = 175;

  for (let i = 0; i < numPoints; i++) {
    const angle = (i / (numPoints - 1)) * Math.PI;
    const x = midCircle + radius * Math.cos(angle);
    const y = 180 - midCircle - radius * Math.sin(angle);
    const value = numPoints - 1 - i;
    points.push({ x, y, value });
  }
  useLayoutEffect(() => {
    if (!circle || !text) return;
    circle.style.strokeDasharray = value.toString();
    text.innerHTML = (value - 100).toString();
  }, [circle, text, value]);

  return (
    <div className="w-full h-full rounded-3xl bg-blue-600 border-2 border-blue-450 flex flex-col relative pl-6 pr-6 pt-6 pb-2">
      <span className="absolute left-6 top-6 ">Sun Rise</span>
      <span className="absolute right-6 top-6">Sun Set</span>
      <div
        className="w-fit h-fit self-center border-b-2 border-blue-450 flex items-center justify-center relative "
        id="test"
      >
        <svg width="360" viewBox="0 15 100 35">
          <circle
            r="31.84713375796178"
            cx="50"
            cy="50"
            fill="none"
            stroke="#ccc"
            stroke-width="3"
          />

          <circle
            r="31.84713375796178"
            cx="50"
            cy="50"
            fill="none"
            stroke="#000"
            stroke-width="3.2"
            stroke-dasharray="100 199.77821350097656"
            ref={circleRef}
          />
          <text
            x="50"
            y="40"
            fontSize="2"
            className="text-white-1000"
            ref={textRef}
          >
            0
          </text>
        </svg>
        {points.map((point, index) => (
          <span
            key={index}
            className="absolute"
            style={{ left: point.x + 'px', bottom: -point.y + 'px' }}
          >
            {point.value}
          </span>
        ))}
      </div>
      <div className="flex w-[60%] self-center justify-between">
        <span>06:00</span> <span>19:00</span>
      </div>
    </div>
  );
};
