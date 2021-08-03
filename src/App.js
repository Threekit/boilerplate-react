import React from 'react';
import { TwoCol, Form, Player } from 'threekit/components';

const App = () => {
  return (
    <TwoCol leftSize="auto" rightSize="400px" width="1200px">
      <div>
        <Player />
      </div>
      <div>
        <Form />
      </div>
    </TwoCol>
  );
};

export default App;
