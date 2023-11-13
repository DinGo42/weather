import { fetchWeatherApi } from 'openmeteo';

const params = {
  latitude: 49.4446,
  longitude: 32.0574,
  current: [
    'temperature_2m',
    'relative_humidity_2m',
    'apparent_temperature',
    'is_day',
    'precipitation',
    'rain',
    'showers',
    'snowfall',
    'weather_code',
    'cloud_cover',
    'pressure_msl',
    'surface_pressure',
    'wind_speed_10m',
    'wind_direction_10m',
    'wind_gusts_10m',
  ],
  hourly: [
    'temperature_2m',
    'relative_humidity_2m',
    'precipitation_probability',
    'precipitation',
    'rain',
    'snowfall',
    'weather_code',
    'pressure_msl',
    'surface_pressure',
    'cloud_cover',
    'cloud_cover_low',
    'cloud_cover_mid',
    'cloud_cover_high',
    'visibility',
    'wind_speed_10m',
    'wind_direction_10m',
    'wind_gusts_10m',
    'soil_temperature_0cm',
    'soil_temperature_6cm',
    'soil_temperature_18cm',
    'soil_moisture_0_to_1cm',
    'soil_moisture_1_to_3cm',
    'soil_moisture_3_to_9cm',
    'soil_moisture_9_to_27cm',
    'uv_index',
    'uv_index_clear_sky',
    'is_day',
    'freezing_level_height',
    'direct_radiation',
  ],
  daily: [
    'weather_code',
    'temperature_2m_max',
    'temperature_2m_min',
    'sunrise',
    'sunset',
    'uv_index_max',
    'uv_index_clear_sky_max',
    'precipitation_sum',
    'rain_sum',
    'showers_sum',
    'snowfall_sum',
    'precipitation_hours',
    'precipitation_probability_max',
    'wind_speed_10m_max',
    'wind_gusts_10m_max',
    'wind_direction_10m_dominant',
  ],
  timeformat: 'unixtime',
  models: 'best_match',
};
const url = 'https://api.open-meteo.com/v1/forecast';

export const getTadaysForecast = async () => {
  const [response] = await fetchWeatherApi(url, params);

  console.log(response);
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
      apparentTemperature: current.variables(2)!.value(),
      isDay: current.variables(3)!.value(),
      precipitation: current.variables(4)!.value(),
      rain: current.variables(5)!.value(),
      showers: current.variables(6)!.value(),
      snowfall: current.variables(7)!.value(),
      weatherCode: current.variables(8)!.value(),
      cloudCover: current.variables(9)!.value(),
      pressureMsl: current.variables(10)!.value(),
      surfacePressure: current.variables(11)!.value(),
      windSpeed10m: current.variables(12)!.value(),
      windDirection10m: current.variables(13)!.value(),
      windGusts10m: current.variables(14)!.value(),
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
      precipitation: hourly.variables(3)!.valuesArray()!,
      rain: hourly.variables(4)!.valuesArray()!,
      snowfall: hourly.variables(5)!.valuesArray()!,
      weatherCode: hourly.variables(6)!.valuesArray()!,
      pressureMsl: hourly.variables(7)!.valuesArray()!,
      surfacePressure: hourly.variables(8)!.valuesArray()!,
      cloudCover: hourly.variables(9)!.valuesArray()!,
      cloudCoverLow: hourly.variables(10)!.valuesArray()!,
      cloudCoverMid: hourly.variables(11)!.valuesArray()!,
      cloudCoverHigh: hourly.variables(12)!.valuesArray()!,
      visibility: hourly.variables(13)!.valuesArray()!,
      windSpeed10m: hourly.variables(14)!.valuesArray()!,
      windDirection10m: hourly.variables(15)!.valuesArray()!,
      windGusts10m: hourly.variables(16)!.valuesArray()!,
      soilTemperature0cm: hourly.variables(17)!.valuesArray()!,
      soilTemperature6cm: hourly.variables(18)!.valuesArray()!,
      soilTemperature18cm: hourly.variables(19)!.valuesArray()!,
      soilMoisture0To1cm: hourly.variables(20)!.valuesArray()!,
      soilMoisture1To3cm: hourly.variables(21)!.valuesArray()!,
      soilMoisture3To9cm: hourly.variables(22)!.valuesArray()!,
      soilMoisture9To27cm: hourly.variables(23)!.valuesArray()!,
      uvIndex: hourly.variables(24)!.valuesArray()!,
      uvIndexClearSky: hourly.variables(25)!.valuesArray()!,
      isDay: hourly.variables(26)!.valuesArray()!,
      freezingLevelHeight: hourly.variables(27)!.valuesArray()!,
      directRadiation: hourly.variables(28)!.valuesArray()!,
    },
    daily: {
      time: range(
        Number(daily.time()),
        Number(daily.timeEnd()),
        daily.interval()
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
      weatherCode: daily.variables(0)!.valuesArray()!,
      temperature2mMax: daily.variables(1)!.valuesArray()!,
      temperature2mMin: daily.variables(2)!.valuesArray()!,
      sunrise: daily.variables(3)!.valuesArray()!,
      sunset: daily.variables(4)!.valuesArray()!,
      uvIndexMax: daily.variables(5)!.valuesArray()!,
      uvIndexClearSkyMax: daily.variables(6)!.valuesArray()!,
      precipitationSum: daily.variables(7)!.valuesArray()!,
      rainSum: daily.variables(8)!.valuesArray()!,
      showersSum: daily.variables(9)!.valuesArray()!,
      snowfallSum: daily.variables(10)!.valuesArray()!,
      precipitationHours: daily.variables(11)!.valuesArray()!,
      precipitationProbabilityMax: daily.variables(12)!.valuesArray()!,
      windSpeed10mMax: daily.variables(13)!.valuesArray()!,
      windGusts10mMax: daily.variables(14)!.valuesArray()!,
      windDirection10mDominant: daily.variables(15)!.valuesArray()!,
    },
  };
  // `weatherData` now contains a simple structure with arrays for datetime and weather data
  // for (let i = 0; i < weatherData.hourly.time.length; i++) {
  //   console.log(
  //     weatherData.hourly.time[i].toISOString(),
  //     weatherData.hourly.temperature2m[i],
  //     weatherData.hourly.relativeHumidity2m[i],
  //     weatherData.hourly.precipitationProbability[i],
  //     weatherData.hourly.precipitation[i],
  //     weatherData.hourly.rain[i],
  //     weatherData.hourly.snowfall[i],
  //     weatherData.hourly.weatherCode[i],
  //     weatherData.hourly.pressureMsl[i],
  //     weatherData.hourly.surfacePressure[i],
  //     weatherData.hourly.cloudCover[i],
  //     weatherData.hourly.cloudCoverLow[i],
  //     weatherData.hourly.cloudCoverMid[i],
  //     weatherData.hourly.cloudCoverHigh[i],
  //     weatherData.hourly.visibility[i],
  //     weatherData.hourly.windSpeed10m[i],
  //     weatherData.hourly.windDirection10m[i],
  //     weatherData.hourly.windGusts10m[i],
  //     weatherData.hourly.soilTemperature0cm[i],
  //     weatherData.hourly.soilTemperature6cm[i],
  //     weatherData.hourly.soilTemperature18cm[i],
  //     weatherData.hourly.soilMoisture0To1cm[i],
  //     weatherData.hourly.soilMoisture1To3cm[i],
  //     weatherData.hourly.soilMoisture3To9cm[i],
  //     weatherData.hourly.soilMoisture9To27cm[i],
  //     weatherData.hourly.uvIndex[i],
  //     weatherData.hourly.uvIndexClearSky[i],
  //     weatherData.hourly.isDay[i],
  //     weatherData.hourly.freezingLevelHeight[i],
  //     weatherData.hourly.directRadiation[i]
  //   );
  // }
  // for (let i = 0; i < weatherData.daily.time.length; i++) {
  //   console.log(
  //     weatherData.daily.time[i].toISOString(),
  //     weatherData.daily.weatherCode[i],
  //     weatherData.daily.temperature2mMax[i],
  //     weatherData.daily.temperature2mMin[i],
  //     weatherData.daily.sunrise[i],
  //     weatherData.daily.sunset[i],
  //     weatherData.daily.uvIndexMax[i],
  //     weatherData.daily.uvIndexClearSkyMax[i],
  //     weatherData.daily.precipitationSum[i],
  //     weatherData.daily.rainSum[i],
  //     weatherData.daily.showersSum[i],
  //     weatherData.daily.snowfallSum[i],
  //     weatherData.daily.precipitationHours[i],
  //     weatherData.daily.precipitationProbabilityMax[i],
  //     weatherData.daily.windSpeed10mMax[i],
  //     weatherData.daily.windGusts10mMax[i],
  //     weatherData.daily.windDirection10mDominant[i]
  //   );
  // }
  return weatherData;
};
