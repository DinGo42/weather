import { getSplitArray } from '@weather/widgets/weather/forecast/weekly/day-forecast';
import { fetchWeatherApi } from 'openmeteo';
import { dailyTypes } from './types';
import { ApiParamsTypes, getApiParams, url } from '@weather/shared';

const { apiParams, apiParamsKeys } = getApiParams([
  ApiParamsTypes.RELATIVE_HIMIDITY,
  ApiParamsTypes.RAIN,
  ApiParamsTypes.WIND_SPEED,
]);
const params = {
  latitude: 49.4445,
  longitude: 32.0574,
  hourly: apiParamsKeys,
};
export const getCurrentHourlyForecast = async () => {
  const [response] = await fetchWeatherApi(url, params);

  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
  const utcOffsetSeconds = response.utcOffsetSeconds();

  const hourly = response.hourly()!;

  const dayHumidity = getSplitArray({
    arr: Array.from(
      hourly.variables(apiParams.relative_humidity_2m)!.valuesArray()!
    ),
    splitForParts: 13,
    subArrSize: 24,
  })[0];
  const dayRainFall = getSplitArray({
    arr: Array.from(hourly.variables(apiParams.rain)!.valuesArray()!),
    splitForParts: 13,
    subArrSize: 24,
  })[0];
  const dayWindSpeed = getSplitArray({
    arr: Array.from(hourly.variables(apiParams.wind_speed_10m)!.valuesArray()!),
    splitForParts: 13,
    subArrSize: 24,
  })[0];
  const dayDate = getSplitArray({
    arr: Array.from(
      range(
        Number(hourly.time()),
        Number(hourly.timeEnd()),
        hourly.interval()
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000))
    ),
    splitForParts: 13,
    subArrSize: 24,
  })[0];

  const HUMIDITY = dayHumidity.map((humidity, index) => ({
    time: dayDate[index].getHours(),
    value: humidity,
  }));
  const RAINFALL = dayRainFall.map((rainfall, index) => ({
    time: dayDate[index].getHours(),
    value: rainfall,
  }));
  const WINDSPEED = dayWindSpeed.map((windspeed, index) => ({
    time: dayDate[index].getHours(),
    value: windspeed,
  }));

  const dailyData = {
    [dailyTypes.HUMIDITY]: {
      conditionalMark: '%',
      conditionalType: 'Humiduty',
      data: HUMIDITY,
    },
    [dailyTypes.RAINFALL]: {
      conditionalMark: 'mm/d',
      conditionalType: 'Amount of precipitation',
      data: RAINFALL,
    },
    [dailyTypes.WINDSPEED]: {
      conditionalMark: 'km/h',
      conditionalType: 'Wind speed',
      data: WINDSPEED,
    },
  };

  return dailyData;
};
