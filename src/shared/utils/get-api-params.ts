import { ApiParamsTypes } from '../types';

export const getApiParams = <T extends ApiParamsTypes>(params: T[]) => {
  const apiParams = Object.fromEntries(
    params.map((param, index) => [param, index])
  ) as { [key in T]: number };

  return {
    apiParams,
    apiParamsKeys: Object.keys(apiParams),
  };
};
