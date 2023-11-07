'use client';
import {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { HourForecast } from './hours';
import CountUp from 'react-countup';
import { GloomyLightSnowIcon } from '../../../../../public/icons';
import { screenTypes, useCarusel, useScreenSize } from '@weather/shared';
import { twJoin } from 'tailwind-merge';
import { listGap, maxListItemsForScreen } from './constants';
import { createItemsListProps } from '@weather/shared/hooks/use-carusel';

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
  const listRef = useRef<HTMLDivElement>(null);
  // const { screenType } = useScreenSize();
  // const maxListItems = maxListItemsForScreen[screenType];
  // const { createItemsList } = useCarusel({
  //   wrapperGap: listGap,
  //   wrapperRef: listRef.current,
  // });

  /////// rm
  // enum screenTypes {
  //   PHONE_S = 'phoneS',
  //   PHONE_S_PLUS = 'phoneSPlus',
  //   PHONE_M = 'phoneM',
  //   TABLET_S = 'tabletS',
  //   TABLET_M = 'tabletM',
  //   DECTOP_S = 'dectopS',
  //   DECTOP_M = 'dectopM',
  // }

  // const [screenType, setScreenType] = useState<screenTypes>(
  //   screenTypes.PHONE_M
  // );
  // const [screenWidth, setScreenWidth] = useState(0);
  // useEffect(() => {
  //   console.log(1, window.innerWidth);
  //   const windowResizeHandler = () => {
  //     const currentScreenWidth = window.innerWidth;
  //     setScreenWidth(currentScreenWidth);
  //     if (currentScreenWidth > 1440) {
  //       setScreenType(screenTypes.DECTOP_M);
  //     } else if (currentScreenWidth > 1280) {
  //       setScreenType(screenTypes.DECTOP_S);
  //     } else if (currentScreenWidth > 1024) {
  //       setScreenType(screenTypes.TABLET_M);
  //     } else if (currentScreenWidth > 768) {
  //       setScreenType(screenTypes.TABLET_S);
  //     } else if (currentScreenWidth > 480) {
  //       setScreenType(screenTypes.PHONE_M);
  //     } else if (currentScreenWidth > 320) {
  //       setScreenType(screenTypes.PHONE_S);
  //     }
  //   };
  //   document.addEventListener('resize', windowResizeHandler);
  //   windowResizeHandler();
  //   return () => window.removeEventListener('resize', windowResizeHandler);
  // }, []);
  // const maxListItems = maxListItemsForScreen[screenType];

  // useEffect(() => {
  //   if (!listRef.current) return;
  //   listRef.current.style.gap = listRef.current.toString();
  // }, []);
  // const createItemsList = ({
  //   itemConstructor,
  //   data,
  //   maxListItems,
  // }: createItemsListProps) => {
  //   const caruselWidth = screenWidth;
  //   const listWidthWithoutGap = caruselWidth - listGap * (maxListItems - 1);
  //   const itemWidth =
  //     ((listWidthWithoutGap / maxListItems) * 100) / caruselWidth;
  //   return data.map((item, index) =>
  //     itemConstructor({ ...item, key: index, itemWidth })
  //   );
  // };

  // ////////////

  ///rm

  enum screeTypes {
    PHONE_S = 'phoneS',
    PHONE_S_PLUS = 'phoneSPlus',
    PHONE_M = 'phoneM',
    TABLET_S = 'tabletS',
    TABLET_M = 'tabletM',
    DECTOP_S = 'dectopS',
    DECTOP_M = 'dectopM',
  }

  const [screenType, setScreenType] = useState<screenTypes>(
    screenTypes.PHONE_S
  );
  const windowResizeHandler = () => {
    const currentScreenWidth = window.innerWidth;
    if (currentScreenWidth > 1440) {
      // screenType.dectopM = true
      setScreenType(screenTypes.DECTOP_M);
    } else if (currentScreenWidth > 1280) {
      // screenType.dectopS = true
      setScreenType(screenTypes.DECTOP_S);
    } else if (currentScreenWidth > 1024) {
      // screenType.tabletM = true
      setScreenType(screenTypes.TABLET_M);
    } else if (currentScreenWidth > 768) {
      // screenType.tabletS = true
      setScreenType(screenTypes.TABLET_S);
    } else if (currentScreenWidth > 480) {
      // screenType.phoneM = true
      setScreenType(screenTypes.PHONE_M);
    } else if (currentScreenWidth > 320) {
      // screenType.phoneS = true
      setScreenType(screenTypes.PHONE_S);
    }
  };

  useLayoutEffect(() => windowResizeHandler());
  useEffect(() => {
    document.addEventListener('resize', windowResizeHandler);
    return () => window.removeEventListener('resize', windowResizeHandler);
  }, [windowResizeHandler]);

  const maxListItems = maxListItemsForScreen[screenType];

  const createItemsList = ({
    itemConstructor,
    data,
    maxListItems,
  }: createItemsListProps) => {
    if (!listRef.current) return;
    const caruselWidth = listRef.current.clientWidth;
    const listWidthWithoutGap = caruselWidth - listGap * (maxListItems - 1);
    const itemWidth =
      ((listWidthWithoutGap / maxListItems) * 100) / caruselWidth;
    return data.map((item, index) =>
      itemConstructor({ ...item, key: index, itemWidth })
    );
  };

  ////////////

  return (
    <div className="bg-blue-400 pl-4 pr-4 pt-4 pb-2 w-full h-fit rounded-3xl border-2 border-blue-450 flex flex-col gap-4">
      <div className="flex w-full justify-between">
        <span className="flex pb-3">02 Sep, 2023 09:45</span>
        <span
          className={twJoin(screenType === screenTypes.DECTOP_S && 'hidden')}
        >
          Cloudy 24 - 32°C
        </span>
      </div>
      <div className="w-full h-fit flex items-center justify-between">
        <div
          className={twJoin(
            'flex flex-col text-xs w-[20%] items-center h-full relative justify-end pb-3 gap-3',
            screenType !== screenTypes.DECTOP_S && 'hidden'
          )}
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
      <div
        ref={listRef}
        className="h-fit w-full overflow-hidden gap-3 flex self-center overflow-x-auto pb-2"
      >
        {createItemsList({
          data: hourlyWeatherData,
          maxListItems,
          itemConstructor: ({ itemWidth, key, ...props }) => (
            <HourForecast key={key} itemWidth={itemWidth} {...props} />
          ),
        })}
      </div>
    </div>
  );
};
