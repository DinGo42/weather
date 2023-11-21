'use client';
import { FC, useRef } from 'react';
import {
  useIconAnimation,
  useWeatherIcon,
  useWeatherType,
} from '@weather/shared';

type HourForecastProps = {
  temperature: number;
  time: Date;
  cloudCover: number;
  isDay: boolean;
  rain: number;
  snowfall: number;
};

export const HourForecast: FC<HourForecastProps> = ({
  temperature,
  time,
  cloudCover,
  isDay,
  rain,
  snowfall,
}) => {
  const iconRef = useRef<HTMLDivElement | null>(null);
  const isHovered = useIconAnimation(iconRef);

  const weatherType = useWeatherType({
    cloudCover,
    rain,
    snowfall,
    temperature,
  });
  const weatherIcon = useWeatherIcon({
    cloudCover,
    iconScale: 1,
    isDay: !!isDay,
    isHovered,
    rain,
    snowfall,
    weatherType,
  });
  return (
    <div
      className="h-fit w-full flex flex-col bg-blue-500 pt-2 pb-2 rounded-3xl items-center relative justify-between select-none"
      ref={iconRef}
    >
      <span>
        {time.getHours() < 9 ? '0' + time.getHours() : time.getHours()}:00
      </span>
      {weatherIcon}
      <span>{temperature}°</span>
    </div>
  );
};
