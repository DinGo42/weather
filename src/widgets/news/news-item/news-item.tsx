import { FC } from 'react';
type NewsItemProps = {
  itemWidth?: number;
};
export const NewsItem: FC<NewsItemProps> = () => {
  return (
    <div className="min-w-[32.2%] max-w-[32.2%] h-full p-4 bg-blue-500 flex flex-col justify-between rounded-3xl">
      <span className="text-xl">Heavy rain</span>
      <div className="flex w-full flex-col gap-1 max-h-24 justify-between">
        <span className="text-md">New Your</span>
        <span className="text-sm">
          Heavy rain causes last night, President called off for two days.
        </span>
      </div>
    </div>
  );
};
