import { combineReducers } from '@reduxjs/toolkit';
import presentation from './presentation/presentationSlice';

const rootReducer = combineReducers({
  presentation,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
