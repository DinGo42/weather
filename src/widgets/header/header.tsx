import {
  Button,
  Input,
  InputStylesType,
  Translates,
  measureMeasurements,
  useTranslate,
  useUnitMeasurement,
} from '@weather/shared';
import { FC, useState } from 'react';
import { twJoin } from 'tailwind-merge';

export const Header: FC = () => {
  // const [isOpen, setOpen] = useState(false);
  // const { changeToCelsius, changeToFahrenheit, measureMeasurement } =
  //   useUnitMeasurement();
  // const { setToEng, setToRu, setToUA, translate } = useTranslate();
  return (
    <header className="w-full h-12 flex items-center justify-between">
      <h2>Cherkassy, Ukraine</h2>
      <div className="flex items-center gap-4 pl-1 h-fit w-fit">
        <Input
          styleType={InputStylesType.SEARCH}
          className="max-tabletS:hidden"
        />
        <div
          className={twJoin(
            'flex flex-col transition-all duration-500 bg-blue-450 rounded-3xl'
            // isOpen ? 'h-26 rounded-xl bg-blue-350 w-32' : 'h-6 w-20'
          )}
        >
          <button
            className="w-full bg-blue-450 flex gap-2 items-center justify-center rounded-xl"
            // onClick={() => {
            // setOpen((prev) => !prev);
            // }}
          >
            {/* <span className="text-center">{translate}</span>
            <span className="text-xs">{isOpen ? '▲' : '▼'}</span> */}
          </button>
          {/* {isOpen && (
            <>
              <button
                className={twJoin(
                  'w-full justify-center h-8 transition-opacity flex gap-2 items-center',
                  // isOpen
                  //   ? 'opacity-100 delay-300 duration-500'
                  //   : ' opacity-0 delay-0 duration-0',
                  translate === Translates.RU && 'hidden'
                )}
                onClick={() => {
                  setToRu();
                  setOpen(() => false);
                }}
              >
                <span className={'text-center'}>RU</span>
              </button>
              <button
                className={twJoin(
                  'w-full justify-center h-8 transition-opacity flex gap-2 items-center',
                  // isOpen
                  //   ? 'opacity-100 delay-300 duration-500'
                  //   : 'opacity-0 delay-0 duration-0',
                  translate === Translates.ENG && 'hidden'
                )}
                onClick={() => {
                  setToEng();
                  setOpen(() => false);
                }}
              >
                <span className={'text-center'}>ENG</span>
              </button>
              <button
                className={twJoin(
                  'w-full justify-center h-8 transition-opacity flex gap-2 items-center rounded-b-xl',
                  // isOpen
                  //   ? 'opacity-100 delay-300 duration-500'
                  //   : 'opacity-0 delay-0 duration-0',
                  translate === Translates.UA && 'hidden'
                )}
                onClick={() => {
                  setToUA();
                  setOpen(() => false);
                }}
              >
                <span className={'text-center'}>UA</span>
              </button>
            </>
          )} */}
        </div>
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
