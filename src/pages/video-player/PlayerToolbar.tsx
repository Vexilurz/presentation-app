import React, { useEffect, useState } from 'react';
import {
  createStyles,
  IconButton,
  makeStyles,
  Slider,
  Theme,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import VolumeUp from '@material-ui/icons/VolumeUp';
import Fullscreen from '@material-ui/icons/Fullscreen';

interface Props {
  currentTime: number;
  totalTime: number;
  setCurrentTime: (time: number) => void;
  playing: boolean;
  setPlaying: (playing: boolean) => void;
  volumeValue: number;
  setVolumeValue: (volume: number) => void;
  fullScreen: boolean;
  setFullScreen: (fullScreen: boolean) => void;
  whileLabel?: string;
}

function fmtMSS(s: any) {
  return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.grey[50],
      display: 'flex',
      flexDirection: 'column',
    },
    slider: {
      display: 'block',
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
    },
    volumeIcon: {
      marginLeft: theme.spacing(1),
      fontSize: '25px',
      color: theme.palette.grey[600],
    },
    volumeSlider: {
      width: '150px',
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(3),
    },
    buttonsRow: {
      width: '100%',
      height: '15px',
      display: 'flex',
      alignItems: 'center',
      paddingBottom: theme.spacing(1),
    },
    whiteLabelContainer: {
      padding: theme.spacing(1),
      marginLeft: 'auto',
    },
  })
);

const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 4,
  },
  thumb: {
    display: 'none',
  },
  active: {},
  track: {
    height: 4,
    borderRadius: 4,
  },
  rail: {
    height: 4,
    borderRadius: 4,
  },
})(Slider);

export const PlayerToolbar = ({
  currentTime,
  setCurrentTime,
  playing,
  setPlaying,
  totalTime,
  volumeValue,
  setVolumeValue,
  fullScreen,
  setFullScreen,
  whileLabel,
}: Props) => {
  const classes = useStyles();
  const playIcon = playing ? (
    <PauseIcon/>
  ) : (
    <PlayArrowIcon/>
  );
  const [progress, setProgress] = useState(0);
  const [isDND, setIsDND] = useState(false);

  useEffect(() => {
    if (!isDND) setProgress((currentTime / totalTime) * 100);
  }, [currentTime, totalTime, isDND]);

  return (
    <Toolbar className={classes.root}>
      <PrettoSlider
        className={classes.slider}
        value={progress}
        onChange={(event: any, newValue: number | number[]) => {
          setIsDND(true);
          setProgress(newValue as number);
        }}
        onChangeCommitted={(event: any, newValue: number | number[]) => {
          setIsDND(false);
          const tmp = (newValue as number) > 99.8 ? 99.9 : (newValue as number);
          setCurrentTime((tmp * totalTime) / 100);
        }}
        aria-labelledby="continuous-slider"
        color="secondary"
      />
      <div className={classes.buttonsRow}>
        <IconButton
          aria-label="paly/stop"
          size="small"
          onClick={() => {
            setPlaying(!playing);
          }}
        >
          {playIcon}
        </IconButton>
        <VolumeUp className={classes.volumeIcon} />
        <Slider
          className={classes.volumeSlider}
          color="secondary"
          value={volumeValue}
          onChange={(event: any, newValue: number | number[]) => {
            setVolumeValue(newValue as number);
          }}
          aria-labelledby="continuous-slider"
        />
        <Typography variant="body2">{`${fmtMSS(currentTime.toFixed(0))}/${fmtMSS(
          totalTime.toFixed(0)
        )}`}</Typography>
        <div className={classes.whiteLabelContainer}>
          {whileLabel === '1' ? (
            <a href={process.env.REACT_APP_WHILE_LABEL_SRC}>
              <img height="40" src={process.env.REACT_APP_WHILE_LABEL_HREF} alt="" />
            </a>
          ) : null}
        </div>
        <IconButton
          aria-label="fullscreen"
          size="small"
          onClick={() => {
            setFullScreen(!fullScreen);
          }}
        >
          <Fullscreen />
        </IconButton>
      </div>
    </Toolbar>
  );
};
