import { FC } from 'react';
import { Annual } from './annual';
import { SunRise } from './sun-rise';
import { WindSpeed } from './wind-speed';

export const Schedules: FC = () => {
  return (
    <div className="w-full h-[80%] flex flex-col gap-4">
      <div className="w-full tabletS:h-1/3 h-full tabletS:min-h-[200px] gap-4 max-tabletS:min-h-[430px] flex max-tabletS:flex-col">
        <WindSpeed />
        <SunRise />
      </div>
      <Annual />
    </div>
  );
};
