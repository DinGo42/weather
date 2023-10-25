import { Header } from '@weather/widgets';
import { FC, ReactNode } from 'react';

type AppWrapperProps = {
  children: ReactNode;
};
export const AppWrapper: FC<AppWrapperProps> = ({ children }) => {
  return (
    <>
      <div className="bg-blue-800 w-screen h-screen flex flex-col phoneSPlus:pr-5 phoneSPlus:pl-5 pb-3 pt-2 pl-2 pr-2">
        <Header />
        <div className="w-full h-full flex gap-6 max-tabletM:flex-col">
          {children}
        </div>
      </div>
    </>
  );
};
