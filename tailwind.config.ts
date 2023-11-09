import type { Config } from 'tailwindcss';

enum COLORS_ENUM {
  WHITE_1000 = 'white-1000',
  BLUE_800 = 'blue-800',
  BLUE_600 = 'blue-600',
  BLUE_500 = 'blue-500',
  BLUE_450 = 'blue-450',
  BLUE_400 = 'blue-400',
  BLUE_350 = 'blue-350',
  RED_1000 = 'red-1000',
  BLACK_200 = 'black-200',
}

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      [COLORS_ENUM.BLUE_800]: '#070335',
      [COLORS_ENUM.BLUE_600]: '#0A063C',
      [COLORS_ENUM.BLUE_500]: '#17115F',
      [COLORS_ENUM.BLUE_450]: '#252159',
      [COLORS_ENUM.BLUE_400]: '#2E249F',
      [COLORS_ENUM.BLUE_350]: '#3127A4',
      [COLORS_ENUM.WHITE_1000]: '#fff',
      [COLORS_ENUM.RED_1000]: '#FF0000',
      [COLORS_ENUM.BLACK_200]: '#2D2955',
    },
    screens: {
      phoneS: '320px',
      phoneSPlus: '375px',
      phoneM: '480px',
      tabletS: '768px',
      tabletM: '1024px',
      dectopS: '1280px',
      dectopM: '1440px',
      dectopL: '1920px',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
