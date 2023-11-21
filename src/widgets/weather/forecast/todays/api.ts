import { useWeatherType } from '@weather/shared';
import { fetchWeatherApi } from 'openmeteo';



enum HourlyParams {
  asdadadsda
}

const params = {
  latitude: 49.4445,
  longitude: 32.0574,
  current: [
    'temperature_2m',
    'relative_humidity_2m',
    'is_day',
    'rain',
    'snowfall',
    'cloud_cover',
    'wind_speed_10m',
  ],
  hourly: [
    'temperature_2m',
    'rain',
    'snowfall',
    'is_day',
    'cloud_cover',
  ],
};
const url = 'https://api.open-meteo.com/v1/forecast';
export const getCurrentForecast = async () => {
  const [response] = await fetchWeatherApi(url, params);

  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
  const utcOffsetSeconds = response.utcOffsetSeconds();

  const current = response.current()!;
  const hourly = response.hourly()!;

  const currentDate = new Date()

  const weatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature2m: current.variables(0)!.value(),
      relativeHumidity2m: current.variables(1)!.value(),
      isDay: current.variables(2)!.value(),
      rain: current.variables(3)!.value(),
      snowfall: current.variables(4)!.value(),
      cloudCover: current.variables(5)!.value(),
      windSpeed10m: current.variables(6)!.value(),
      weatherType: useWeatherType({
        cloudCover: current.variables(5)!.value(),
        rain: current.variables(3)!.value(),
        snowfall: current.variables(4)!.value(),
        temperature: current.variables(0)!.value(),
      })
    },
    hourly:{
      weatherData:range(
        Number(hourly.time()),
        Number(hourly.timeEnd()),
        hourly.interval()
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000)).slice(currentDate.getHours() - 2, currentDate.getHours() + 23)
      .map((time, index) => ({
        time: time,
        temperature: Number(
          hourly.variables(0)!.valuesArray()!.slice(currentDate.getHours() - 2, currentDate.getHours() + 23)
            [index].toFixed(0)
        ),
        rain: hourly.variables(1)!.valuesArray()!.slice(currentDate.getHours() - 2, currentDate.getHours() + 23)[index],
        snofall: hourly.variables(2)!.valuesArray()!.slice(currentDate.getHours() - 2, currentDate.getHours() + 23)[index],
        isDay: hourly.variables(3)!.valuesArray()!.slice(currentDate.getHours() - 2, currentDate.getHours() + 23)[index],
        cloudCover: hourly.variables(4)!.valuesArray()!.slice(currentDate.getHours() - 2, currentDate.getHours() + 23)[index],
      })),
      temperatureFluctuations:hourly.variables(0)!.valuesArray()!.slice(0,24).sort(),
    }
    
    
  };
  return weatherData;
};
