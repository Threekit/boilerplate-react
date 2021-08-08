import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import threekit from './threekit';

const createStore = (reducers) =>
  configureStore({
    reducer: Object.assign(
      {},
      {
        threekit,
      },
      reducers
    ),
    middleware: getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
  });

export default createStore;
