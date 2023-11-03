'use client';
import { FC, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { HourForecast } from './hours';
import CountUp from 'react-countup';
import { GloomyLightSnowIcon } from '../../../../../public/icons';
import { screeTypes, useScreenType } from '@weather/shared';
import { twJoin } from 'tailwind-merge';

const listGap = 12

export const maxListItemsForScreen = {
  phoneS: 3,
  phoneSPlus:4,
  phoneM: 6,
  tabletS: 8,
  tabletM: 10,
  dectopS: 6,
  dectopM: 7
}

export const TadaysForecast: FC = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const list= listRef.current
  const screenType = useScreenType()
  const maxListItems = maxListItemsForScreen[screenType];

  console.log(screenType)
  type createItemsListProps = {
    data:any[]
    maxListItems: number,
    itemConstructor:({itemWidth,key,...props}:{itemWidth:number,key:number,props:any})=>JSX.Element
  }
  
  
    const [scrollLeft, setScrollLeftWidth] = useState(0);
    const [shownPage,setShownPage] = useState(0)
    const caruselHandler = useCallback((L: boolean = true) => {
      if (!list) return;
      const scrollMaxWidth = list.scrollWidth - list.clientWidth;
      list.style.gap = listGap.toString()
        const newScrollLeft = L
          ? scrollLeft - list.clientWidth-listGap
          : scrollLeft + list.clientWidth+listGap;
        setScrollLeftWidth(() =>
          newScrollLeft < 0
            ? 0
            : newScrollLeft > scrollMaxWidth
            ? scrollMaxWidth
            : newScrollLeft)
        },[list,scrollLeft])
  
    const nextPage = useCallback(()=>{
        caruselHandler();
        setShownPage(prev=>prev+1)},[])
     
    const prevPage = useCallback(()=>{caruselHandler(false);setShownPage(prev=>prev-1)},[])
  
  
    const createItemsList = ({itemConstructor,data,maxListItems}:createItemsListProps) => {
      if (!list) return;
  
      const scrollMaxWidth = list.clientWidth;
  
      const listWidthWithoutGap = scrollMaxWidth-listGap*(maxListItems-1)
      const itemWidth = listWidthWithoutGap/maxListItems*100/scrollMaxWidth
      return data.map((item,index) => itemConstructor({itemWidth,key:index,...item}));
  
    }
    useLayoutEffect(() => {
      if(!list)return 
      list.scrollLeft = scrollLeft;
      }, [list, scrollLeft]);
  


  return (
    <div className="bg-blue-400 p-4 w-full h-full rounded-3xl border-2 border-blue-450 flex flex-col gap-4">
      <div className="flex w-full justify-between">
        <span className="flex pb-3">02 Sep, 2023 09:45</span>
        <span className={twJoin(screenType===screeTypes.DECTOP_S && "hidden")}>Cloudy 24 - 32°C</span>
      </div>
      <div className="w-full h-fit flex items-center justify-between">
        <div className={twJoin("flex flex-col text-xs w-[20%] items-center h-full relative justify-end pb-3 gap-3", screenType!==screeTypes.DECTOP_S && "hidden")}>
          <GloomyLightSnowIcon isHovered={true} scale={2} />
          <span>Cloudy 24 - 32°C</span>
        </div>
        <div className="flex h-fit w-full justify-around">
          <div className="flex flex-col h-fit gap-3 justify-around text-center items-center phoneM:text-5xl text-3xl">
            <span>
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
      <div ref={listRef} className="h-fit w-full overflow-hidden gap-3 flex self-center overflow-x-auto">

      {createItemsList({
          data:[{id:1}, {id:2}, {id:3}, {id:4}, {id:5}, {id:6},{id:7},{id:8},{id:9},{id:10}],
          maxListItems,
          itemConstructor:({itemWidth,key,...props})=><HourForecast key={key} itemWidth={itemWidth} {...props}/>

        })}
        {/* <HourList maxListItems={maxListItems} listGap={listGap} listWidth={list.current?.clientWidth||0}/> */}
      </div>
    </div>
  );
};
