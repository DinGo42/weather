import { fetchWeatherApi } from 'openmeteo';

const params = {
  latitude: 49.4445,
  longitude: 32.0574,
  current: ['wind_speed_10m', 'wind_direction_10m', 'wind_gusts_10m'],
};
const url = 'https://api.open-meteo.com/v1/forecast';
export const getCurrentWindData = async () => {
  const [response] = await fetchWeatherApi(url, params);

  const current = response.current()!;

  const weatherData = {
    windSpeed10m: Number(current.variables(0)!.valuesArray()!),
    windDirection10m: Number(current.variables(1)!.valuesArray()!),
    windGusts10m: Number(current.variables(2)!.valuesArray()!),
  };
  return weatherData;
};
