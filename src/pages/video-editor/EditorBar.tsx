import {
  BottomNavigation,
  BottomNavigationAction,
  createStyles,
  makeStyles,
  Paper,
  Theme,
} from '@material-ui/core';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import StopIcon from '@material-ui/icons/Stop';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import DeleteIcon from '@material-ui/icons/Delete';
// @ts-ignore
import MicRecorder from 'mic-recorder-to-mp3';
import { AixmusicApi } from '../../lib/aixmusic-api/AixmusicApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { deleteSlideAudio, updateSlideAudio } from '../../redux/presentation/presentationThunks';
import { useAppDispatch } from '../../redux/store';
import { getAssetsUrl } from '../../lib/assests-helper';
import ReactAudioPlayer from 'react-audio-player';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });
const api = AixmusicApi.getInstance();

interface Props {
  audioUrl?: string;
  slideId: number;
}

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
      justifyContent: 'center',
    },
  })
);

export default function EditorBar(props: Props): ReactElement {
  const dispatch = useAppDispatch();
  const state = useSelector((state: RootState) => state.presentation);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [isRecording, setIsRecording] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  let audioEl = React.createRef<HTMLAudioElement>();

  useEffect(() => {
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log('Recording Permission Granted');
        setIsBlocked(false);
      },
      () => {
        console.log('Recording Permission Denied');
        setIsBlocked(true);
      }
    );
  }, []);

  const [recTimer, setRecTimer] = useState(0);
  const countRecRef = useRef(null);

  const startRec = () => {
    if (isBlocked) {
      console.log('Recording Permission Denied');
    } else {
      onDeleteClick();
      Mp3Recorder.start()
        .then(() => {
          setIsRecording(true);
          setRecTimer(0);
          // @ts-ignore
          countRecRef.current = setInterval(() => {
            setRecTimer((timer) => timer + 1)
          }, 1000)
        })
        .catch((e: any) => console.error(e));
    }
  };

  const stopRec = () => {
    Mp3Recorder.stop()
      .getMp3()
      // @ts-ignore
      .then(async ([buffer, blob]) => {
        // await api.updateSlideAudio(state.selectedSlideId, blob);
        dispatch(
          updateSlideAudio({ slideID: state.selectedSlideId, audio: blob })
        );
        // @ts-ignore
        clearInterval(countRecRef.current);
        setIsRecording(false);
      })
      .catch((e: any) => console.log(e));
  };

  const recIcon = isRecording ? <StopIcon /> : <FiberManualRecordIcon />;
  const recLabel = isRecording ? `${fmtMSS(recTimer.toFixed(0))}` : 'Record';
  const onRecClick = () => {
    if (isRecording) stopRec();
    else startRec();
  };  

  const [isPlayDisabled, setIsPlayDisabled] = useState(true);
  const [playing, setPlaying] = useState(false);
  const playIcon = playing ? <PauseIcon /> : <PlayArrowIcon />;

  const [playLabel, setPlayLabel] = useState(playing ? 'Pause' : 'Play');

  useEffect(()=>{
    setPlaying(false);
    setPlayLabel(!props.audioUrl ? 'No audio' : 'Play');
    setIsPlayDisabled(!props.audioUrl);
  },[props.audioUrl])

  const onPlayClick = () => {
    if (!playing && props.audioUrl) {
      setPlaying(true);
      setPlayLabel(audioEl.current?.currentTime.toString() as string);
      audioEl.current?.play();
    } else {
      setPlaying(false);
      audioEl.current?.pause();
    }
  };

  const onDeleteClick = async () => {
    // await api.deleteSlideAudio(props.slideId);
    await dispatch(deleteSlideAudio(props.slideId));
  };

  function fmtMSS(s: any) {
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;
  }

  const onListen = (time: number) => {
    setPlayLabel(
      `${fmtMSS(time.toFixed(0))}/${fmtMSS(
        audioEl.current?.duration.toFixed(0)
      )}`
    );
  };

  return (
    <Paper variant="outlined" className={classes.root}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels={true}
      >
        <BottomNavigationAction
          label={recLabel}
          icon={recIcon}
          onClick={onRecClick}
        />
        <BottomNavigationAction
          disabled={isPlayDisabled}
          label={playLabel}
          icon={playIcon}
          onClick={onPlayClick}
        />
        <BottomNavigationAction
          label="Delete"
          icon={<DeleteIcon />}
          onClick={onDeleteClick}
        />
      </BottomNavigation>
      <ReactAudioPlayer
        src={getAssetsUrl(props.audioUrl as string)}
        controls
        ref={(element) => {
          audioEl = element?.audioEl as React.RefObject<HTMLAudioElement>;
        }}
        listenInterval={100}
        onListen={onListen}
        onEnded={() => {
          setPlaying(false)
          setPlayLabel('Play')
        }}
        style={{ display: 'none' }}
      />
    </Paper>
  );
}
