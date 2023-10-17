import { News, Schedules, Weather } from '@weather/widgets';
import { NewsList } from '@weather/widgets/news/news-item';

export default function Home() {
  return (
    <>
      <Weather />
      <div className="w-full h-full flex flex-col justify-between gap-5">
        <Schedules />
        <News />
      </div>
    </>
  );
}
