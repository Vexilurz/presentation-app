import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { deleteSlide } from '../../redux/presentation/presentationThunks';

// @ts-ignore
import Crunker from 'crunker';
import { extractAudioUrls } from '../../lib/audio-concat';
import { AixmusicApi } from '../../lib/aixmusic-api/AixmusicApi';

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.grey[50],
    },
    title: {
      flexGrow: 1,
    },
    button: {
      margin: theme.spacing(1),
    },
    buttonDanger: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.error.main
    },
  })
);

export const SlideToolbar = (props: Props) => {
  const state = useSelector((state: RootState) => state.presentation);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleUpload = async () => {
    // TODO: MOVE TO REDUX
    const crunker = new Crunker();

    const audioUrls = extractAudioUrls(state.presentation);

    let buffers = await crunker.fetchAudio(...audioUrls);
    let concated = await crunker.concatAudio(buffers);
    let output = await crunker.export(concated, 'audio/mp3');
    const api = AixmusicApi.getInstance();
    const res = await api.updatePresentation(state.presentation.url, {
      audio: output.blob,
    });
    alert('Presentation audio regenerated!');
  };

  return (
    <Toolbar className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        {state.presentation.title}
      </Typography>
      <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<CloudUploadIcon />}
        onClick={handleUpload}
      >
        Save Presentation
      </Button>
      {state.selectedSlide?.id ? (
        <Button
          variant="contained"
          className={classes.buttonDanger}
          startIcon={<DeleteIcon />}
          onClick={() => dispatch(deleteSlide(state.selectedSlideId))}
        >
          Delete Slide
        </Button>
      ) : null}
    </Toolbar>
  );
};
