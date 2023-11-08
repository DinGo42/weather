import { FC } from 'react';
type NewsItemProps = {
  itemWidth?: number;
  id?: number;
};
export const NewsItem: FC<NewsItemProps> = ({ itemWidth, id }) => {
  return (
    <div className="h-full w-full p-4 bg-blue-500 flex-col flex justify-between rounded-3xl">
      <span className="text-xl">Heavy rain == {id}</span>
      <div className="flex w-full flex-col gap-1 max-h-24 justify-between">
        <span className="text-md">New Your</span>
        <span className="text-sm">
          Heavy rain causes last night, President called off for two days.
        </span>
      </div>
    </div>
  );
};
