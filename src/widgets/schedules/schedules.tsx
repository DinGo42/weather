import { FC } from 'react';
import { Annual } from './annual';
import { SunRise } from './sun-rise';
import { WindSpeed } from './wind-speed';

export const Schedules: FC = () => {
  return (
    <div className="w-full h-full flex flex-col gap-5 ">
      <div className="w-full h-1/2 flex gap-7">
        <WindSpeed />
        <SunRise />
      </div>
      <Annual />
    </div>
  );
};
