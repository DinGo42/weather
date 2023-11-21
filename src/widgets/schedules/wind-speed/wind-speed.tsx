'use client';
import { useQuery } from '@tanstack/react-query';
import { Tachometer } from '@weather/shared/components/tachometer';
import { FC } from 'react';
import { getCurrentWindData } from './api';
import { SchedulesSceleton } from '../schedules-sceleton';

const weatherRecomendation = {
  0: 'Cлабкий вітер',
  1: 'Cлабкий вітер',
  2: 'Легкий вітер',
  3: 'Легкий вітер',
  4: 'Помірний вітер',
  5: 'Не гуляйте довго на вулиці',
  6: 'Не гуляйте довго на вулиці',
  7: 'Надягніть шапку',
  8: 'Надягніть шапку',
  9: 'По можливості не виходьте',
  10: 'По можливості не виходьте',
  11: 'Закрийте вікна і шукайте укриття',
  12: 'Закрийте вікна і шукайте укриття',
} as const;

export const WindSpeed: FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['dailyWindSpeed'],
    queryFn: getCurrentWindData,
  });
  if (!data) return;
  const score =
    data.windSpeed10m > 117
      ? 12
      : data.windSpeed10m > 103
      ? 11
      : data.windSpeed10m > 89
      ? 10
      : data.windSpeed10m > 75
      ? 9
      : data.windSpeed10m > 62
      ? 8
      : data.windSpeed10m > 50
      ? 7
      : data.windSpeed10m > 39
      ? 6
      : data.windSpeed10m > 29
      ? 5
      : data.windSpeed10m > 20
      ? 4
      : data.windSpeed10m > 12
      ? 3
      : data.windSpeed10m > 6
      ? 2
      : data.windSpeed10m > 2
      ? 1
      : 1;
  return isLoading ? (
    <SchedulesSceleton />
  ) : (
    <div className="w-full select-none h-full rounded-3xl min-h-[150px] max-phoneSPlus:min-h-[230px] bg-blue-600 border-2 border-blue-450 flex flex-col items-center relative justify-center pl-6 pr-6 pt-3 pb-1">
      <span className="absolute left-6 top-6 ">Wind speed: {score}</span>
      <Tachometer currentScore={score} pointScale={12} visibleScale={true}>
        <span className="text-center text-sm pt-2">
          {weatherRecomendation[score]}
        </span>
      </Tachometer>
    </div>
  );
};
