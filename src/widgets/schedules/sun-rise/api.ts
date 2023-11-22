import { getApiParams, ApiParamsTypes, url } from '@weather/shared';
import { getSplitArray } from '@weather/widgets/weather/forecast/weekly/day-forecast';
import { fetchWeatherApi } from 'openmeteo';

const { apiParams, apiParamsKeys } = getApiParams([ApiParamsTypes.IS_DAY]);

const params = {
  latitude: 49.4445,
  longitude: 32.0574,
  hourly: apiParamsKeys,
};
export const getCurrentWindData = async () => {
  const [response] = await fetchWeatherApi(url, params);

  const hourly = response.hourly()!;
  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  const utcOffsetSeconds = response.utcOffsetSeconds();

  const time = getSplitArray({
    arr: Array.from(
      range(
        Number(hourly.time()),
        Number(hourly.timeEnd()),
        hourly.interval()
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000))
    ),
    splitForParts: 0,
    subArrSize: 24,
  })[0];
  const isDay = getSplitArray({
    arr: Array.from(hourly.variables(apiParams.is_day)!.valuesArray()!),
    splitForParts: 0,
    subArrSize: 24,
  })[0];
  const sunSetIndex =
    isDay.slice(isDay.indexOf(1)).indexOf(0) + isDay.indexOf(1);
  const sunRise = time[isDay.indexOf(1)];
  const sunSet = time[sunSetIndex];
  const currentTime = new Date().getHours();
  return { sunRise, sunSet, currentTime };
};
