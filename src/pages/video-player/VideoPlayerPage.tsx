import {
  CircularProgress,
  Container,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
// @ts-ignore
import ReactWebMediaPlayer from 'react-web-media-player';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { getPresentation } from '../../redux/presentation/presentationThunks';
import { useAppDispatch } from '../../redux/store';
import { getAssetsUrl } from '../../lib/assests-helper';
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
  const [dimentions, setDimentions] = useState({ height: 0, width: 0 });

  useEffect(() => {
    const api = AixmusicApi.getInstance();
    api.setToken(token);
    dispatch(getPresentation(presentationUrl));
    setDimentions({
      height: playerContainerRef.current?.offsetHeight as number - 20,
      width: playerContainerRef.current?.offsetWidth as number -  20,
    });
  }, [history]);

  return (
    <div className={classes.playerContainer} ref={playerContainerRef}>
      {state.presentation.slides ? (
        <PresentationPlayer className={classes.player}  slideshow={state.slideshow}/>
      ) : (
        <CircularProgress color="secondary" />
      )}
    </div>
  );
};
