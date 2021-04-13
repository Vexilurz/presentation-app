import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';

interface Props {
  src: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    slideImageContainer: {
      height: 'calc(100% - 64px)',
      backgroundColor: theme.palette.grey[100],
      display: 'flex',
      justifyContent: 'center',
    },
    slideImage: {
      margin: '30px 0',
    },
  })
);

export const SlideImgContainer = ({ src }: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.slideImageContainer}>
      <img src={src} alt="" />
    </div>
  );
};
