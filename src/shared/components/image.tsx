import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { FC } from 'react';

type ImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
} & Omit<NextImageProps, 'alt'>;

export const Image: FC<ImageProps> = ({
  src,
  alt,
  width = 24,
  height = 24,
  ...props
}) => {
  return (
    <NextImage src={src} alt={alt} width={width} height={height} {...props} />
  );
};
