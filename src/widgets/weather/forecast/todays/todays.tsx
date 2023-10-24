'use client';
import { FC } from 'react';
import { HourForecast } from './hours';
import { Rainy1Icon } from '../../../../../public/icons';
import CountUp from 'react-countup';

export const TadaysForecast: FC = () => {
  return (
    <div className="bg-blue-400 p-4 w-full h-4/6 rounded-3xl border-2 border-blue-450 flex flex-col">
      <span className="flex pb-3">02 Sep, 2023 09:45</span>
      <div className="w-full h-full flex items-center justify-between ">
        <div className="flex flex-col text-xs w-[17%] items-center h-full relative justify-end pb-3">
          <Rainy1Icon isHovered={true} className="top-6 right-0" scale={2} />
          <span>Cloudy 24 - 32°C</span>
        </div>
        <div className="flex h-full w-full justify-around">
          <div className="flex flex-col h-full justify-around text-center items-center text-5xl">
            <span id="number">
              {/* <AnimatedCounter
                value={counterValue}
                color="white"
                fontSize="40px"
              /> */}
              <CountUp duration={10} start={0} end={27} />
              °C
            </span>
            <span className="text-sm">temoerature</span>
          </div>
          <div className="flex flex-col h-full justify-around text-center items-center text-5xl">
            <span>{<CountUp duration={5} start={0} end={86} />}%</span>
            <span className="text-sm">Humidity</span>
          </div>
          <div className="flex flex-col h-full justify-around items-center text-center text-5xl">
            <span>{<CountUp duration={6} start={0} end={14} />}km/h</span>
            <span className="text-sm">Wind speed</span>
          </div>
        </div>
      </div>
      <div className="h-full w-full flex gap-3">
        <HourForecast />
        <HourForecast />
        <HourForecast />
        <HourForecast />
        <HourForecast />
        <HourForecast />
        <HourForecast />
        <HourForecast />
      </div>
    </div>
  );
};
