'use client';
import { FC, useState } from 'react';
import { twJoin } from 'tailwind-merge';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { getCurrentHourlyForecast } from './api';
import { useQuery } from '@tanstack/react-query';
import { getSplitArray } from '@weather/widgets/weather/forecast/weekly/day-forecast';
import { DailySceleton } from './daily-sceleton';

const CustomTooltip = ({
  payload = [''],
  conditionalMark,
  conditionalType,
}: {
  payload?: string[];
  conditionalType: string;
  conditionalMark: string;
}) => {
  const time =
    payload[0]?.payload.time < 10
      ? '0' + payload[0]?.payload.time + ':00'
      : payload[0]?.payload.time + ':00';
  const value = payload[0]?.value.toFixed(2);
  return (
    <div className="w-fit h-fit flex flex-col bg-black-200 p-2 rounded-xl">
      <span className="text-white-1000">{time}</span>
      <span>
        {conditionalType}: {value} {conditionalMark}
      </span>
    </div>
  );
};
enum annualTypes {
  HUMIDITY = 'humiduty',
  RAINFALL = 'rainfall',
  WINDSPEED = 'windspeed',
}

export const Annual: FC = () => {
  const [annualType, setAnnualType] = useState(annualTypes.HUMIDITY);

  const { data, isLoading } = useQuery({
    queryKey: ['currentHourlyForecast'],
    queryFn: getCurrentHourlyForecast,
  });
  if (!data) return;

  const dayHumidity = getSplitArray({
    arr: data.relativeHumidity2m,
    splitForParts: 13,
    subArrSize: 24,
  })[0];
  const dayRainFall = getSplitArray({
    arr: data.rain,
    splitForParts: 13,
    subArrSize: 24,
  })[0];
  const dayWindSpeed = getSplitArray({
    arr: data.windSpeed10m,
    splitForParts: 13,
    subArrSize: 24,
  })[0];
  const dayData = getSplitArray({
    arr: data.time,
    splitForParts: 13,
    subArrSize: 24,
  })[0];

  const HUMIDITY = dayHumidity.map((humidity, index) => ({
    time: dayData[index].getHours(),
    value: humidity,
  }));
  const RAINFALL = dayRainFall.map((rainfall, index) => ({
    time: dayData[index].getHours(),
    value: rainfall,
  }));
  const WINDSPEED = dayWindSpeed.map((windspeed, index) => ({
    time: dayData[index].getHours(),
    value: windspeed,
  }));

  const dailyData = {
    humiduty: {
      conditionalMark: '%',
      conditionalType: 'Humiduty',
      data: HUMIDITY,
    },
    rainfall: {
      conditionalMark: 'mm/d',
      conditionalType: 'Amount of precipitation',
      data: RAINFALL,
    },
    windspeed: {
      conditionalMark: 'km/h',
      conditionalType: 'Wind speed',
      data: WINDSPEED,
    },
  };

  return isLoading ? (
    <DailySceleton />
  ) : (
    <div
      className={twJoin(
        'relative max-tabletS:hidden min-h-[330px] w-full bg-blue-600 rounded-3xl border-2 border-blue-450 pl-8 pr-8 pb-6 pt-6 flex flex-col overflow-hidden'
      )}
    >
      <div className="flex w-full h-fit justify-between">
        <span className="text-3xl">Overview</span>
        <div className="w-fit flex h-full gap-5 text-lg rounded-full bg-black-200 text-white-1000">
          <button
            onClick={() => setAnnualType(annualTypes.HUMIDITY)}
            className={twJoin(
              'rounded-full pl-3 pr-3 transition-colors duration-200',
              annualType === annualTypes.HUMIDITY &&
                'bg-white-1000 text-blue-500'
            )}
          >
            Humidity
          </button>
          <button
            onClick={() => setAnnualType(annualTypes.RAINFALL)}
            className={twJoin(
              'rounded-full pl-3 pr-3 transition-colors duration-700',
              annualType === annualTypes.RAINFALL &&
                'bg-white-1000 text-blue-500'
            )}
          >
            Rainfall
          </button>
          <button
            onClick={() => setAnnualType(annualTypes.WINDSPEED)}
            className={twJoin(
              'rounded-full pl-3 pr-3 transition-colors duration-700',
              annualType === annualTypes.WINDSPEED &&
                'bg-white-1000 text-blue-500'
            )}
          >
            Windspeed
          </button>
        </div>
      </div>
      <ResponsiveContainer
        height={260}
        width="95%"
        className={'absolute top-16 left-0'}
      >
        <LineChart width={100} data={dailyData[annualType].data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={'time'} tick={{ fill: 'white' }} />
          <YAxis tick={{ fill: 'white' }} />
          <Tooltip
            wrapperStyle={{ height: '40px', border: 'none' }}
            content={
              <CustomTooltip
                conditionalType={dailyData[annualType].conditionalType}
                conditionalMark={dailyData[annualType].conditionalMark}
              />
            }
          />
          <Line
            type="monotone"
            dataKey={'value'}
            stroke="#82ca9d"
            strokeWidth={'3'}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
