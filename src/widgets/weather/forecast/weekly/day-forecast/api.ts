import { fetchWeatherApi } from 'openmeteo';
import { getAvgFromArray, getSplitArray } from './day-forecast-list';
import { ApiParamsTypes, getApiParams, url } from '@weather/shared';

const { apiParams, apiParamsKeys } = getApiParams([
  ApiParamsTypes.CLOUD_COVER,
  ApiParamsTypes.RAIN,
  ApiParamsTypes.SNOWFALL,
  ApiParamsTypes.TEMPERATURE,
]);
const params = {
  latitude: 49.4445,
  longitude: 32.0574,
  hourly: apiParamsKeys,
};

export const getWeeklyForecast = async () => {
  const [response] = await fetchWeatherApi(url, params);

  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
  const utcOffsetSeconds = response.utcOffsetSeconds();

  const hourly = response.hourly()!;

  const data = {
    time: range(
      Number(hourly.time()),
      Number(hourly.timeEnd()),
      hourly.interval()
    ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
    temperature2m: Array.from(
      hourly.variables(apiParams.temperature_2m)!.valuesArray()!
    ),
    rain: Array.from(hourly.variables(apiParams.rain)!.valuesArray()!),
    snowfall: Array.from(hourly.variables(apiParams.snowfall)!.valuesArray()!),
    cloudCover: Array.from(
      hourly.variables(apiParams.cloud_cover)!.valuesArray()!
    ),
  };

  const weeklyTemperature = getSplitArray({
    arr: data.temperature2m,
    splitForParts: 7,
  }).map((forecast) => getAvgFromArray(forecast));
  const weeklyCloudCover = getSplitArray({
    arr: data.cloudCover,
    splitForParts: 7,
  }).map((forecast) => getAvgFromArray(forecast));
  const weeklyRain = getSplitArray({ arr: data.rain, splitForParts: 7 }).map(
    (forecast) => getAvgFromArray(forecast)
  );
  const weeklySnowfall = getSplitArray({
    arr: data.snowfall,
    splitForParts: 7,
  }).map((forecast) => getAvgFromArray(forecast));
  const weeklyDate = getSplitArray({ arr: data.time, splitForParts: 7 });

  const weeklyData = weeklyDate
    .map((date, index) => ({
      date: date[13],
      temperature: weeklyTemperature[index],
      cloudCover: weeklyCloudCover[index],
      rain: weeklyRain[index],
      snowfall: weeklySnowfall[index],
    }))
    .splice(1);

  return weeklyData;
};
