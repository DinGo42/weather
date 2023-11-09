import { FC } from 'react';
import { Annual } from './annual';
import { SunRise } from './sun-rise';
import { WindSpeed } from './wind-speed';

export const Schedules: FC = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4 dectopL:flex-row">
      <div className="w-full tabletS:h-1/3 h-full tabletS:min-h-[200px] dectopL:min-h-[350px] gap-4 max-tabletS:min-h-[430px] flex max-tabletS:flex-col dectopL:flex-col dectopL:h-full dectopL:w-1/2">
        <WindSpeed />
        <SunRise />
      </div>
      <Annual />
    </div>
  );
};
