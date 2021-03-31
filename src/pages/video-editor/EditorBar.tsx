import {
  BottomNavigation,
  BottomNavigationAction,
  createStyles,
  makeStyles,
  Paper,
  Theme,
} from '@material-ui/core';
import React, { ReactElement, useEffect, useState } from 'react';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import StopIcon from '@material-ui/icons/Stop';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import DeleteIcon from '@material-ui/icons/Delete';
// @ts-ignore
import MicRecorder from 'mic-recorder-to-mp3';
import { AixmusicApi } from '../../lib/aixmusic-api/AixmusicApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });
const api = AixmusicApi.getInstance();

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '70px',
      width: '350px',
      backgroundColor: theme.palette.common.white,
      position: 'fixed',
      left: '50%',
      bottom: '20px',
      display: 'flex',
      flexDirection: 'column',
      allignItems: 'center',
      justifyContent: 'center'
    },
  })
);

export default function EditorBar(props: Props): ReactElement {
  const state = useSelector((state: RootState) => state.presentation);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [isRecording, setIsRecording] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log('Permission Granted');
        setIsBlocked(false);
      },
      () => {
        console.log('Permission Denied');
        setIsBlocked(true);
      }
    );
  }, []);

  const startRec = () => {
    if (isBlocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder.start()
        .then(() => {
          setIsRecording(true);
        })
        .catch((e: any) => console.error(e));
    }
  };

  const stopRec = () => {
    Mp3Recorder.stop()
      .getMp3()
      // @ts-ignore
      .then(async ([buffer, blob]) => {
        await api.updateSlideAudio(state.selectedSlide.id, blob);
        setIsRecording(false);
      })
      .catch((e: any) => console.log(e));
  };

  const recIcon = isRecording ? <StopIcon /> : <FiberManualRecordIcon />;
  const recLabel = isRecording ? "Stop" : "Record";
  const onRecClick = () => {
    if (isRecording) 
      stopRec(); 
    else 
      startRec();
  }

  return (
    <Paper variant="outlined" className={classes.root}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          console.log(newValue)
        }}
      
      >
        <BottomNavigationAction 
          label={recLabel} 
          icon={recIcon} 
          onClick={onRecClick}
        />
        <BottomNavigationAction 
          label="Play" 
          icon={<PlayArrowIcon />} 
        />
        <BottomNavigationAction 
          label="Delete" 
          icon={<DeleteIcon />} 
        />
      </BottomNavigation>
    </Paper>
  );
}
