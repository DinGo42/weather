import { DayForecast } from './day-forecast';

const testArr = [1, 2, 3, 4, 5, 6];

export const DayForecastList = () => {
  return testArr.map((item) => <DayForecast key={item} />);
};
