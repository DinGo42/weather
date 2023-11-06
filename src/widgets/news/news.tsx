'use client';
import { FC, useRef } from 'react';
import { useCarusel, useScreenSize } from '@weather/shared';
import { NewsItem } from './news-item/news-item';
import { maxListItemsForScreen, newsListGap } from './constants';

const weacklyNews = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
];
export const News: FC = () => {
  const newsListRef = useRef<HTMLDivElement | null>(null);
  const newsList = newsListRef.current;
  const { createItemsList, nextPage, prevPage } = useCarusel({
    wrapperGap: newsListGap,
    wrapperRef: newsList as HTMLDivElement,
  });
  const { screenType } = useScreenSize();
  const maxListItems = maxListItemsForScreen[screenType];
  return (
    <div className="w-full h-80 rounded-3xl border-2 border-blue-450 p-3 flex flex-col gap-3">
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
        ref={newsListRef}
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
