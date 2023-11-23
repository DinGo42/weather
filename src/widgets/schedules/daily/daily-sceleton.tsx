import { twJoin } from 'tailwind-merge';

export const DailySceleton = () => (
  <div
    className={twJoin(
      'animate-slow-pulse relative max-tabletS:hidden min-h-[330px] w-full bg-blue-600 rounded-3xl border-2 border-blue-450 pl-8 pr-8 pb-6 pt-6 flex flex-col overflow-hidden'
    )}
  >
    <div className="flex w-full  justify-end h-10">
      <div className="w-80 flex h-full gap-5 text-lg rounded-full bg-black-200 text-white-1000">
        <button
          className={twJoin(
            'rounded-full pl-3 pr-3 transition-colors duration-200'
          )}
        ></button>
        <button
          className={twJoin(
            'rounded-full pl-3 pr-3 transition-colors duration-700'
          )}
        ></button>
        <button
          className={twJoin(
            'rounded-full pl-3 pr-3 transition-colors duration-700'
          )}
        ></button>
      </div>
    </div>
  </div>
);
