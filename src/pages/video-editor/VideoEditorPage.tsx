import {
  Container,
  createStyles,
  Grid,
  makeStyles,
  Theme,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getPresentation } from '../../redux/presentation/presentationThunks';
import { RootState } from '../../redux/rootReducer';
import { useAppDispatch } from '../../redux/store';
import Paper from '@material-ui/core/Paper';

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
    },
    grid: {
      height: '100%',
    },
    sidebar: {
      height: '100%',
      backgroundColor: theme.palette.primary.light,
    },
  })
);

export const VideoEditorPage = (props: Props) => {
  const url = 'test';
  const state = useSelector((state: RootState) => state.presentation);
  const dispatch = useAppDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getPresentation(url));
  }, []);

  return (
    <div className={classes.root}>
      <Grid container className={classes.grid}>
        <Grid item md={3} className={classes.sidebar}></Grid>
        <Grid item md={9}></Grid>
      </Grid>
    </div>
  );
};
