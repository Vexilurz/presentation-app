import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { getAssetsUrl } from '../../lib/assests-helper';

interface Props {
  src?: string | undefined;
}

const uploadsUrl = process.env.REACT_APP_UPLOADS_URL as string;

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
        <img
          src={getAssetsUrl(src)}
          alt=""
          className={classes.slideImage}
        />
      ) : (
        null
      )}
    </div>
  );
}

export default SlideImg;
