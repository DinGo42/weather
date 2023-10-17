'use client';
import { FC } from 'react';
import { Rainy1Icon } from '../../../../../../public/icons';

export const HourForecast: FC = () => {
  return (
    <div className="h-fit flex flex-col w-full bg-blue-500 pt-2 pb-2 rounded-3xl items-center">
      <span>09:00</span>
      <Rainy1Icon />
      <span>26°</span>
    </div>
  );
};
