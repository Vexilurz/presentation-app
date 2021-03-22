import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  // place your reducers here
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
