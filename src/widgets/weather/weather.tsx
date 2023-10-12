import { FC } from 'react';
import { TadaysForecast, WeeklyForecast } from './forecast';

export const Weather: FC = () => {
  return (
    <div className="flex flex-col gap-6 min-w-[40%]">
      <TadaysForecast />
      <WeeklyForecast />
    </div>
  );
};
