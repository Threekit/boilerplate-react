import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { launch } from '../../store/threekit';
import createStore from '../../store';

import { Provider } from 'react-redux';

import { ThemeProvider } from 'styled-components';
import theme from '../../theme';

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    (() => {
      const config = Object.assign(
        {
          assetId: props.assetId || process.env.THREEKIT_ASSET_ID,
          stageId: props.stageId || process.env.THREEKIT_STAGE_ID,
          orgId: props.orgId || process.env.THREEKIT_ORG_ID,
          authToken: props.authToken || process.env.THREEKIT_AUTH_TOKEN,
          threekitEnv: props.threekitEnv || process.env.THREEKIT_ENV,
          serverUrl: props.serverUrl || process.env.SERVER_URL,
        },
        props.config
      );
      dispatch(launch(config));
    })();
    return;
  }, []);

  return props?.children || null;
};

const ThreekitProvider = (props) => {
  const config = Object.assign(
    {
      theme: {},
      hooks: {},
    },
    props.config
  );
  return (
    <Provider store={createStore(props.reducers)}>
      <ThemeProvider theme={Object.assign(theme, config.theme)}>
        <App config={config}>{props.children}</App>
      </ThemeProvider>
    </Provider>
  );
};

export default ThreekitProvider;
