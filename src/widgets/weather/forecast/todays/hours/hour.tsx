'use client';
import { FC, useRef } from 'react';
import { GloomyLightSnowIcon } from '../../../../../../public/icons';
import { useIconAnimation } from '@weather/shared';


type HourForecastProps = {
  itemWidth:number
  id?:number
}

export const HourForecast: FC<HourForecastProps> = ({itemWidth,id}) => {
  const iconRef = useRef<HTMLDivElement | null>(null);
  const isHovered = useIconAnimation(iconRef);
  return (
    <div
      style={{minWidth:itemWidth + '%',maxWidth:itemWidth + '%'}}
      className="h-fit flex flex-col w-full bg-blue-500 pt-2 pb-2 rounded-3xl items-center relative justify-between"
      ref={iconRef}
    >
      <span>09:00</span>
      <GloomyLightSnowIcon isHovered={isHovered} />
      <span>26°</span>
    </div>
  );
};
