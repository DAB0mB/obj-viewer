import { useMemo } from 'react';

export * from 'react-async-core-hooks';

export const useObj = (obj) => {
  return useMemo(() => {
    return obj;
  }, Object.values(obj));
};
