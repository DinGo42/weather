import { FC } from 'react';
import { TadaysForecast, WeeklyForecast } from './forecast';

export const Weather: FC = () => {
  return (
    <div className="flex flex-col min-w-[40%] max-tabletS:h-fit gap-2 h-full">
      <TadaysForecast />
      <WeeklyForecast />
    </div>
  );
};
