'use client';
import { FC, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { NewsList } from './news-item';
import { NewsItem } from './news-item/news-item';
const maxListItems = 4;
export const News: FC = () => {
  const [scrollLeft, setScrollLeftWidth] = useState(0);
  const newsListRef = useRef<HTMLDivElement | null>(null);
  const newsList = newsListRef.current;

  const caruselHandler = useCallback(
    (L: boolean = true) => {
      if (!newsList) return;
      const scrollMaxWidth = newsList.scrollWidth - newsList.clientWidth;
      console.log(scrollLeft);
      const newScrollLeft = L
        ? scrollLeft - scrollMaxWidth - maxListItems
        : scrollLeft + scrollMaxWidth - maxListItems;
      setScrollLeftWidth(() =>
        newScrollLeft < 0
          ? 0
          : newScrollLeft > scrollMaxWidth
          ? scrollMaxWidth
          : newScrollLeft
      );
    },
    [newsList, scrollLeft]
  );

  useLayoutEffect(() => {
    if (!newsList) return;
    newsList.scrollLeft = scrollLeft;
  }, [newsList, scrollLeft]);

  return (
    <div className="w-full h-96 rounded-3xl border-2 border-blue-450 p-3 flex flex-col gap-3 bg-white-1000">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Weather News</h1>
        <div className="flex gap-5 absolute right-16">
          <button
            className="bg-blue-500 rounded-full w-9 h-9 rotate-180"
            onClick={() => caruselHandler()}
          >
            ➤
          </button>
          <button
            className="bg-blue-500 rounded-full w-9 h-9"
            onClick={() => caruselHandler(false)}
          >
            ➤
          </button>
        </div>
      </div>
      <div
        ref={newsListRef}
        className="flex gap-4 w-full h-full overflow-hidden"
      >
        <NewsList maxListItems={maxListItems} />
      </div>
    </div>
  );
};
