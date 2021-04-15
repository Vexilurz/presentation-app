import React from 'react';
import { Snackbar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { hideNotification } from '../../redux/notification/notificationSlice';
import MuiAlert from '@material-ui/lab/Alert';
import { ReactElement } from 'react';

interface Props {}

export default function Notification(props: Props): ReactElement {
  const state = useSelector((state: RootState) => state.notification);
  const dispatch = useDispatch();

  const autoHideDuration = 3000;

  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(hideNotification());
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={state.open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
    >
      <MuiAlert onClose={handleClose} severity={state.severity} variant="filled">
        {state.text}
      </MuiAlert>
    </Snackbar>
  );
};
