'use client';
import { Tachometer } from '@weather/shared/components/tachometer';
import { FC } from 'react';
import { getCurrentWindData } from './api';
import { useQuery } from '@tanstack/react-query';
import { SchedulesSceleton } from '../schedules-sceleton';

export const SunRise: FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['dailySunRise'],
    queryFn: getCurrentWindData,
  });
  if (!data) return;
  const { currentTime, sunRise, sunSet } = data;
  return isLoading ? (
    <SchedulesSceleton />
  ) : (
    <div className="w-full h-full min-h-[150px] max-phoneSPlus:min-h-[200px] rounded-3xl bg-blue-600 border-2 border-blue-450 flex flex-col items-center relative pl-6 pr-6 pt-3 pb-2">
      <span className="absolute left-6 top-6 ">Sun Rise</span>
      <span className="absolute right-6 top-6">Sun Set</span>
      <Tachometer
        strokeWidth={1}
        pointScale={sunSet.getHours()}
        currentScore={currentTime}
        pointScaleStart={sunRise.getHours()}
        borderStyle="dashed"
      >
        <div className="flex w-[120%] self-center justify-between">
          <span>
            {sunRise.getHours() < 9
              ? '0' + sunRise.getHours()
              : sunRise.getHours()}
            :00
          </span>
          <span>
            {sunSet.getHours() < 9
              ? '0' + sunSet.getHours()
              : sunSet.getHours()}
            :00
          </span>
        </div>
      </Tachometer>
    </div>
  );
};
