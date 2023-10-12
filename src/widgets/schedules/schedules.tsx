import { FC } from 'react';
import { Annual } from './annual';
import { SunRise } from './sun-rise';
import { WindSpeed } from './wind-speed';

export const Schedules: FC = () => {
  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className="w-full h-3/6 flex gap-7">
        <SunRise />
        <WindSpeed />
      </div>
      <Annual />
    </div>
  );
};
