import { FC } from 'react';
import { DayForecastList } from './day-forecast';

export const WeeklyForecast: FC = () => {
  return (
    <div className="grid grid-cols-1 tabletS:grid-cols-2 w-full h-full gap-2 dectopL:grid-cols-3">
      <DayForecastList />
    </div>
  );
};
