'use client';
import { useState } from 'react';
export enum measureMeasurements {
  CELSIUS = 'Celsius',
  FAHRENHEIT = 'Fahrenheit',
}
export const useUnitMeasurement = () => {
  const [measureMeasurement, setMeasureMeasurement] = useState(
    measureMeasurements.CELSIUS
  );
  const changeToCelsius = () => {
    setMeasureMeasurement(measureMeasurements.CELSIUS);
  };
  const changeToFahrenheit = () => {
    setMeasureMeasurement(measureMeasurements.FAHRENHEIT);
  };
  return { measureMeasurement, changeToCelsius, changeToFahrenheit };
};
