import { FC } from 'react';
type NewsItemProps = {
  id?: number;
  title?: string;
  location?: string;
  text?: string;
  onClick?: () => void;
};
export const NewsItem: FC<NewsItemProps> = ({
  id,
  onClick,
  location,
  text,
  title,
}) => {
  return (
    <div
      className="p-4 bg-blue-500 flex-col flex justify-between rounded-3xl overflow-hidden"
      onClick={onClick}
    >
      <span className="text-xl bg-red-1000 text-ellipsis whitespace-nowrap overflow-hidden">
        {title}
      </span>
      <div className="flex w-full flex-col gap-1 h-fit justify-between bg-red-1000">
        <span className="text-md text-ellipsis whitespace-nowrap overflow-hidden">
          {location}
        </span>
        <span className="text-sm text-ellipsis whitespace-nowrap overflow-hidden">
          {text}
        </span>
      </div>
    </div>
  );
};
