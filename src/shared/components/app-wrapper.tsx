import { Header } from '@weather/widgets';
import { FC, ReactNode } from 'react';

type AppWrapperProps = {
  children: ReactNode;
};
export const AppWrapper: FC<AppWrapperProps> = ({ children }) => {
  return (
    <>
      <div className="bg-blue-800 w-full h-screen flex flex-col pl-2 pr-2">
        {/* <Header /> */}
        <div className="w-full h-fit flex max-dectopS:flex-col gap-2 pb-3">
          {children}
        </div>
      </div>
    </>
  );
};
