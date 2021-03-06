import React, { useRef } from 'react';
import styled from 'styled-components';

import Through from './components/helpers/Through';
import { ModelProvider, useFetchModel } from './contexts/ModelContext';
import { StorageProvider } from './contexts/StorageContext';
import { useAsyncEffect } from './utils';

const Viewport = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const App = () => {
  return (
    <StorageProvider storageKey='objViewer'>
      <ModelProvider>
        <Through>
          {() => {
            /* eslint-disable react-hooks/rules-of-hooks */
            const fetchModel = useFetchModel('teapot.obj');
            const viewportRef = useRef();

            useAsyncEffect(function* () {
              const obj = yield fetchModel();

              console.log(obj);
            }, []);

            return (
              <Viewport ref={viewportRef} />
            );
            /* eslint-enable react-hooks/rules-of-hooks */
          }}
        </Through>
      </ModelProvider>
    </StorageProvider>
  );
};

export default App;
