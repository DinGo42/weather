'use client';
import { FC, useEffect, useState } from 'react';
import { HourForecast } from './hours';
import CountUp from 'react-countup';

import { getCurrentForecast } from './api';
import { useQuery } from '@tanstack/react-query';
import { useWeatherIcon, useWeatherType } from '@weather/shared';
import { TodaysSceleton } from './todays-sceleton';

const getCurrentData = () => {
  const [minutes, setMinutes] = useState('');
  const [hours, setHour] = useState('');
  const [time, setTime] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(2022);
  useEffect(() => {
    const timeInterval = setInterval(() => {
      const date = new Date();
      setMonth(date.getMonth());
      setDay(
        date.getDay() < 9 ? '0' + date.getDay() : date.getDay().toString()
      );
      setYear(date.getFullYear());
      setHour(
        date.getHours() < 9 ? '0' + date.getHours() : date.getHours().toString()
      );

      setMinutes(
        date.getMinutes() < 9
          ? '0' + date.getMinutes()
          : date.getMinutes().toString()
      );
      setTime(hours + ':' + minutes);
    }, 6000);
    return clearInterval(timeInterval);
  }, []);
  return { minutes, hours, day, month, year, time };
};

export const TadaysForecast: FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['currentForecast'],
    queryFn: getCurrentForecast,
  });
  if (!data) return;
  const current = data.current;
  const hourly = data.hourly;

  const weatherType = useWeatherType({
    cloudCover: current.cloudCover,
    rain: current.rain,
    snowfall: current.snowfall,
    temperature: current.temperature2m,
  });
  const weatherIcon = useWeatherIcon({
    cloudCover: current.cloudCover,
    iconScale: 2,
    isDay: !!current.isDay,
    isHovered: true,
    rain: current.rain,
    snowfall: current.snowfall,
    weatherType,
  });

  const sortedTodayHourlyTemperatureForecast = hourly.temperature2m
    .slice(0, 24)
    .sort();

  const hourlyWeatherData = hourly.time
    .slice(new Date().getHours() - 2, new Date().getHours() + 23)
    .map((time, index) => ({
      time: time,
      temperature: Number(
        hourly.temperature2m
          .slice(new Date().getHours() - 2, new Date().getHours() + 23)
          [index].toFixed(0)
      ),
      cloudCover: hourly.cloudCover.slice(
        new Date().getHours() - 2,
        new Date().getHours() + 23
      )[index],
      isDay: hourly.isDay.slice(
        new Date().getHours() - 2,
        new Date().getHours() + 23
      )[index],
      rain: hourly.rain.slice(
        new Date().getHours() - 2,
        new Date().getHours() + 23
      )[index],
      snofall: hourly.snowfall.slice(
        new Date().getHours() - 2,
        new Date().getHours() + 23
      )[index],
    }));

  const maxDayTemperature = sortedTodayHourlyTemperatureForecast[23].toFixed(0);
  const minDayTemperature = sortedTodayHourlyTemperatureForecast[0].toFixed(0);

  return isLoading ? (
    <TodaysSceleton />
  ) : (
    <div className="bg-blue-400 pl-4 pr-4 pt-4 pb-2 w-full h-fit rounded-3xl border-2 border-blue-450 flex flex-col gap-4">
      <div className="flex w-full justify-between">
        <span className="flex pb-3">
          {/* {day} {Months[month]}, {year} {time} */}
        </span>
        <span className={'dectopS:hidden'}>
          {weatherType}{' '}
          {maxDayTemperature === minDayTemperature
            ? maxDayTemperature
            : minDayTemperature + ' - ' + maxDayTemperature}{' '}
          °C
        </span>
      </div>
      <div className="w-full h-fit flex items-center justify-between">
        <div
          className={
            'flex flex-col text-xs w-[20%] items-center h-full relative justify-end pb-3 gap-3 max-dectopS:hidden'
          }
        >
          {weatherIcon}
          <span>
            {weatherType}{' '}
            {maxDayTemperature === minDayTemperature
              ? maxDayTemperature
              : minDayTemperature + ' - ' + maxDayTemperature}
            °C
          </span>
        </div>
        <div className="flex h-fit w-full justify-around">
          <div className="flex flex-col h-fit gap-3 justify-around text-center items-center phoneM:text-5xl text-3xl">
            <span>
              <CountUp duration={6} start={0} end={current.temperature2m} />
              °C
            </span>
            <span className="text-sm">temperature</span>
          </div>
          <div className="flex flex-col h-fit gap-3 justify-around text-center items-center  phoneM:text-5xl text-3xl">
            <span>
              {
                <CountUp
                  duration={5}
                  start={0}
                  end={current.relativeHumidity2m}
                />
              }
              %
            </span>
            <span className="text-sm">Humidity</span>
          </div>
          <div className="flex flex-col h-fit gap-3 justify-around items-center text-center  phoneM:text-5xl text-3xl">
            <span>
              {<CountUp duration={6} start={0} end={current.windSpeed10m} />}
              km/h
            </span>
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
          {hourlyWeatherData.map(
            (
              { temperature, time, cloudCover, isDay, rain, snofall },
              index
            ) => (
              <HourForecast
                key={index}
                temperature={temperature}
                time={time}
                cloudCover={cloudCover}
                isDay={!!isDay}
                rain={rain}
                snowfall={snofall}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};
