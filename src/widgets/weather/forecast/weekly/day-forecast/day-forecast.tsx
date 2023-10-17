'use client';
import { FC } from 'react';
import { DayIcon } from '../../../../../../public/icons';

export const DayForecast: FC = () => {
  return (
    <div className="w-full h-full bg-blue-500 rounded-3xl min-h-[140px] border-2 border-blue-450 grid grid-rows-2 pl-6 pr-6 pt-3 pb-3">
      <div className="flex w-full h-full justify-between">
        <div className="flex flex-col text-xl">
          <span>Sun</span>
          <span className="text-lg">03 Sep, 2023</span>
        </div>
        <DayIcon />
      </div>
      <div className="flex flex-col items-center text-center text-3xl ">
        <span>38°C</span>
        <span className="text-base">Temperature</span>
      </div>
    </div>
  );
};
