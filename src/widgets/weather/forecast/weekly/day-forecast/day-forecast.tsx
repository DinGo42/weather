import {
  Months,
  useIconAnimation,
  useWeatherIcon,
  useWeatherType,
} from '@weather/shared';
import { FC, useRef } from 'react';

type DayForecastProps = {
  temperature: number;
  date: Date;
  cloudCover: number;
  rain: number;
  snowfall: number;
};

export const DayForecast: FC<DayForecastProps> = ({
  date,
  temperature,
  cloudCover,
  rain,
  snowfall,
}) => {
  const iconRef = useRef<HTMLDivElement | null>(null);
  const isHovered = useIconAnimation(iconRef);
  const day =
    date.getDate() < 9 ? '0' + date.getDate() : date.getDate().toString();
  const month =
    date.getMonth() < 9 ? '0' + date.getMonth() : date.getMonth().toString();

  const weatherType = useWeatherType({
    cloudCover,
    rain,
    snowfall,
    temperature,
  });
  const weatherIcon = useWeatherIcon({
    cloudCover,
    iconScale: 2,
    isDay: true,
    isHovered,
    rain,
    snowfall,
    weatherType,
  });
  return (
    <div
      className="overflow-hidden w-full h-full bg-blue-500 rounded-3xl min-h-[140px] border-2 border-blue-450 grid grid-rows-2 pl-6 pr-6 pt-3 pb-3 relative"
      ref={iconRef}
    >
      <div className="flex w-full h-fit justify-between">
        <div className="flex flex-col text-xl">
          <span>{weatherType}</span>
          <span className="text-lg">
            {day} {Months[Number(month)]}, {date.getFullYear()}
          </span>
        </div>
        {weatherIcon}
      </div>
      <div className="flex flex-col items-center text-center text-3xl ">
        <span>
          {temperature < 1 && temperature > -1 ? 0 : temperature.toFixed(0)}°C
        </span>
        <span className="text-base">Temperature</span>
      </div>
    </div>
  );
};
