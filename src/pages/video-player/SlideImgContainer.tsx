import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';

interface Props {
  src: string;
  isOverlayShowed: boolean;
  playing: boolean;
  setPlaying: (playing: boolean) => void;
}

const useStyles = (props: { isOverlayShowed: boolean }) =>
  makeStyles((theme: Theme) =>
    createStyles({
      slideImageContainer: {
        height: props.isOverlayShowed ? '100%' : 'calc(100% - 64px)',
        backgroundColor: theme.palette.grey[100],
      },
      slideImage: {
        height: '100%',
        display: 'block',
        margin: '0 auto',
      },
    })
  );

export const SlideImgContainer = ({
  src,
  isOverlayShowed,
  playing,
  setPlaying,
}: Props) => {
  const classes = useStyles({ isOverlayShowed })();
  return (
    <div
      className={classes.slideImageContainer}
      onClick={() => {
        setPlaying(!playing);
      }}
    >
      <img className={classes.slideImage} src={src} alt="" />
    </div>
  );
};
