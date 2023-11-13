import { Button } from '@weather/shared';
import { FC } from 'react';

type ModalNewsProps = {
  title: string;
  location: string;
  text: string;
  author?: string;
  bgOnClick: () => void;
};

export const ModalNews: FC<ModalNewsProps> = ({
  title,
  text,
  author,
  location,
  bgOnClick,
}) => {
  return (
    <div
      className="w-screen h-screen absolute left-0 top-0 flex items-center justify-center bg-white-1000"
      onClick={bgOnClick}
    >
      <div className="w-[80%] h-[80%] bg-blue-450 flex flex-col rounded-3xl p-36 gap-11">
        <div className="w-full flex h-fit justify-between gap-12">
          <div className="w-full flex justify-between">
            <span className="text-xl">{title}</span>
            <span className="text-xl">{author}</span>
          </div>
          <Button
            className="text-xl p-1 pl-2 pr-2 hover:bg-blue-600 rounded-md"
            onClick={bgOnClick}
          >
            ✖
          </Button>
        </div>
        <div className="flex w-full flex-col gap-1 h-full justify-between">
          <span className="text-md">{location}</span>
          <span className="text-sm">{text}</span>
        </div>
      </div>
    </div>
  );
};
