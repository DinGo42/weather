'use client';
import { FC, useRef } from 'react';
import { NewsList } from './news-item';

export const News: FC = () => {
  const newsListRef = useRef<HTMLDivElement | null>(null);

  const newsList = newsListRef.current;
  if (!newsList) return;
  const newsListWidth = newsList.scrollWidth - newsList.clientWidth;
  newsList.scrollLeft = 1059;

  return (
    <div className="w-full h-96 bg-blue-500 rounded-3xl border-2 border-blue-450 p-3">
      <h1>Weather News</h1>
      <div
        ref={newsListRef}
        className="flex gap-4 w-full h-full pb-6 overflow-x-auto"
      >
        <NewsList />
      </div>
    </div>
  );
};
