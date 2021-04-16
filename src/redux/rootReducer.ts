import { combineReducers } from '@reduxjs/toolkit';
import presentation from './presentation/presentationSlice';
import player from './player/playerSlice';
import notification from './notification/notificationSlice';

const rootReducer = combineReducers({
  presentation,
  player,
  notification
});


export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
