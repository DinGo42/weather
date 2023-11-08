import { News, Schedules, Weather } from '@weather/widgets';
export enum measureMeasurements {
  CELSIUS = 'Celsius',
  FAHRENHEIT = 'Fahrenheit',
}
export default function Home() {
  // const [measureMeasurement, setMeasureMeasurement] = useState(
  //   measureMeasurements.CELSIUS
  // );
  return (
    <>
      <Weather />
      <div className="w-full h-full flex flex-col justify-between gap-2">
        <Schedules />
        <News />
      </div>
    </>
  );
}
