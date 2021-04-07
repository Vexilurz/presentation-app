import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { deleteSlide, deleteSlideAudio } from '../../redux/presentation/presentationThunks';

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

  const [anchorEl, setAnchorEl] = React.useState(null);
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
        <div>
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<MoreHorizIcon />}
            onClick={handleMenuClick}
          />
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
        </div>
      ) : null}
    </Toolbar>
  );
};
