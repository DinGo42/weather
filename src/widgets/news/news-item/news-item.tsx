import { FC } from 'react';
type NewsItemProps = {
  itemWidth?: number;
};
export const NewsItem: FC<NewsItemProps> = () => {
  return (
    <div className="min-w-[23.5%] max-w-[23.5%] h-full p-2 bg-white-1000"></div>
  );
};
