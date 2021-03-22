import React, { useRef } from 'react';
import styled from 'styled-components';

import Through from './components/helpers/Through';
import { ModelProvider, useFetchModel } from './contexts/ModelContext';
import { StorageProvider } from './contexts/StorageContext';
import Face from './geometry/Face';
import { useAsyncEffect } from './utils';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  `;

const Viewport = styled.div`
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

              const divs = obj.faces.map(vxs => new Face(...vxs).getView(100));

              for (let div of divs) {
                viewportRef.current.append(div);
              }
            }, []);

            return (
              <Container>
                <Viewport ref={viewportRef} />
              </Container>
            );
            /* eslint-enable react-hooks/rules-of-hooks */
          }}
        </Through>
      </ModelProvider>
    </StorageProvider>
  );
};

export default App;
