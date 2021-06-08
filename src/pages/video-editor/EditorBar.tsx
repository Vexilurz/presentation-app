import {
  BottomNavigation,
  BottomNavigationAction,
  CircularProgress,
  createStyles,
  makeStyles,
  Menu,
  MenuItem,
  Paper,
  Theme,
} from '@material-ui/core';
import React, { ReactElement, useEffect, useState } from 'react';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import StopIcon from '@material-ui/icons/Stop';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
// @ts-ignore
import MicRecorder from 'mic-recorder-to-mp3';
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
import { notify } from '../../redux/notification/notificationSlice';
import {
  setIsRecording,
  startSlideAudioProcessing,
} from '../../redux/presentation/presentationSlice';

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
      position: 'relative',
      left: 'calc(50% - 350px / 2)',
      bottom: '100px',
      display: 'flex',
      flexDirection: 'column',
      allignItems: 'center',
      justifyContent: 'center',
      [theme.breakpoints.down('xs')]: {
        left: '0',
        bottom: '0',
        width: '99%',
      },
    },
  })
);

export default function EditorBar(props: Props): ReactElement {
  const dispatch = useAppDispatch();
  const state = useSelector((state: RootState) => state.presentation);
  const classes = useStyles();

  function fmtMSS(s: any) {
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;
  }

  // *** Recording ***

  const [isRecording, setIsRecordings] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [recTimer, setRecTimer] = useState(0);

  const getNewRecKey = (): string => {
    return new Date().toISOString();
  };
  const [recKey, setRecKey] = useState(getNewRecKey());

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
      dispatch(setIsRecording(true));
      await Mp3Recorder.start();
      setIsRecordings(true);
      setRecTimer(0);
      countRecTimer = setInterval(() => {
        setRecTimer((timer) => timer + 1);
      }, 1000);
    }
  };

  const stopRec = async () => {
    dispatch(startSlideAudioProcessing());
    const [buffer, blob] = await Mp3Recorder.stop().getMp3();
    const metadata = await mm.parseBlob(blob);
    await dispatch(deleteSlideAudio(props.slideId));
    await dispatch(
      updateSlideAudio({
        id: state.selectedSlideId,
        audio: blob,
        duration: metadata.format.duration as number,
      })
    );
    clearInterval(countRecTimer);
    setIsRecordings(false);
    setRecKey(getNewRecKey());
    dispatch(setIsRecording(false));
  };

  const recIcon = isRecording ? (
    <FiberManualRecordIcon style={{ color: '#f44336' }} />
  ) : (
    <FiberManualRecordIcon />
  );
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
  };
  const handleDeleteRecord = async () => {
    handleMenuClose();
    await dispatch(deleteSlideAudio(state.selectedSlideId));
    dispatch(notify({ text: 'Slide audio record deleted!', severity: 'info' }));
  };

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
          label={state.slideAudioProcessing === 'loading' ? null : recLabel}
          icon={
            state.slideAudioProcessing === 'loading' ? (
              <CircularProgress color="secondary" />
            ) : (
              recIcon
            )
          }
          onClick={onRecClick}
        />
        <BottomNavigationAction
          disabled={isPlayDisabled}
          label={playLabel}
          icon={playIcon}
          onClick={onPlayClick}
        />
        {state.selectedSlideId ? (
          <BottomNavigationAction
            icon={<MoreHorizIcon />}
            label="More"
            onClick={handleMenuClick}
          />
        ) : null}
        {state.selectedSlideId ? (
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleDeleteSlide}>Delete slide</MenuItem>
            <MenuItem onClick={handleDeleteRecord}>
              Delete audio record
            </MenuItem>
          </Menu>
        ) : null}
      </BottomNavigation>
      {props.audioUrl && props.audioUrl?.length > 0 ? (
        <ReactAudioPlayer
          id={recKey}
          key={recKey}
          src={getAssetsUrl(props.audioUrl as string) + `?key=${recKey}`}
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
