import {
  Container,
  createStyles,
  Grid,
  makeStyles,
  Theme,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  deleteSlide,
  getPresentation,
} from '../../redux/presentation/presentationThunks';
import { RootState } from '../../redux/rootReducer';
import { useAppDispatch } from '../../redux/store';
import Paper from '@material-ui/core/Paper';
import { useHistory, useParams } from 'react-router-dom';
import { SlidesView } from './SlidesView';
import EditorBar from './EditorBar';
import { SlidesViewBottomRow } from './SlidesViewBottomRow';
import { ISlideResponse } from '../../types/AixmusicApiTypes';
import { SlideToolbar } from './SlideToolbar';
import SlideImg from './SlideImg';
import { AixmusicApi } from '../../lib/aixmusic-api/AixmusicApi';

interface Props {}

interface ParamTypes {
  presentationUrl: string;
  token: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
    },
    grid: {
      height: '100%',
    },
    sidebar: {
      zIndex: 1,
      maxHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.palette.primary.light,
      whiteSpace: 'normal',
      wordBreak: 'break-all',
    },
    workspace: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
  })
);

export const VideoEditorPage = (props: Props) => {
  const classes = useStyles();
  const state = useSelector((state: RootState) => state.presentation);

  let selectedSlide:
    | ISlideResponse
    | undefined = state.presentation.slides?.find(
    (slide) => slide.id === state.selectedSlideId
  );

  let { presentationUrl, token } = useParams<ParamTypes>();

  useEffect(() => {
    const api = AixmusicApi.getInstance();
    api.setToken(token);
    selectedSlide = state.presentation.slides?.find(
      (slide) => slide.id === state.selectedSlideId
    );


  }, [state.presentation.slides]);



  return (
    <div className={classes.root}>
      <Grid container className={classes.grid}>
        <Grid item md={2} className={classes.sidebar}>
          <SlidesView presentationUrl={presentationUrl} />
          <SlidesViewBottomRow presentationUrl={presentationUrl} />
        </Grid>
        <Grid item md={10} className={classes.workspace}>
          {state.presentation.id ? (
            <>
              <SlideToolbar />
              <SlideImg src={selectedSlide?.image} />
            </>
          ) : null}
        </Grid>
        {state.selectedSlide?.id ? (
          <EditorBar
            audioUrl={selectedSlide?.audio}
            slideId={state.selectedSlideId}
          />
        ) : null}
      </Grid>
    </div>
  );
};
