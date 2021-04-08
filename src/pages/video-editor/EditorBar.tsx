import {
  BottomNavigation,
  BottomNavigationAction,
  createStyles,
  makeStyles,
  Menu,
  MenuItem,
  Paper,
  Theme,
} from '@material-ui/core';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import StopIcon from '@material-ui/icons/Stop';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
// @ts-ignore
import MicRecorder from 'mic-recorder-to-mp3';
import { AixmusicApi } from '../../lib/aixmusic-api/AixmusicApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import {
  deleteSlide,
  deleteSlideAudio,
  updateSlideAudio,
} from '../../redux/presentation/presentationThunks';
import { useAppDispatch } from '../../redux/store';
import { getAssetsUrl } from '../../lib/assests-helper';
import ReactAudioPlayer from 'react-audio-player';
import * as mm from 'music-metadata-browser';

const Mp3Recorder = new MicRecorder({ bitRate: 96 });
let countRecTimer: NodeJS.Timeout;
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
      left: '47%',
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

  function fmtMSS(s: any) {
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;
  }

  // *** Recording ***

  const [isRecording, setIsRecording] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [recTimer, setRecTimer] = useState(0);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        console.log('Recording Permission Granted');
        setIsBlocked(false);
      })
      .catch(() => {
        console.log('Recording Permission Denied');
        setIsBlocked(true);
      });
  }, []);

  const startRec = async () => {
    if (isBlocked) {
      console.log('Recording Permission Denied');
    } else {
      await dispatch(deleteSlideAudio(props.slideId));
      await Mp3Recorder.start();
      setIsRecording(true);
      setRecTimer(0);
      countRecTimer = setInterval(() => {
        setRecTimer((timer) => timer + 1);
      }, 1000);
    }
  };

  const stopRec = async () => {
    const [buffer, blob] = await Mp3Recorder.stop().getMp3();
    const metadata = await mm.parseBlob(blob);
    await dispatch(
      updateSlideAudio({
        slideID: state.selectedSlideId,
        audio: blob,
        duration: metadata.format.duration as number,
      })
    );
    clearInterval(countRecTimer);
    setIsRecording(false);
  };

  const recIcon = isRecording ? <StopIcon /> : <FiberManualRecordIcon />;
  const recLabel = isRecording ? `${fmtMSS(recTimer.toFixed(0))}` : 'Record';
  const onRecClick = () => {
    if (isRecording) stopRec();
    else startRec();
  };

  // *** Playing ***

  let audioEl = React.createRef<HTMLAudioElement>();

  const [isPlayDisabled, setIsPlayDisabled] = useState(true);
  const [playing, setPlaying] = useState(false);
  const playIcon = playing ? <PauseIcon /> : <PlayArrowIcon />;

  const [playLabel, setPlayLabel] = useState(playing ? 'Pause' : 'Play');

  useEffect(() => {
    setPlaying(false);
    setPlayLabel(!props.audioUrl ? 'No audio' : 'Play');
    setIsPlayDisabled(!props.audioUrl);
  }, [props.audioUrl]);

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

  const onListen = (time: number) => {
    setPlayLabel(
      `${fmtMSS(time.toFixed(0))}/${fmtMSS(
        audioEl.current?.duration.toFixed(0)
      )}`
    );
  };

  // *** Menu ***

  const [anchorEl, setAnchorEl] = useState(null);
  // @ts-ignore
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleDeleteSlide = () => {
    handleMenuClose();
    dispatch(deleteSlide(state.selectedSlideId));
  }
  const handleDeleteRecord = async () => {
    handleMenuClose();
    await dispatch(deleteSlideAudio(state.selectedSlideId));
    alert('Slide audio record deleted!');
  }

  return (
    <Paper variant="outlined" className={classes.root}>
      <BottomNavigation
        // value={value}
        // onChange={(event, newValue) => {
        //   setValue(newValue);
        // }}
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
        {state.selectedSlide?.id ? (
          <BottomNavigationAction
            icon={<MoreHorizIcon />}
            onClick={handleMenuClick}
          />
        ) : null}  
        {state.selectedSlide?.id ? (  
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleDeleteSlide}>Delete slide</MenuItem>
            <MenuItem onClick={handleDeleteRecord}>Delete audio record</MenuItem>
          </Menu>
        ) : null}
      </BottomNavigation>
      {props.audioUrl && props.audioUrl?.length > 0 ? (
        <ReactAudioPlayer
          src={getAssetsUrl(props.audioUrl as string)}
          controls
          ref={(element) => {
            audioEl = element?.audioEl as React.RefObject<HTMLAudioElement>;
          }}
          listenInterval={100}
          onListen={onListen}
          onEnded={() => {
            setPlaying(false);
            setPlayLabel('Play');
          }}
          style={{ display: 'none' }}
        />
      ) : null}
    </Paper>
  );
}
