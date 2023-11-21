import { WeatherTypes } from '../types';

export const useWeatherType = ({
  temperature,
  rain,
  snowfall,
  cloudCover,
}: {
  temperature: number;
  rain: number;
  snowfall: number;
  cloudCover: number;
}) =>
  rain > 0 && temperature > 2
    ? WeatherTypes.RAIN
    : snowfall > 0 && temperature <= 0
    ? WeatherTypes.SNOW
    : cloudCover > 50
    ? WeatherTypes.CLOUDY
    : WeatherTypes.SUNNY;
