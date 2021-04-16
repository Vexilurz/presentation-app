import { configureStore, Action } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { AixmusicApi } from '../lib/aixmusic-api/AixmusicApi';

import rootReducer, { RootState } from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          api: AixmusicApi.getInstance(),
        },
      },
      serializableCheck: false,
    }),
});
// Save state between hot loads during development
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default;
    store.replaceReducer(newRootReducer);
  });
}

export type ThunkExtraArg = { api: AixmusicApi };

export type ThunkApi = {
  dispatch: AppDispatch,
  state: RootState,
  extra: ThunkExtraArg,
};

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store;
