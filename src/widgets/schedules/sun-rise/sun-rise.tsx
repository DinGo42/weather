import { Tachometer } from '@weather/shared/components/tachometer-builder';
import { FC } from 'react';

export const SunRise: FC = () => {
  return (
    <div className="w-full h-full rounded-3xl bg-blue-600 border-2 border-blue-450 flex flex-col relative pl-6 pr-6 pt-3 pb-2">
      <span className="absolute left-6 top-6 ">Sun Rise</span>
      <span className="absolute right-6 top-6">Sun Set</span>
      <Tachometer
        strokeDasharray="1 1"
        strokeWidth={1}
        pointScale={null}
        currentScore={5}
      >
        <div className="flex w-[60%] self-center justify-between">
          <span>06:00</span> <span>19:00</span>
        </div>
      </Tachometer>
    </div>
  );
};
