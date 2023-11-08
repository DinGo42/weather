import { Tachometer } from '@weather/shared/components/tachometer';
import { FC } from 'react';

export const SunRise: FC = () => {
  return (
    <div className="w-full h-full min-h-[150px] max-phoneSPlus:min-h-[200px] rounded-3xl bg-blue-600 border-2 border-blue-450 flex flex-col items-center relative pl-6 pr-6 pt-3 pb-2">
      <span className="absolute left-6 top-6 ">Sun Rise</span>
      <span className="absolute right-6 top-6">Sun Set</span>
      <Tachometer
        strokeWidth={1}
        pointScale={13}
        currentScore={5}
        borderStyle="dashed"
      >
        <div className="flex w-[120%] self-center justify-between">
          <span>06:00</span> <span>19:00</span>
        </div>
      </Tachometer>
    </div>
  );
};
