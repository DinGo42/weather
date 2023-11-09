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

enum Manths {
  Jan = 'January',
  Feb = 'February',
  Mar = 'March',
  Apr = 'April',
  May = 'May',
  Jun = 'June',
  Jul = 'July',
  Aug = 'August',
  Sep = 'September',
  Oct = 'October',
  Nov = 'November',
  Dec = 'December',
}

const Months2 = {};

const HUMIDITY = [
  { name: 'Jan', fullName: 'January', value: 65 },
  { name: 'Feb', fullName: 'February', value: 62 },
  { name: 'Mar', fullName: 'March', value: 58 },
  { name: 'Apr', fullName: 'April', value: 56 },
  { name: 'May', fullName: 'May', value: 63 },
  { name: 'Jun', fullName: 'June', value: 70 },
  { name: 'Jul', fullName: 'July', value: 75 },
  { name: 'Aug', fullName: 'August', value: 78 },
  { name: 'Sep', fullName: 'September', value: 72 },
  { name: 'Oct', fullName: 'October', value: 68 },
  { name: 'Nov', fullName: 'November', value: 64 },
  { name: 'Dec', fullName: 'December', value: 66 },
];

const RAINFALL = [
  { name: 'Jan', fullName: 'January', value: 30 },
  { name: 'Feb', fullName: 'February', value: 28 },
  { name: 'Mar', fullName: 'March', value: 32 },
  { name: 'Apr', fullName: 'April', value: 35 },
  { name: 'May', fullName: 'May', value: 40 },
  { name: 'Jun', fullName: 'June', value: 45 },
  { name: 'Jul', fullName: 'July', value: 50 },
  { name: 'Aug', fullName: 'August', value: 55 },
  { name: 'Sep', fullName: 'September', value: 45 },
  { name: 'Oct', fullName: 'October', value: 38 },
  { name: 'Nov', fullName: 'November', value: 32 },
  { name: 'Dec', fullName: 'December', value: 28 },
];

const WINDSPEED = [
  { name: 'Jan', fullName: 'January', value: 12 },
  { name: 'Feb', fullName: 'February', value: 11 },
  { name: 'Mar', fullName: 'March', value: 10 },
  { name: 'Apr', fullName: 'April', value: 9 },
  { name: 'May', fullName: 'May', value: 8 },
  { name: 'Jun', fullName: 'June', value: 7 },
  { name: 'Jul', fullName: 'July', value: 8 },
  { name: 'Aug', fullName: 'August', value: 9 },
  { name: 'Sep', fullName: 'September', value: 10 },
  { name: 'Oct', fullName: 'October', value: 11 },
  { name: 'Nov', fullName: 'November', value: 12 },
  { name: 'Dec', fullName: 'December', value: 13 },
];

const CustomTooltip = ({
  payload = [''],
  conditionalMark,
  conditionalType,
}: {
  payload?: string[];
  conditionalType: string;
  conditionalMark: string;
}) => {
  return (
    <div className="w-fit h-fit flex flex-col bg-black-200 p-2 rounded-xl">
      <span className="text-white-1000">{payload[0]?.payload.fullName}</span>
      <span>
        {conditionalType}: {payload[0]?.value} {conditionalMark}
      </span>
    </div>
  );
};
enum annualTypes {
  HUMIDITY = 'humiduty',
  RAINFALL = 'rainfall',
  WINDSPEED = 'windspeed',
}
const data = {
  humiduty: {
    conditionalMark: '%',
    conditionalType: 'Humiduty',
    data: HUMIDITY,
  },
  rainfall: {
    conditionalMark: 'mm/y',
    conditionalType: 'Amount of precipitation',
    data: RAINFALL,
  },
  windspeed: {
    conditionalMark: 'km/h',
    conditionalType: 'Wind speed',
    data: WINDSPEED,
  },
};
export const Annual: FC = () => {
  const [annualType, setAnnualType] = useState(annualTypes.HUMIDITY);
  // const screenType = useScreenSize()
  // screenType !== screenTypes.TABLET_S && 'hidden'
  return (
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
        <LineChart width={100} data={data[annualType].data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={'name'} tick={{ fill: 'white' }} />
          <YAxis tick={{ fill: 'white' }} />
          <Tooltip
            wrapperStyle={{ height: '40px', border: 'none' }}
            content={
              <CustomTooltip
                conditionalType={data[annualType].conditionalType}
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
