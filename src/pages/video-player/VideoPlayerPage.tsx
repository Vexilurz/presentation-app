import classes from '*.module.css';
import { Container, createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },

    player: {
      height: '80%',
      width: '100%',
      backgroundColor: theme.palette.common.black,
    },
  })
);

export const VideoPlayerPage = (props: Props) => {
  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.root}>
      <div className={classes.player}></div>
    </Container>
  );
};
