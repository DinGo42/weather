'use client';
import { FC } from 'react';
import { HourForecast } from './hours';
import CountUp from 'react-countup';
import { GloomyLightSnowIcon } from '../../../../../public/icons';

const hourlyWeatherData = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
];

export const TadaysForecast: FC = () => {
  return (
    <div className="bg-blue-400 pl-4 pr-4 pt-4 pb-2 w-full h-fit rounded-3xl border-2 border-blue-450 flex flex-col gap-4">
      <div className="flex w-full justify-between">
        <span className="flex pb-3">02 Sep, 2023 09:45</span>
        <span className={'max-dectopS:hidden'}>Cloudy 24 - 32°C</span>
      </div>
      <div className="w-full h-fit flex items-center justify-between">
        <div
          className={
            'flex flex-col text-xs w-[20%] items-center h-full relative justify-end pb-3 gap-3 max-dectopS:hidden'
          }
        >
          <GloomyLightSnowIcon isHovered={true} scale={2} />
          <span>Cloudy 24 - 32°C</span>
        </div>
        <div className="flex h-fit w-full justify-around">
          <div className="flex flex-col h-fit gap-3 justify-around text-center items-center phoneM:text-5xl text-3xl">
            <span>
              <CountUp duration={10} start={0} end={27} />
              °C
            </span>
            <span className="text-sm">temoerature</span>
          </div>
          <div className="flex flex-col h-fit gap-3 justify-around text-center items-center  phoneM:text-5xl text-3xl">
            <span>{<CountUp duration={5} start={0} end={86} />}%</span>
            <span className="text-sm">Humidity</span>
          </div>
          <div className="flex flex-col h-fit gap-3 justify-around items-center text-center  phoneM:text-5xl text-3xl">
            <span>{<CountUp duration={6} start={0} end={14} />}km/h</span>
            <span className="text-sm">Wind speed</span>
          </div>
        </div>
      </div>
      <div className="h-fit w-full overflow-hidden overflow-x-auto pb-2 scroll-smooth">
        <div
          className="grid grid-flow-col
            max-phoneSPlus:auto-cols-[calc((100%-12px*3)/4)]
            max-phoneM:auto-cols-[calc((100%-12px*3)/4)]
            max-tabletS:auto-cols-[calc((100%-12px*5)/6)]
            max-dectopS:auto-cols-[calc((100%-12px*9)/10)]
            dectopL:auto-cols-[calc((100%-12px*9)/10)]
            auto-cols-[calc((100%-12px*6)/7)]
            h-full gap-3"
        >
          {hourlyWeatherData.map((item, index) => (
            <HourForecast key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
