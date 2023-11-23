import { NewsItem } from './news-item/news-item';

export const NewsSceleton = () => (
  <div className="animate-slow-pulse w-full h-full min-h-[290px] rounded-3xl border-2 border-blue-450 p-3 flex flex-col gap-3 justify-center">
    <div className="flex items-center justify-end">
      <div className="flex gap-5">
        <button className="bg-blue-500 rounded-full w-9 h-9 rotate-180 text-center"></button>
        <button className="bg-blue-500 rounded-full w-9 h-9 text-center"></button>
      </div>
    </div>
    <div className="w-full h-full overflow-hidden scroll-smooth">
      <div
        className="grid grid-flow-col
max-phoneM:auto-cols-[calc((100%-16px*0)/1)]
max-tabletS:auto-cols-[calc((100%-16px*1)/2)]
auto-cols-[calc((100%-16px*3)/4)]
h-full gap-4"
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
          <NewsItem key={index} id={index} />
        ))}
      </div>
    </div>
  </div>
);
