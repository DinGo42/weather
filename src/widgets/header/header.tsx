import {
  Button,
  Input,
  InputStylesType,
  measureMeasurements,
  useUnitMeasurement,
} from '@weather/shared';
import { FC, useState } from 'react';
import { twJoin } from 'tailwind-merge';

export const Header: FC = () => {
  // const [isOpen, setOpen] = useState(false);
  // const { changeToCelsius, changeToFahrenheit, measureMeasurement } =
  //   useUnitMeasurement();

  return (
    <header className="w-full h-12 flex items-center justify-between">
      <h2>Cherkassy, Ukraine</h2>
      <div className="flex items-center gap-4 pl-1 h-fit w-fit">
        <Input
          styleType={InputStylesType.SEARCH}
          className="max-tabletS:hidden"
        />
        {/* <div
          className={twJoin(
            'w-fit flex flex-col  transition-all duration-500 bg-blue-450 rounded-3xl',
            isOpen ? 'h-28 rounded-xl bg-blue-350 w-32' : 'h-8 w-10'
          )}
        >
          <button
            className="pl-4 pr-4 h-8 w-full bg-blue-450 flex gap-2 items-center justify-center rounded-xl"
            onClick={() => {
              setOpen((prev) => !prev);
            }}
          >
            <span className="text-center">{translate}</span>
            <span className="text-xs">▼</span>
          </button>

          <button
            className={twJoin(
              'w-full justify-center h-8 bg-blue-450 flex gap-2 items-center hover:border-b-2 hover:border-t-2 border-blue-600',
              !isOpen && 'hidden',
              translate === Translates.RU && 'hidden'
            )}
            onClick={() => {
              setToRu();
              setOpen(() => false);
            }}
          >
            <span className="text-center">RU</span>
          </button>
          <button
            className={twJoin(
              'w-full justify-center h-8 bg-blue-450 flex gap-2 items-center hover:border-b-2 hover:border-t-2 border-blue-600',
              !isOpen && 'hidden',
              translate === Translates.ENG && 'hidden'
            )}
            onClick={() => {
              setToEng();
              setOpen(() => false);
            }}
          >
            <span className="text-center">ENG</span>
          </button>
          <button
            className={twJoin(
              'w-full justify-center h-8 bg-blue-450 flex gap-2 items-center hover:border-b-2 hover:border-t-2 border-blue-600',
              !isOpen && 'hidden',
              translate === Translates.UA && 'hidden'
            )}
            onClick={() => {
              setToUA();
              setOpen(() => false);
            }}
          >
            <span className="text-center">UA</span>
          </button>
        </div> */}
        <Button
          className="rounded-3xl flex border-2 border-blue-350"
          // onClick={() =>
          //   measureMeasurement === measureMeasurements.CELSIUS
          //     ? changeToFahrenheit
          //     : changeToCelsius
          // }
        >
          <span
            className={twJoin(
              'h-7 w-10 rounded-full text-center text-sm flex items-center justify-center'
              //   measureMeasurement === measureMeasurements.CELSIUS &&
              //     'bg-blue-350'
            )}
          >
            C°
          </span>
          <span
            className={twJoin(
              'h-7 w-10 rounded-full text-center text-sm flex items-center justify-center'
              // measureMeasurement === measureMeasurements.FAHRENHEIT &&
              //   'bg-blue-350'
            )}
          >
            F°
          </span>
        </Button>
      </div>
    </header>
  );
};
