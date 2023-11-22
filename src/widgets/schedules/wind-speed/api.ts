import { getApiParams, ApiParamsTypes, url } from '@weather/shared';
import { fetchWeatherApi } from 'openmeteo';

const { apiParams, apiParamsKeys } = getApiParams([
  ApiParamsTypes.WIND_SPEED,
  ApiParamsTypes.WIND_GUST,
  ApiParamsTypes.WIND_DIRECTION,
]);

const params = {
  latitude: 49.4445,
  longitude: 32.0574,
  current: apiParamsKeys,
};

const weatherRecomendation = {
  0: 'Cлабкий вітер',
  1: 'Cлабкий вітер',
  2: 'Легкий вітер',
  3: 'Легкий вітер',
  4: 'Помірний вітер',
  5: 'Не гуляйте довго на вулиці',
  6: 'Не гуляйте довго на вулиці',
  7: 'Надягніть шапку',
  8: 'Надягніть шапку',
  9: 'По можливості не виходьте',
  10: 'По можливості не виходьте',
  11: 'Закрийте вікна і шукайте укриття',
  12: 'Закрийте вікна і шукайте укриття',
} as const;

export const getCurrentWindData = async () => {
  const [response] = await fetchWeatherApi(url, params);

  const current = response.current()!;

  const weatherData = {
    windSpeed10m: Number(
      current.variables(apiParams.wind_speed_10m)!.valuesArray()!
    ),
    windDirection10m: Number(
      current.variables(apiParams.wind_direction_10m)!.valuesArray()!
    ),
    windGusts10m: Number(
      current.variables(apiParams.wind_gusts_10m)!.valuesArray()!
    ),
  };

  const score =
    weatherData.windSpeed10m > 117
      ? 12
      : weatherData.windSpeed10m > 103
      ? 11
      : weatherData.windSpeed10m > 89
      ? 10
      : weatherData.windSpeed10m > 75
      ? 9
      : weatherData.windSpeed10m > 62
      ? 8
      : weatherData.windSpeed10m > 50
      ? 7
      : weatherData.windSpeed10m > 39
      ? 6
      : weatherData.windSpeed10m > 29
      ? 5
      : weatherData.windSpeed10m > 20
      ? 4
      : weatherData.windSpeed10m > 12
      ? 3
      : weatherData.windSpeed10m > 6
      ? 2
      : weatherData.windSpeed10m > 2
      ? 1
      : 1;

  return {
    weatherData,
    windSpeedScore: score,
    weatherRecomendation: weatherRecomendation[score],
  };
};
