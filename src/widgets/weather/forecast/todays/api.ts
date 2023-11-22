import {
  ApiParamsTypes,
  getApiParams,
  url,
  useWeatherIcon,
  useWeatherType,
} from '@weather/shared';
import { fetchWeatherApi } from 'openmeteo';

const { apiParams: currentApiParams, apiParamsKeys: currentApiKeys } =
  getApiParams([
    ApiParamsTypes.TEMPERATURE,
    ApiParamsTypes.RELATIVE_HIMIDITY,
    ApiParamsTypes.RAIN,
    ApiParamsTypes.IS_DAY,
    ApiParamsTypes.SNOWFALL,
    ApiParamsTypes.CLOUD_COVER,
    ApiParamsTypes.WIND_SPEED,
  ]);
const { apiParams: hourlyApiParams, apiParamsKeys: hourlyApiKeys } =
  getApiParams([
    ApiParamsTypes.TEMPERATURE,
    ApiParamsTypes.RAIN,
    ApiParamsTypes.IS_DAY,
    ApiParamsTypes.SNOWFALL,
    ApiParamsTypes.CLOUD_COVER,
  ]);

const params = {
  latitude: 49.4445,
  longitude: 32.0574,
  current: currentApiKeys,
  hourly: hourlyApiKeys,
};
export const getCurrentForecast = async () => {
  const [response] = await fetchWeatherApi(url, params);

  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
  const utcOffsetSeconds = response.utcOffsetSeconds();

  const current = response.current()!;
  const hourly = response.hourly()!;

  const currentDate = new Date();

  const weatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature2m: current
        .variables(currentApiParams.temperature_2m)!
        .value(),
      relativeHumidity2m: current
        .variables(currentApiParams.relative_humidity_2m)!
        .value(),
      isDay: current.variables(currentApiParams.is_day)!.value(),
      rain: current.variables(currentApiParams.rain)!.value(),
      snowfall: current.variables(currentApiParams.snowfall)!.value(),
      cloudCover: current.variables(currentApiParams.cloud_cover)!.value(),
      windSpeed10m: current.variables(currentApiParams.wind_speed_10m)!.value(),
      weatherType: useWeatherType({
        cloudCover: current.variables(currentApiParams.cloud_cover)!.value(),
        rain: current.variables(currentApiParams.rain)!.value(),
        snowfall: current.variables(currentApiParams.snowfall)!.value(),
        temperature: current
          .variables(currentApiParams.temperature_2m)!
          .value(),
      }),
    },
    hourly: {
      weatherData: range(
        Number(hourly.time()),
        Number(hourly.timeEnd()),
        hourly.interval()
      )
        .map((t) => new Date((t + utcOffsetSeconds) * 1000))
        .slice(currentDate.getHours() - 2, currentDate.getHours() + 23)
        .map((time, index) => ({
          time: time,
          temperature: Number(
            hourly
              .variables(hourlyApiParams.temperature_2m)!
              .valuesArray()!
              .slice(currentDate.getHours() - 2, currentDate.getHours() + 23)
              [index].toFixed(0)
          ),
          rain: hourly
            .variables(hourlyApiParams.rain)!
            .valuesArray()!
            .slice(currentDate.getHours() - 2, currentDate.getHours() + 23)[
            index
          ],
          snofall: hourly
            .variables(hourlyApiParams.snowfall)!
            .valuesArray()!
            .slice(currentDate.getHours() - 2, currentDate.getHours() + 23)[
            index
          ],
          isDay: hourly
            .variables(hourlyApiParams.is_day)!
            .valuesArray()!
            .slice(currentDate.getHours() - 2, currentDate.getHours() + 23)[
            index
          ],
          cloudCover: hourly
            .variables(hourlyApiParams.cloud_cover)!
            .valuesArray()!
            .slice(currentDate.getHours() - 2, currentDate.getHours() + 23)[
            index
          ],
        })),
      temperatureFluctuations: hourly
        .variables(0)!
        .valuesArray()!
        .slice(0, 24)
        .sort(),
    },
  };

  const maxDayTemperature =
    weatherData.hourly.temperatureFluctuations[23].toFixed(0);
  const minDayTemperature =
    weatherData.hourly.temperatureFluctuations[0].toFixed(0);

  const weatherIcon = useWeatherIcon({
    cloudCover: weatherData.current.cloudCover,
    iconScale: 2,
    isDay: !!weatherData.current.isDay,
    isHovered: true,
    rain: weatherData.current.rain,
    snowfall: weatherData.current.snowfall,
    weatherType: weatherData.current.weatherType,
  });

  return { ...weatherData, maxDayTemperature, minDayTemperature, weatherIcon };
};
