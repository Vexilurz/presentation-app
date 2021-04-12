import {
  CircularProgress,
  Container,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  deleteSlide,
  getPresentation,
} from '../../redux/presentation/presentationThunks';
import { RootState } from '../../redux/rootReducer';
import store, { useAppDispatch } from '../../redux/store';
import Paper from '@material-ui/core/Paper';
import { useHistory, useParams } from 'react-router-dom';
import { SlidesView } from './SlidesView';
import EditorBar from './EditorBar';
import { SlidesViewBottomRow } from './SlidesViewBottomRow';
import { ISlideResponse } from '../../types/AixmusicApiTypes';
import { SlideToolbar } from './SlideToolbar';
import SlideImg from './SlideImg';
import { AixmusicApi } from '../../lib/aixmusic-api/AixmusicApi';
import { AddFromPdfButton } from './AddFromPdfButton';

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
    message: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
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
          {state.presentation.id ? 
            <Grid item md={10} className={classes.workspace}>
              <SlideToolbar />
              {state.isBusy?.value ? 
                <div className={classes.message}>
                  <CircularProgress color="secondary" style={{margin:10}}/>
                  <Typography variant="h6">
                    Importing presentation...
                  </Typography>                  
                </div> : 
                state.presentation.slides?.length > 0 ?
                <SlideImg src={selectedSlide?.image} /> :
                <div className={classes.message}>
                  <Typography variant="h6">Please select a presentation for upload</Typography>
                  <AddFromPdfButton 
                    presentationUrl={presentationUrl}
                  />
                </div>
              }
            </Grid> :
            <Grid item md={10} className={classes.workspace}>
              <Typography variant="h6">Please select a presentation (project) url</Typography>
            </Grid>
          }
        {state.selectedSlideId ? (
          <EditorBar
            audioUrl={selectedSlide?.audio}
            slideId={state.selectedSlideId}
          />
        ) : null}
      </Grid>
    </div>
  );
};
