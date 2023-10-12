import { News, Schedules, Weather } from '@weather/widgets';

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
