'use client';
import { FC, useRef } from 'react';
import { Rainy1Icon } from '../../../../../../public/icons';
import { useIconAnimation } from '@weather/shared';

export const HourForecast: FC = () => {
  const iconRef = useRef<HTMLDivElement | null>(null);
  const isHovered = useIconAnimation(iconRef);
  return (
    <div
      className="flex flex-col w-full bg-blue-500 pt-2 pb-2 rounded-3xl items-center relative justify-between h-[120px]"
      ref={iconRef}
    >
      <span>09:00</span>
      <Rainy1Icon isHovered={isHovered} className="self-center justify-self-center top-7" />
      <span>26°</span>
    </div>
  );
};
