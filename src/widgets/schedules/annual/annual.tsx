'use client'
import { screeTypes, useScreenType } from '@weather/shared';
import { FC } from 'react';
import { twJoin } from 'tailwind-merge';
import {LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer, Legend} from 'recharts';
import { AnimatedCounter } from "react-animated-counter";



const CustomTooltip = ({ payload, label }:{payload?:string, label?:string}) => {
  return(
      <div className="w-fit h-fit first-letter:bg-red-1000">
        <p className="text-white-1000">{label}</p>
        <div className="w-full">
          <p className='flex'>Temperature:  {<AnimatedCounter fontSize="18px" value={payload[0]?.value} color='white' />} °C </p>
        </div>
      </div>
)};

export const Annual: FC = () => {
  // const screenType = useScreenType()
  // screenType !== screeTypes.TABLET_S && 'hidden'

const data = [
  {
    name:'Jan',
    temperature:1
  },
  {
    name:'Feb',
    temperature:4
  },
  {
    name:'Mar',
    temperature:22
  },
  {
    name:'Apr',
    temperature:-30
  },
  {
    name:'May',
    temperature:0
  },
  {
    name:'Jun',
    temperature:-12
  },
  {
    name:'Jul',
    temperature:8
  },
  {
    name:'Aug',
    temperature:-5
  },
  {
    name:'Sep',
    temperature:2
  },
  {
    name:'Oct',
    temperature:22
  },
  {
    name:'Nov',
    temperature:27
  },
  {
    name:'Dec',
    temperature:30
  }
]
  return (
    <div className={twJoin("max-tabletS:hidden w-full h-full bg-blue-600 rounded-3xl border-2 border-blue-450 pl-8 pr-8 pt-6 pb-6 flex flex-col overflow-hidden")}>
      <div className="flex w-full h-fit justify-between">
        <span className="text-3xl">Overview</span>
        <div className="w-fit flex h-full gap-5 text-lg">
          <button>Humidity</button>
          <button>Rainfall</button>
          <button>Windspeed</button>
        </div>
      </div>
      <ResponsiveContainer height={300} width="95%">
        <LineChart width={100} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fill: "white" }} />
          <YAxis tick={{ fill: "white" }} />
          <Tooltip
            wrapperStyle={{ height: "40px", border: "none" }}
            content={<CustomTooltip />}
          />
          <Legend />
          <Line type="monotone" dataKey="temperature" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>


      {/* <div className="w-full h-full">
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
      </div> */}
    </div>
  );
};
