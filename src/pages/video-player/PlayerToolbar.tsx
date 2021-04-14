import React, { useEffect, useState } from 'react';
import {
  createStyles,
  IconButton,
  makeStyles,
  Slider,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

interface Props {
  currentTime: number;
  totalTime: number;
  setCurrentTime: (time: number) => void;
  playing: boolean;
  setPlaying: (playing: boolean) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

function fmtMSS(s: any) {
  return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.grey[50],
    },
    slider: {
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
    },
  })
);

export const PlayerToolbar = ({
  currentTime,
  setCurrentTime,
  audioRef,
  playing,
  setPlaying,
  totalTime,
}: Props) => {
  const classes = useStyles();
  const playIcon = playing ? <PauseIcon /> : <PlayArrowIcon />;
  const [progress, setProgress] = useState(0);
  const [isDND, setIsDND] = useState(false);

  useEffect(() => {
    if (!isDND) setProgress((currentTime / totalTime) * 100);
  }, [currentTime, totalTime, isDND]);

  return (
    <Toolbar className={classes.root}>
      <IconButton
        aria-label="delete"
        onClick={() => {
          setPlaying(!playing);
          if (!playing) audioRef.current?.play();
          else audioRef.current?.pause();
        }}
      >
        {playIcon}
      </IconButton>
      <Slider
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
      <Typography variant="h6">{`${fmtMSS(currentTime.toFixed(0))}/${fmtMSS(
        totalTime.toFixed(0)
      )}`}</Typography>
    </Toolbar>
  );
};
