import { Tachometer } from '@weather/shared/components/tachometer';
import { FC } from 'react';

export const WindSpeed: FC = () => {
  const score = 8;
  return (
    <div className="w-full h-full rounded-3xl bg-blue-600 border-2 border-blue-450 flex flex-col items-center relative justify-center pl-6 pr-6 pt-3 pb-1">
      <span className="absolute left-6 top-6 ">Wind speed: {score}</span>
      <Tachometer currentScore={score} pointScale={12} visibleScale={true}>
        <span className="text-center text-sm pt-1">
          Рекомендуємо не виходити на вулицю
        </span>
      </Tachometer>
    </div>
  );
};
