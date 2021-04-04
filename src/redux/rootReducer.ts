import { combineReducers } from '@reduxjs/toolkit';
import presentation from './presentation/presentationSlice';
import player from './player/playerSlice';

const rootReducer = combineReducers({
  presentation,
  player
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
