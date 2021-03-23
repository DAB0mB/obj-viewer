import React, { createContext } from 'react';

import Object from '../geometry/Object';
import { parseObj } from '../parsers';
import { useAsyncCallback, useObj } from '../utils';
import { StorageProvider, useLocalStorage } from './StorageContext';

export const ModelContext = createContext();

export const ModelProvider = ({ children, disableCache }) => {
  const context = useObj({
    disableCache,
  });

  return (
    <StorageProvider storageKey={base => `${base}:models`}>
      <ModelContext.Provider value={context}>
        {children}
      </ModelContext.Provider>
    </StorageProvider>
  );
};

export const useFetchModel = (modelPath) => {
  const localStorage = useLocalStorage();

  const fetchModel = useAsyncCallback(function* () {
    let str = localStorage.getItem(modelPath);

    if (str) {
      const { faces } = parseObj(str);

      return new Object(...faces);
    }

    const res = yield fetch(`/models/${modelPath}`);
    str = yield res.text();
    localStorage.setItem(modelPath, str);

    const { faces } = parseObj(str);

    return new Object(...faces);
  }, [localStorage]);

  return fetchModel;
};
