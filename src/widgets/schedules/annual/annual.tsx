'use client';
import { FC } from 'react';
import { twJoin } from 'tailwind-merge';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const data = [
  {
    name: 'Jan',
    temperature: 1,
  },
  {
    name: 'Feb',
    temperature: 4,
  },
  {
    name: 'Mar',
    temperature: 22,
  },
  {
    name: 'Apr',
    temperature: -30,
  },
  {
    name: 'May',
    temperature: 0,
  },
  {
    name: 'Jun',
    temperature: -12,
  },
  {
    name: 'Jul',
    temperature: 8,
  },
  {
    name: 'Aug',
    temperature: -5,
  },
  {
    name: 'Sep',
    temperature: 2,
  },
  {
    name: 'Oct',
    temperature: 22,
  },
  {
    name: 'Nov',
    temperature: 27,
  },
  {
    name: 'Dec',
    temperature: 30,
  },
];

const CustomTooltip = ({
  payload = [''],
  label = '',
}: {
  payload?: string[];
  label?: string;
}) => (
  <div className="w-fit h-fit">
    <p className="text-white-1000">{label}</p>
    <p>Temperature: {payload[0]?.valueOf} °C</p>
  </div>
);

export const Annual: FC = () => {
  // const screenType = useScreenSize()
  // screenType !== screenTypes.TABLET_S && 'hidden'
  return (
    <div
      className={twJoin(
        'relative max-tabletS:hidden min-h-[250px] w-full h-full bg-blue-600 rounded-3xl border-2 border-blue-450 pl-8 pr-8 pb-6 pt-6 flex flex-col overflow-hidden'
      )}
    >
      <div className="flex w-full h-fit justify-between">
        <span className="text-3xl">Overview</span>
        <div className="w-fit flex h-full gap-5 text-lg">
          <button>Humidity</button>
          <button>Rainfall</button>
          <button>Windspeed</button>
        </div>
      </div>
      <ResponsiveContainer
        height={250}
        width="95%"
        className={'absolute top-16 left-0'}
      >
        <LineChart width={100} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fill: 'white' }} />
          <YAxis tick={{ fill: 'white' }} />
          <Tooltip
            wrapperStyle={{ height: '40px', border: 'none' }}
            content={<CustomTooltip />}
          />
          <Legend />
          <Line type="monotone" dataKey="temperature" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
