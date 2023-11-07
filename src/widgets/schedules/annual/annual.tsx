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

const HUMIDITY = [
  { name: 'January', value: 65 },
  { name: 'February', value: 62 },
  { name: 'March', value: 58 },
  { name: 'April', value: 56 },
  { name: 'May', value: 63 },
  { name: 'June', value: 70 },
  { name: 'July', value: 75 },
  { name: 'August', value: 78 },
  { name: 'September', value: 72 },
  { name: 'October', value: 68 },
  { name: 'November', value: 64 },
  { name: 'December', value: 66 },
];

const RAINFALL = [
  { name: 'January', value: 30 },
  { name: 'February', value: 28 },
  { name: 'March', value: 32 },
  { name: 'April', value: 35 },
  { name: 'May', value: 40 },
  { name: 'June', value: 45 },
  { name: 'July', value: 50 },
  { name: 'August', value: 55 },
  { name: 'September', value: 45 },
  { name: 'October', value: 38 },
  { name: 'November', value: 32 },
  { name: 'December', value: 28 },
];

const WINDSPEED = [
  { name: 'January', value: 12 },
  { name: 'February', value: 11 },
  { name: 'March', value: 10 },
  { name: 'April', value: 9 },
  { name: 'May', value: 8 },
  { name: 'June', value: 7 },
  { name: 'July', value: 8 },
  { name: 'August', value: 9 },
  { name: 'September', value: 10 },
  { name: 'October', value: 11 },
  { name: 'November', value: 12 },
  { name: 'December', value: 13 },
];

const CustomTooltip = ({
  payload = [''],
  label = '',
  conditionalMark,
}: {
  payload?: string[];
  label?: string;
  conditionalMark: string;
}) => (
  <div className="w-fit h-fit flex flex-col bg-black-200 p-2 rounded-xl">
    <span className="text-white-1000">{label}</span>
    <span>
      Temperature: {payload[0]?.value} {conditionalMark}
    </span>
  </div>
);
enum annualTypes {
  HUMIDITY = 'humiduty',
  RAINFALL = 'rainfall',
  WINDSPEED = 'windspeed',
}
const data = {
  humiduty: { conditionalMark: '%', data: HUMIDITY },
  rainfall: { conditionalMark: 'mm/y', data: RAINFALL },
  windspeed: { conditionalMark: 'km/h', data: WINDSPEED },
};
export const Annual: FC = () => {
  const [annualType, setAnnualType] = useState(annualTypes.HUMIDITY);
  // const screenType = useScreenSize()
  // screenType !== screenTypes.TABLET_S && 'hidden'
  return (
    <div
      className={twJoin(
        'relative max-tabletS:hidden h-[330px] w-full bg-blue-600 rounded-3xl border-2 border-blue-450 pl-8 pr-8 pb-6 pt-6 flex flex-col overflow-hidden'
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
        <LineChart width={100} data={data[annualType].data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={'name'} tick={{ fill: 'white' }} />
          <YAxis tick={{ fill: 'white' }} />
          <Tooltip
            wrapperStyle={{ height: '40px', border: 'none' }}
            content={
              <CustomTooltip
                conditionalMark={data[annualType].conditionalMark}
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
