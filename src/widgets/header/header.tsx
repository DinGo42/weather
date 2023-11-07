import { measureMeasurements } from '@weather/app/page';
import { Button, Input, InputStylesType } from '@weather/shared';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { twJoin } from 'tailwind-merge';

// type HeaderProps = {
//   setMeasureMeasurement: Dispatch<SetStateAction<measureMeasurements>>;
//   measureMeasurement: measureMeasurements;
// };
export const Header: FC = () => {
  return (
    <header className="w-full h-12 flex items-center justify-between">
      <h2>Cherkassy, Ukraine</h2>
      <div className="flex items-center gap-4 pl-1 h-fit w-fit">
        <Input
          styleType={InputStylesType.SEARCH}
          className="max-tabletS:hidden"
        />
        <Button className="pr-7 pl-7 p-2 rounded-3xl bg-blue-450"></Button>
        {/* <Button
          className="rounded-3xl flex border-2 border-blue-350"
          // onClick={() =>
          //   setMeasureMeasurement((prev) =>
          //     prev === measureMeasurements.CELSIUS
          //       ? measureMeasurements.FAHRENHEIT
          //       : measureMeasurements.CELSIUS
          //   )
          // }
        >
          <span
            className={twJoin(
              'h-7 w-10 rounded-full text-center text-sm flex items-center justify-center'
              // measureMeasurement === measureMeasurements.CELSIUS &&
              //   'bg-blue-350'
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
        </Button> */}



        <label className="switch">
          <input type="checkbox" checked={true} />
          <span className="slider round">sd</span>
        </label>
      </div>
    </header>
  );
};
