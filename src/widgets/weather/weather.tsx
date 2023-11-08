import { FC } from 'react';
import { TadaysForecast, WeeklyForecast } from './forecast';

export const Weather: FC = () => {
  return (
    <div className="flex flex-col min-w-[40%] h-full gap-2">
      <TadaysForecast />
      <WeeklyForecast />
    </div>
  );
};
