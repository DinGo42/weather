import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from 'react';

export enum ButtonStylesTypes {
  SEARCH = 'bg-blue-400 rounded-3xl',
  NONE = '',
}

type ButtonProps = {
  children?: ReactNode;
  styleType?: keyof typeof ButtonStylesTypes;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button: FC<ButtonProps> = ({
  children,
  styleType = 'NONE',
  ...props
}) => {
  return <button {...props}>{children}</button>;
};
