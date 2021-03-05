import React from 'react';

import Through from './components/helpers/Through';
import { ModelProvider, useFetchModel } from './contexts/ModelContext';
import { StorageProvider } from './contexts/StorageContext';
import { useAsyncEffect } from './utils';

const App = () => {
  return (
    <StorageProvider storageKey='objViewer'>
      <ModelProvider>
        <Through>
          {() => {
            /* eslint-disable react-hooks/rules-of-hooks */
            const fetchModel = useFetchModel('teapot.obj');

            useAsyncEffect(function* () {
              const obj = yield fetchModel();

              console.log(obj);
            }, []);

            return null;
            /* eslint-enable react-hooks/rules-of-hooks */
          }}
        </Through>
      </ModelProvider>
    </StorageProvider>
  );
};

export default App;
