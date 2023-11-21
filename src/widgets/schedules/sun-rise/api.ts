import { fetchWeatherApi } from 'openmeteo';

const params = {
  latitude: 49.4445,
  longitude: 32.0574,
  hourly: [
    'temperature_2m',
    'relative_humidity_2m',
    'precipitation_probability',
    'rain',
    'showers',
    'snowfall',
    'snow_depth',
    'weather_code',
    'visibility',
    'wind_speed_10m',
    'wind_direction_10m',
    'wind_gusts_10m',
    'is_day',
    'sunshine_duration',
    'cloud_cover',
  ],
};
const url = 'https://api.open-meteo.com/v1/forecast';
export const getCurrentWindData = async () => {
  const [response] = await fetchWeatherApi(url, params);

  const hourly = response.hourly()!;
  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  const utcOffsetSeconds = response.utcOffsetSeconds();
  const weatherData = {
    time: Array.from(
      range(
        Number(hourly.time()),
        Number(hourly.timeEnd()),
        hourly.interval()
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000))
    ),
    temperature2m: Array.from(hourly.variables(0)!.valuesArray()!),
    relativeHumidity2m: Array.from(hourly.variables(1)!.valuesArray()!),
    precipitationProbability: Array.from(hourly.variables(2)!.valuesArray()!),
    rain: Array.from(hourly.variables(3)!.valuesArray()!),
    showers: Array.from(hourly.variables(4)!.valuesArray()!),
    snowfall: Array.from(hourly.variables(5)!.valuesArray()!),
    snowDepth: Array.from(hourly.variables(6)!.valuesArray()!),
    weatherCode: Array.from(hourly.variables(7)!.valuesArray()!),
    visibility: Array.from(hourly.variables(8)!.valuesArray()!),
    windSpeed10m: Array.from(hourly.variables(9)!.valuesArray()!),
    windDirection10m: Array.from(hourly.variables(10)!.valuesArray()!),
    windGusts10m: Array.from(hourly.variables(11)!.valuesArray()!),
    isDay: Array.from(hourly.variables(12)!.valuesArray()!),
    sunshineDuration: Array.from(hourly.variables(13)!.valuesArray()!),
    cloudCover: Array.from(hourly.variables(14)!.valuesArray()!),
  };
  return weatherData;
};
