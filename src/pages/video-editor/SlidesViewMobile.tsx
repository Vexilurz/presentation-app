import {
  CircularProgress,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getPresentation } from '../../redux/presentation/presentationThunks';
import { RootState } from '../../redux/rootReducer';
import { useAppDispatch } from '../../redux/store';
import { SlidePreview } from './SlidePreview';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '55px',
      height: '90%',
      width: '100%',
      backgroundColor: 'grey',
      display: 'flex',
      alignItems: 'center',
      overflowX: 'scroll',
    },
  })
);

interface Props {
  presentationUrl: string;
}

export const SlidesViewMobile = (props: Props) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const state = useSelector((state: RootState) => state.presentation);
  const classes = useStyles();
  useEffect(() => {
    dispatch(getPresentation(props.presentationUrl));
  }, [history]);

  return (
    <div className={classes.root}>
      {state.status === 'loading' ? (
        <CircularProgress color="secondary" />
      ) : (
        <>
          {state.presentation.slides.map((item) => (
            <SlidePreview slide={item} key={item.id} />
          ))}
        </>
      )}
    </div>
  );
};
