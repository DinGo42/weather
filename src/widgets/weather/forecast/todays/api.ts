import { fetchWeatherApi } from 'openmeteo';

const params = {
  latitude: 49.4445,
  longitude: 32.0574,
  current: [
    'temperature_2m',
    'relative_humidity_2m',
    'is_day',
    'precipitation',
    'rain',
    'showers',
    'snowfall',
    'weather_code',
    'cloud_cover',
    'wind_speed_10m',
    'wind_direction_10m',
    'wind_gusts_10m',
  ],
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
  // daily: [
  //   'weather_code',
  //   'temperature_2m_max',
  //   'temperature_2m_min',
  //   'sunrise',
  //   'sunset',
  //   'daylight_duration',
  //   'sunshine_duration',
  //   'uv_index_max',
  //   'uv_index_clear_sky_max',
  //   'wind_speed_10m_max',
  //   'wind_gusts_10m_max',
  //   'wind_direction_10m_dominant',
  // ],
};
const url = 'https://api.open-meteo.com/v1/forecast';
export const getCurrentForecast = async () => {
  const [response] = await fetchWeatherApi(url, params);

  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
  const utcOffsetSeconds = response.utcOffsetSeconds();
  const timezone = response.timezone();
  const timezoneAbbreviation = response.timezoneAbbreviation();
  const latitude = response.latitude();
  const longitude = response.longitude();

  const current = response.current()!;
  const hourly = response.hourly()!;
  const daily = response.daily()!;

  const weatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature2m: current.variables(0)!.value(),
      relativeHumidity2m: current.variables(1)!.value(),
      isDay: current.variables(2)!.value(),
      precipitation: current.variables(3)!.value(),
      rain: current.variables(4)!.value(),
      showers: current.variables(5)!.value(),
      snowfall: current.variables(6)!.value(),
      weatherCode: current.variables(7)!.value(),
      cloudCover: current.variables(8)!.value(),
      windSpeed10m: current.variables(9)!.value(),
      windDirection10m: current.variables(10)!.value(),
      windGusts10m: current.variables(11)!.value(),
    },
    hourly: {
      time: range(
        Number(hourly.time()),
        Number(hourly.timeEnd()),
        hourly.interval()
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
      temperature2m: hourly.variables(0)!.valuesArray()!,
      relativeHumidity2m: hourly.variables(1)!.valuesArray()!,
      precipitationProbability: hourly.variables(2)!.valuesArray()!,
      rain: hourly.variables(3)!.valuesArray()!,
      showers: hourly.variables(4)!.valuesArray()!,
      snowfall: hourly.variables(5)!.valuesArray()!,
      snowDepth: hourly.variables(6)!.valuesArray()!,
      weatherCode: hourly.variables(7)!.valuesArray()!,
      visibility: hourly.variables(8)!.valuesArray()!,
      windSpeed10m: hourly.variables(9)!.valuesArray()!,
      windDirection10m: hourly.variables(10)!.valuesArray()!,
      windGusts10m: hourly.variables(11)!.valuesArray()!,
      isDay: hourly.variables(12)!.valuesArray()!,
      sunshineDuration: hourly.variables(13)!.valuesArray()!,
      cloudCover: hourly.variables(14)!.valuesArray()!,
    },
    // daily: {
    //   time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
    //     (t) => new Date((t + utcOffsetSeconds) * 1000)
    //   ),
    //   weatherCode: daily.variables(0)!.valuesArray()!,
    //   temperature2mMax: daily.variables(1)!.valuesArray()!,
    //   temperature2mMin: daily.variables(2)!.valuesArray()!,
    //   sunrise: daily.variables(3)!.valuesArray()!,
    //   sunset: daily.variables(4)!.valuesArray()!,
    //   daylightDuration: daily.variables(5)!.valuesArray()!,
    //   sunshineDuration: daily.variables(6)!.valuesArray()!,
    //   uvIndexMax: daily.variables(7)!.valuesArray()!,
    //   uvIndexClearSkyMax: daily.variables(8)!.valuesArray()!,
    //   windSpeed10mMax: daily.variables(9)!.valuesArray()!,
    //   windGusts10mMax: daily.variables(10)!.valuesArray()!,
    //   windDirection10mDominant: daily.variables(11)!.valuesArray()!,
    // },
  };
  return weatherData;
};
