import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';

interface Props {
  src: string;
  isOverlayShowed: boolean;
}

const useStyles = (props: { isOverlayShowed: boolean }) =>
  makeStyles((theme: Theme) =>
    createStyles({
      slideImageContainer: {
        height: props.isOverlayShowed ? '100%' : 'calc(100% - 92px)',
        backgroundColor: theme.palette.grey[100],
      },
      slideImage: {
        height: '100%',
        display: 'block',
        margin: '0 auto',
      },
    })
  );

export const SlideImgContainer = ({ src, isOverlayShowed }: Props) => {
  const classes = useStyles({ isOverlayShowed })();
  return (
    <div className={classes.slideImageContainer}>
      <img className={classes.slideImage} src={src} alt="" />
    </div>
  );
};
