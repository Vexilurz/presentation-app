import { Color } from '@material-ui/lab/Alert';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
  open: boolean;
  text?: string;
  severity?: Color;
}

interface NotifyPayload {
  text: string;
  severity: Color;
}

const initialState: NotificationState = {
  open: false,
};

const NotificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notify(state, action: PayloadAction<NotifyPayload>) {
      const { payload } = action;
      state.open = true;
      state.text = payload.text; 
      state.severity = payload.severity;
    },
    hideNotification(state) {
      state.open = false;
    },
  },
});

export const { notify, hideNotification } = NotificationSlice.actions;

export default NotificationSlice.reducer;
