import { ApiParamsTypes } from '../types';

export const getApiParams = (params: ApiParamsTypes[]) => {
  const apiParams = Object.fromEntries(
    params.map((param, index) => [param, index])
  ) as { [key in (typeof params)[number]]: number };

  return {
    apiParams,
    apiParamsKeys: Object.keys(apiParams),
  };
};
