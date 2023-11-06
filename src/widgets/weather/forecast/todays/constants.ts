import { maxItemsForScreen } from '@weather/shared';

export const listGap = 12 as const;

export const maxListItemsForScreen: maxItemsForScreen = {
  phoneS: 3,
  phoneSPlus: 4,
  phoneM: 6,
  tabletS: 8,
  tabletM: 10,
  dectopS: 6,
  dectopM: 7,
} as const;
