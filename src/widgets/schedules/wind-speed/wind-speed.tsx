'use client';
import { useQuery } from '@tanstack/react-query';
import { Tachometer } from '@weather/shared/components/tachometer';
import { FC } from 'react';
import { getCurrentWindData } from './api';
import { SchedulesSceleton } from '../schedules-sceleton';

export const WindSpeed: FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['dailyWindSpeed'],
    queryFn: getCurrentWindData,
  });
  if (!data) return;
  const { weatherRecomendation, windSpeedScore } = data;
  return isLoading ? (
    <SchedulesSceleton />
  ) : (
    <div className="w-full select-none h-full rounded-3xl min-h-[150px] max-phoneSPlus:min-h-[230px] bg-blue-600 border-2 border-blue-450 flex flex-col items-center relative justify-center pl-6 pr-6 pt-3 pb-1">
      <span className="absolute left-6 top-6 ">
        Wind speed: {windSpeedScore}
      </span>
      <Tachometer
        currentScore={windSpeedScore}
        pointScale={12}
        visibleScale={true}
      >
        <span className="text-center text-sm pt-2">{weatherRecomendation}</span>
      </Tachometer>
    </div>
  );
};
