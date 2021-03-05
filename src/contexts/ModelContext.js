import React, { createContext } from 'react';

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
      return parseObj(str);
    }

    const res = yield fetch(`/models/${modelPath}`);
    str = yield res.text();
    localStorage.setItem(modelPath, str);

    return parseObj(str);
  }, [localStorage]);

  return fetchModel;
};
