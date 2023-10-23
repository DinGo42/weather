import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import { twJoin } from 'tailwind-merge';
export enum InputStylesType {
  SEARCH = 'search',
  NONE = 'none',
}

const InputStylesTypes = {
  search:
    'bg-blue-400 rounded-3xl border-2 border-blue-400 focus:border-white-1000 outline-none pl-6',
  none: '',
};

type InputProps = {
  styleType?: InputStylesType;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input: FC<InputProps> = ({
  styleType = InputStylesType.NONE,
  className,
  ...props
}) => {
  return (
    <input
      {...props}
      className={twJoin(InputStylesTypes[styleType], className)}
    />
  );
};
