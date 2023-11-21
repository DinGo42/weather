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
      className="h-full w-full p-4 bg-blue-500 flex-col flex justify-between rounded-3xl"
      onClick={onClick}
    >
      <span className="text-xl">{title}</span>
      <div className="flex w-full flex-col gap-1 max-h-24 justify-between">
        <span className="text-md">{location}</span>
        <span className="text-sm">{text}</span>
      </div>
    </div>
  );
};
