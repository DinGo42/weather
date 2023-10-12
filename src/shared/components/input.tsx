import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import { twJoin } from 'tailwind-merge';
export enum InputStylesTypes {
  SEARCH = 'bg-blue-400 rounded-3xl border-2 border-blue-400 focus:border-white-1000 outline-none pl-6',
  NONE = '',
}

type InputProps = {
  styleType?: keyof typeof InputStylesTypes;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input: FC<InputProps> = ({
  styleType = 'NONE',
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
