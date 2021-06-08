import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { getAssetsUrl } from '../../lib/assests-helper';

interface Props {
  src?: string | undefined;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    slideImageContainer: {
      height: 'calc(100% - 64px)',
      backgroundColor: theme.palette.grey[100],
      display: 'flex',
      justifyContent: 'center',
      [theme.breakpoints.down('xs')]: {
        maxWidth: '100% ',
      },
    },
    slideImage: {
      margin: '30px 0',
      display: 'block',
      height: '90%',
      [theme.breakpoints.down('xs')]: {
        maxWidth: '100% ',
      },
    },
    message: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
);

function SlideImg({ src }: Props): ReactElement {
  const classes = useStyles();
  const state = useSelector((state: RootState) => state.presentation);

  return (
    <div className={classes.slideImageContainer}>
      {state.selectedSlideId ? (
        <img src={getAssetsUrl(src)} alt="" className={classes.slideImage} />
      ) : null}
    </div>
  );
}

export default SlideImg;
