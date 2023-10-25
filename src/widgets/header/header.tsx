import { Button, Input, InputStylesType } from '@weather/shared';
import { FC } from 'react';

export const Header: FC = () => {
  return (
    <header className="w-full h-12 flex items-center justify-between">
      <h2>Cherkassy, Ukraine</h2>
      <div className="flex items-center gap-4 pl-1 h-fit w-fit">
        <Input
          styleType={InputStylesType.SEARCH}
          className="max-tabletS:hidden"
        />
        <Button className="pr-7 pl-7 p-2 rounded-3xl bg-blue-450">s</Button>
        <Button className="pr-7 pl-7 p-2 rounded-3xl bg-blue-450">s</Button>
      </div>
    </header>
  );
};
