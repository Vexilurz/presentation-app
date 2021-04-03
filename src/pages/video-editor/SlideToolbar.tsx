import {
  AppBar,
  Button,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { deleteSlide } from '../../redux/presentation/presentationThunks';

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.grey[50],
    },
    title: {
      flexGrow: 1,
    },
    button: {
      margin: theme.spacing(1),
    },
  })
);

export const SlideToolbar = (props: Props) => {
  const state = useSelector((state: RootState) => state.presentation);
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <Toolbar className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        {state.presentation.title}
      </Typography>
      <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<CloudUploadIcon />}
      >
        Upload
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon />}
        onClick={() => dispatch(deleteSlide(state.selectedSlideId))}
      >
        Delete
      </Button>
    </Toolbar>
  );
};
