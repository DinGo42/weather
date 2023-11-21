'use client';
import { useQuery } from '@tanstack/react-query';
import { DayForecast } from './day-forecast';
import { getWeeklyForecast } from './api';
import { DayForecastSceleton } from './day-forecast-sceleton';

const testArr = [1, 2, 3, 4, 5, 6];

export const getSplitArray = <_, T>({
  arr,
  subArrSize,
  splitForParts,
}: {
  arr: T[];
  subArrSize?: number;
  splitForParts: number;
}): T[][] => {
  const arrSize = subArrSize ? subArrSize : arr.length / splitForParts;
  const sliced_array = [];

  for (let i = 0; i < arr.length; i += arrSize) {
    sliced_array.push(arr.slice(i, i + arrSize));
  }
  return sliced_array;
};

const getAvgFromArray = (arr: number[]) =>
  arr.reduce((first, second) => first + second, 0) / arr.length;

export const DayForecastList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['weeklyForecast'],
    queryFn: getWeeklyForecast,
  });
  if (!data) return;

  const weeklyTemperature = getSplitArray({
    arr: data.temperature2m,
    splitForParts: 7,
  }).map((forecast) => getAvgFromArray(forecast));
  const weeklyCloudCover = getSplitArray({
    arr: data.cloudCover,
    splitForParts: 7,
  }).map((forecast) => getAvgFromArray(forecast));
  const weeklyRain = getSplitArray({ arr: data.rain, splitForParts: 7 }).map(
    (forecast) => getAvgFromArray(forecast)
  );
  const weeklySnowfall = getSplitArray({
    arr: data.snowfall,
    splitForParts: 7,
  }).map((forecast) => getAvgFromArray(forecast));
  const weeklyDate = getSplitArray({ arr: data.time, splitForParts: 7 });

  const arr = weeklyDate
    .map((date, index) => ({
      date: date[13],
      temperature: weeklyTemperature[index],
      cloudCover: weeklyCloudCover[index],
      rain: weeklyRain[index],
      snowfall: weeklySnowfall[index],
    }))
    .splice(1);

  return isLoading ? (
    <DayForecastSceleton />
  ) : (
    arr.map(({ date, temperature, cloudCover, rain, snowfall }, index) => (
      <DayForecast
        key={index}
        date={date}
        temperature={temperature}
        cloudCover={cloudCover}
        rain={rain}
        snowfall={snowfall}
      />
    ))
  );
};
