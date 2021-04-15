import {
  CircularProgress,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { getPresentation } from '../../redux/presentation/presentationThunks';
import { useAppDispatch } from '../../redux/store';
import { AixmusicApi } from '../../lib/aixmusic-api/AixmusicApi';
import { PresentationPlayer } from './PresentationPlayer';

interface Props {}

interface ParamTypes {
  presentationUrl: string;
  token: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    playerContainer: {
      height: '100%',
      width: '100%',
      backgroundColor: theme.palette.common.black,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    player: {
      height: '100%',
      width: '100%',
    },
  })
);

export const VideoPlayerPage = (props: Props) => {
  const classes = useStyles();
  let { presentationUrl, token } = useParams<ParamTypes>();

  const history = useHistory();
  const state = useSelector((state: RootState) => state.player);
  const dispatch = useAppDispatch();

  const playerContainerRef: React.RefObject<HTMLDivElement> = React.createRef();

  useEffect(() => {
    const api = AixmusicApi.getInstance();
    api.setToken(token);
    dispatch(getPresentation(presentationUrl));
  }, [history]);

  return (
    <div className={classes.playerContainer} ref={playerContainerRef}>
      {state.presentation.slides ? (
        <PresentationPlayer
          className={classes.player}
          slideshow={state.slideshow}
          presentationTitle={state.presentation.title}
          whileLabel={{src: "", href: ""}}
        />
      ) : (
        <CircularProgress color="secondary" />
      )}
    </div>
  );
};
