import React, { createContext, useMemo, useContext } from 'react';

export const StorageContext = createContext('');

export const StorageProvider = ({ storageKey, children }) => {
  const superStorageKey = useStorageKey();
  storageKey = typeof storageKey == 'function' ? storageKey(superStorageKey) : storageKey;

  return (
    <StorageContext.Provider value={storageKey}>
      {children}
    </StorageContext.Provider>
  );
};

export const useStorageKey = () => {
  return useContext(StorageContext);
};

export const useStorage = (base) => {
  const storageKey = useStorageKey();

  const storage = useMemo(() => {
    return {
      getItem(key) {
        return base?.getItem(`${storageKey}:${key}`);
      },

      setItem(key, value) {
        return base?.setItem(`${storageKey}:${key}`, value);
      },

      hasItem(key) {
        return base?.hasItem(`${storageKey}:${key}`);
      },

      removeItem(key) {
        return base?.removeItem(`${storageKey}:${key}`);
      },
    };
  }, [base, storageKey]);

  return storage;
};

export const useLocalStorage = () => {
  return useStorage(localStorage);
};

export const useSessionStorage = () => {
  return useStorage(sessionStorage);
};
