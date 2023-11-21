'use client';
import {
  GloomyMediumRainIcon,
  HeavyRainIcon,
  MediumRainIcon,
  LightRainIcon,
  GloomyMediumSnowIcon,
  HeavySnowIcon,
  MediumSnowIcon,
  LightSnowIcon,
  CloudyDayIcon,
  CloudyNightIcon,
  DayIcon,
  NightIcon,
} from '../../../public/icons';
import { WeatherTypes } from '../types';

const getRainyIcon = (
  precipitation: number,
  cloudCover: number,
  isDay: boolean,
  isHovered: boolean,
  iconScale: number
) => {
  if (cloudCover > 50 && precipitation > 5) {
    return <GloomyMediumRainIcon isHovered={isHovered} scale={iconScale} />;
  } else {
    return precipitation > 10 ? (
      <HeavyRainIcon isHovered={isHovered} scale={iconScale} />
    ) : precipitation > 2 ? (
      <MediumRainIcon isHovered={isHovered} scale={iconScale} />
    ) : (
      <LightRainIcon isHovered={isHovered} scale={iconScale} />
    );
  }
};

const getSnowIcon = (
  precipitation: number,
  cloudCover: number,
  isDay: boolean,
  isHovered: boolean,
  iconScale: number
) => {
  if (cloudCover > 50 && precipitation > 2) {
    return <GloomyMediumSnowIcon isHovered={isHovered} scale={iconScale} />;
  } else {
    return precipitation > 5 ? (
      <HeavySnowIcon isHovered={isHovered} scale={iconScale} />
    ) : precipitation > 1 ? (
      <MediumSnowIcon isHovered={isHovered} scale={iconScale} />
    ) : (
      <LightSnowIcon isHovered={isHovered} scale={iconScale} />
    );
  }
};

const getClodyIcon = (
  precipitation: number,
  cloudCover: number,
  isDay: boolean,
  isHovered: boolean,
  iconScale: number
) =>
  isDay ? (
    <CloudyDayIcon isHovered={isHovered} scale={iconScale} />
  ) : (
    <CloudyNightIcon isHovered={isHovered} scale={iconScale} />
  );

const getSunnyIcon = (
  precipitation: number,
  cloudCover: number,
  isDay: boolean,
  isHovered: boolean,
  iconScale: number
) =>
  isDay ? <DayIcon isHovered={isHovered} scale={iconScale} /> : <NightIcon />;

const weatherTypesArr = [
  [WeatherTypes.RAIN, getRainyIcon],
  [WeatherTypes.SNOW, getSnowIcon],
  [WeatherTypes.CLOUDY, getClodyIcon],
  [WeatherTypes.SUNNY, getSunnyIcon],
] as const;

const weatherIcons = new Map(weatherTypesArr);

export const useWeatherIcon = ({
  weatherType,
  rain,
  snowfall,
  cloudCover,
  isDay,
  isHovered,
  iconScale,
}: {
  weatherType: WeatherTypes;
  rain: number;
  snowfall: number;
  cloudCover: number;
  isDay: boolean;
  isHovered: boolean;
  iconScale: number;
}) => {
  const precipitation = weatherType === WeatherTypes.RAIN ? rain : snowfall;
  return weatherIcons.get(weatherType)(
    precipitation,
    cloudCover,
    isDay,
    isHovered,
    iconScale
  );
};
