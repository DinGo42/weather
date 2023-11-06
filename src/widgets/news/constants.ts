import { maxItemsForScreen } from '@weather/shared';

export const newsListGap = 16 as const;

export const maxListItemsForScreen: maxItemsForScreen = {
  phoneS: 1,
  phoneSPlus: 1,
  phoneM: 2,
  tabletS: 3,
  tabletM: 4,
  dectopS: 3,
  dectopM: 4,
} as const;
