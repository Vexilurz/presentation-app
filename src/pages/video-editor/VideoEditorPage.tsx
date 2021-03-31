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

const uploadsUrl = process.env.REACT_APP_UPLOADS_URL as string;


interface Props {}

interface ParamTypes {
  presentationUrl: string;
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
      maxHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.palette.primary.light,
      whiteSpace: 'normal',
      wordBreak: 'break-all',
    },
    workspace: {
      overflowY: 'scroll',
      height: '100%',
    },
  })
);

export const VideoEditorPage = (props: Props) => {
  const url = 'test';
  const dispatch = useAppDispatch();
  const history = useHistory();
  const classes = useStyles();
  const state = useSelector((state: RootState) => state.presentation);

  let { presentationUrl } = useParams<ParamTypes>();

  return (
    <div className={classes.root}>
      <Grid container className={classes.grid}>
        <Grid item md={3} className={classes.sidebar}>
          <SlidesView presentationUrl={presentationUrl} />
          <SlidesViewBottomRow presentationUrl={presentationUrl} />
        </Grid>
        <Grid item md={9} className={classes.workspace}>
          {`Selected slide ID: ${state.selectedSlide.id}`}
          <button
            onClick={() => {
              dispatch(deleteSlide(state.selectedSlide.id));
            }}
          >
            Delete
          </button>
          {/* <button onClick={()=>{
            history.push(`/editor/${presentationUrl}`);            
          }}>
            test
          </button> */}
          {/* <br></br>
          <button onClick={startRec} disabled={isRecording}>
            Record
          </button>
          <button onClick={stopRec} disabled={!isRecording}>
            Stop
          </button>
          <audio
            src={`${uploadsUrl}${state.selectedSlide.audio}`}
            controls={true}
          />
          <br></br> */}
          <img src={`${uploadsUrl}${state.selectedSlide.image}`} />
          <br></br>
          <EditorBar />
        </Grid>
      </Grid>
    </div>
  );
};
