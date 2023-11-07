'use client';
import {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
// import { screenTypes, useCarusel, useScreenSize } from '@weather/shared';
import { NewsItem } from './news-item/news-item';
import { maxListItemsForScreen, newsListGap } from './constants';
import { createItemsListProps } from '@weather/shared/hooks/use-carusel';

const weacklyNews = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
];
export const News: FC = () => {
  const listRef = useRef<HTMLDivElement>(null);

  // const { screenType } = useScreenSize();
  // const maxListItems = maxListItemsForScreen[screenType];
  // const { createItemsList, nextPage, prevPage } = useCarusel({
  //   wrapperGap: newsListGap,
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

  const [screenType, setScreenType] = useState<screeTypes>(screeTypes.PHONE_S);
  const windowResizeHandler = () => {
    const currentScreenWidth = window.innerWidth;
    if (currentScreenWidth > 1440) {
      // screenType.dectopM = true
      setScreenType(screeTypes.DECTOP_M);
    } else if (currentScreenWidth > 1280) {
      // screenType.dectopS = true
      setScreenType(screeTypes.DECTOP_S);
    } else if (currentScreenWidth > 1024) {
      // screenType.tabletM = true
      setScreenType(screeTypes.TABLET_M);
    } else if (currentScreenWidth > 768) {
      // screenType.tabletS = true
      setScreenType(screeTypes.TABLET_S);
    } else if (currentScreenWidth > 480) {
      // screenType.phoneM = true
      setScreenType(screeTypes.PHONE_M);
    } else if (currentScreenWidth > 320) {
      // screenType.phoneS = true
      setScreenType(screeTypes.PHONE_S);
    }
  };

  useLayoutEffect(() => windowResizeHandler());
  useEffect(() => {
    document.addEventListener('resize', windowResizeHandler);
    return () => window.removeEventListener('resize', windowResizeHandler);
  }, [windowResizeHandler]);

  const maxListItems = maxListItemsForScreen[screenType];

  const [scrollLeft, setScrollLeftWidth] = useState(0);
  const caruselHandler = useCallback(
    (L: boolean = true) => {
      if (!listRef.current) return;
      const scrollMaxWidth =
        listRef.current.scrollWidth - listRef.current.clientWidth;
      listRef.current.style.gap = newsListGap.toString();
      const newScrollLeft = L
        ? scrollLeft - listRef.current.clientWidth - newsListGap
        : scrollLeft + listRef.current.clientWidth + newsListGap;
      setScrollLeftWidth(() =>
        newScrollLeft < 0
          ? 0
          : newScrollLeft > scrollMaxWidth
          ? scrollMaxWidth
          : newScrollLeft
      );
    },
    [listRef.current, scrollLeft]
  );

  const nextPage = useCallback(() => {
    caruselHandler();
  }, []);

  const prevPage = useCallback(() => {
    caruselHandler(false);
  }, []);

  const createItemsList = ({
    itemConstructor,
    data,
    maxListItems,
  }: createItemsListProps) => {
    if (!listRef.current) return;
    const caruselWidth = listRef.current.clientWidth;
    const listWidthWithoutGap = caruselWidth - newsListGap * (maxListItems - 1);
    const itemWidth =
      ((listWidthWithoutGap / maxListItems) * 100) / caruselWidth;
    return data.map((item, index) =>
      itemConstructor({ ...item, key: index, itemWidth })
    );
  };
  useLayoutEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollLeft = scrollLeft;
  }, [listRef.current, scrollLeft]);

  ////////////

  return (
    <div className="w-full max-h-full min-h-[290px] rounded-3xl border-2 border-blue-450 p-3 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Weather News</h1>
        <div className="flex gap-5">
          <button
            className="bg-blue-500 rounded-full w-9 h-9 rotate-180 text-center"
            onClick={nextPage}
          >
            ➤
          </button>
          <button
            className="bg-blue-500 rounded-full w-9 h-9 text-center"
            onClick={prevPage}
          >
            ➤
          </button>
        </div>
      </div>
      <div
        ref={listRef}
        style={{ gap: newsListGap + 'px' }}
        className="flex w-full h-full overflow-hidden"
      >
        {createItemsList({
          data: weacklyNews,
          maxListItems,
          itemConstructor: ({ itemWidth, key, ...props }) => (
            <NewsItem key={key} itemWidth={itemWidth} {...props} />
          ),
        })}
      </div>
    </div>
  );
};
