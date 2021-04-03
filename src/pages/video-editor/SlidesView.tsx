import {
  CircularProgress,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PdfReader from '../../lib/pdf/PdfReader';
import { getPresentation } from '../../redux/presentation/presentationThunks';
import { RootState } from '../../redux/rootReducer';
import { useAppDispatch } from '../../redux/store';
import { SlidePreview } from './SlidePreview';

interface Props {
  presentationUrl: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      overflowY: 'scroll',
      maxHeight: 'calc(100% - 50px)',
      padding: '5px 0',
      display: 'flex',
      flexDirection: 'column',
      justifyItems: 'center',
      alignItems: 'center',
    },
  })
);

export const SlidesView = (props: Props) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const state = useSelector((state: RootState) => state.presentation);
  const classes = useStyles();
  useEffect(() => {
    dispatch(getPresentation(props.presentationUrl));
  }, [history]);

  const slidePreviewArray = state.presentation.slides?.map((slide) => (
    <SlidePreview slide={slide} key={slide.id} />
  ));

  return (
    <div className={classes.root}>
      {state.status === 'loading' ? (
        <CircularProgress color="secondary" />
      ) : (
        slidePreviewArray
      )}
    </div>
  );
};
