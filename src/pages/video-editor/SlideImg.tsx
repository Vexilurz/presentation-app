import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';

interface Props {
  src?: string;
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
  })
);

function SlideImg({ src }: Props): ReactElement {
  const classes = useStyles();
  const state = useSelector((state: RootState) => state.presentation);

  return (
    <div className={classes.slideImageContainer}>
      {state.selectedSlideId ? (
        <img
          src={`${uploadsUrl}${src}`}
          alt=""
          className={classes.slideImage}
        />
      ) : (
        <Typography variant="h6">Please select slide</Typography>
      )}
    </div>
  );
}

export default SlideImg;
