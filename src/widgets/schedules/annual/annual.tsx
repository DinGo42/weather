import { FC } from 'react';

export const Annual: FC = () => {
  return (
    <div className="w-full h-full bg-blue-600 rounded-3xl border-2 border-blue-450 pl-8 pr-8 pt-6 pb-6 flex flex-col overflow-hidden">
      <div className="flex w-full h-fit justify-between">
        <span className="text-3xl">Overview</span>
        <div className="w-fit flex h-full gap-5 text-lg">
          <button>Humidity</button>
          <button>Rainfall</button>
          <button>Windspeed</button>
        </div>
      </div>
      <div className="w-full h-full">
        <div className="w-full h-full flex">
          <div className="flex flex-col h-full w-fit justify-around items-center">
            <span>100%</span>
            <span>80%</span>
            <span>60%</span>
            <span>40%</span>
            <span>20%</span>
          </div>
          <div className="w-full h-full bg-blue-450"></div>
        </div>
        <div className="w-full h-full flex justify-around">
          <span>Jan</span>
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
          <span>May</span>
          <span>Jun</span>
          <span>Jul</span>
          <span>Aug</span>
          <span>Sep</span>
          <span>Oct</span>
          <span>Nov</span>
          <span>Dec</span>
        </div>
      </div>
    </div>
  );
};
