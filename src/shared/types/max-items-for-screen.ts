export enum screenTypes {
  PHONE_S = 'phoneS',
  PHONE_S_PLUS = 'phoneSPlus',
  PHONE_M = 'phoneM',
  TABLET_S = 'tabletS',
  TABLET_M = 'tabletM',
  DECTOP_S = 'dectopS',
  DECTOP_M = 'dectopM',
}
export type maxItemsForScreen = {
  [value in screenTypes]: number;
};
