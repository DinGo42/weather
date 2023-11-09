'use client';
import { FC, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { NewsItem } from './news-item/news-item';
import { twJoin } from 'tailwind-merge';

const weacklyNews = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
];

export enum Translates {
  ENG = 'ENG',
  UA = 'UA',
  RU = 'RU',
}
const useTranslate = () => {
  const [translate, setTranslate] = useState(Translates.ENG);
  const setToEng = () => setTranslate(Translates.ENG);
  const setToUA = () => setTranslate(Translates.UA);
  const setToRu = () => setTranslate(Translates.RU);
  return { translate, setToEng, setToUA, setToRu };
};

export const News: FC = () => {
  const [scrollLeft, setScrollLeftWidth] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const newsListGap = 16;

  const caruselHandler = useCallback(
    (L: boolean = true) => {
      if (!listRef.current) return;
      const scrollMaxWidth =
        listRef.current.scrollWidth - listRef.current.clientWidth;
      listRef.current.style.gap = newsListGap.toString();
      const newScrollLeft = L
        ? -(listRef.current.clientWidth + newsListGap)
        : listRef.current.clientWidth + newsListGap;
      setScrollLeftWidth((prev) => {
        console.log(newScrollLeft);
        const newValue = prev + newScrollLeft;
        if (newValue < 0) return 0;
        if (newValue > scrollMaxWidth) return scrollMaxWidth;
        return newValue;
      });
    },
    [listRef.current, scrollLeft]
  );

  const nextPage = useCallback(() => {
    caruselHandler();
  }, []);

  const prevPage = useCallback(() => {
    caruselHandler(false);
  }, []);
  useLayoutEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollLeft = scrollLeft;
  }, [listRef.current, scrollLeft]);

  const [isOpen, setOpen] = useState(false);
  const { setToEng, setToRu, setToUA, translate } = useTranslate();

  return (
    <div className="w-full h-full min-h-[290px] rounded-3xl border-2 border-blue-450 p-3 flex flex-col gap-3 justify-center">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Weather News</h1>

        <div
          className={twJoin(
            'flex flex-col  transition-all duration-500 bg-blue-450 rounded-3xl',
            isOpen ? 'h-28 rounded-xl bg-blue-350 w-32' : 'h-8 w-20'
          )}
        >
          <button
            className="pl-4 pr-4 h-8 w-full bg-blue-450 flex gap-2 items-center justify-center rounded-xl"
            onClick={() => {
              setOpen((prev) => !prev);
            }}
          >
            <span className="text-center">{translate}</span>
            <span className="text-xs">{isOpen ? '▲' : '▼'}</span>
          </button>

          <button
            className={twJoin(
              'w-full justify-center h-8 transition-all delay-1000 bg-blue-450 flex gap-2 items-center hover:border-b-2 hover:border-t-2 border-blue-600',
              !isOpen && 'hidden',
              translate === Translates.RU && 'hidden'
            )}
            onClick={() => {
              setToRu();
              setOpen(() => false);
            }}
          >
            <span className="text-center">RU</span>
          </button>
          <button
            className={twJoin(
              'w-full justify-center h-8 bg-blue-450 flex gap-2 items-center hover:border-b-2 hover:border-t-2 border-blue-600',
              !isOpen && 'hidden',
              translate === Translates.ENG && 'hidden'
            )}
            onClick={() => {
              setToEng();
              setOpen(() => false);
            }}
          >
            <span className="text-center">ENG</span>
          </button>
          <button
            className={twJoin(
              'w-full justify-center h-8 bg-blue-450 flex gap-2 items-center hover:border-b-2 hover:border-t-2 border-blue-600',
              !isOpen && 'hidden',
              translate === Translates.UA && 'hidden'
            )}
            onClick={() => {
              setToUA();
              setOpen(() => false);
            }}
          >
            <span className="text-center">UA</span>
          </button>
        </div>

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
      <div className="w-full h-full overflow-hidden scroll-smooth">
        <div
          className="grid grid-flow-col
        max-phoneM:auto-cols-[calc((100%-16px*0)/1)]
        max-tabletS:auto-cols-[calc((100%-16px*1)/2)]
        max-tabletM:auto-cols-[calc((100%-16px*3)/4)]
        auto-cols-[calc((100%-16px*3)/4)]
        h-full gap-4"
        >
          {weacklyNews.map((item, index) => (
            <NewsItem key={index} id={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
