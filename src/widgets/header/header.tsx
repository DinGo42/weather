import { Button, Image, Input, InputStylesType } from '@weather/shared';
import { FC, useLayoutEffect, useRef, useState } from 'react';
import { DayIcon } from '../../../public/icons';
import { Test } from '../../../public/icons/header/day';

export const Header: FC = () => {
  return (
    <header className="w-full h-14 flex items-center justify-between">
      <h2>Cherkassy, Ukraine</h2>
      {/* <Image
        alt=""
        src={'/icons/header/day.svg'}
        width={124}
        height={124}
        id="test"
      /> */}

      <div className="flex items-center gap-4 pr-24 pl-1">
        <Input styleType={InputStylesType.SEARCH} />
        <Button className="pr-7 pl-7 p-2 rounded-3xl bg-blue-450">s</Button>
        <Button className="pr-7 pl-7 p-2 rounded-3xl bg-blue-450">s</Button>
      </div>
    </header>
  );
};
