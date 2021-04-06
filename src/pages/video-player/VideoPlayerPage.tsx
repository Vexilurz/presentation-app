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

interface Props {}

interface ParamTypes {
  presentationUrl: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },

    playerContainer: {
      height: '80%',
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
  let { presentationUrl } = useParams<ParamTypes>();

  const history = useHistory();
  const state = useSelector((state: RootState) => state.player);
  const dispatch = useAppDispatch();
  
  const playerContainerRef: React.RefObject<HTMLDivElement> = React.createRef();
  const [dimentions, setDimentions] = useState({height: 0, width: 0})

  useEffect(() => {
    dispatch(getPresentation(presentationUrl));
    setDimentions({
      height: playerContainerRef.current?.clientHeight as number,
      width: playerContainerRef.current?.clientWidth as number
    });
  }, [history]);

  

  return (
    <Container maxWidth="lg" className={classes.root}>
      <div className={classes.playerContainer} ref={playerContainerRef}>
        {state.presentation.slides ? (
          <ReactWebMediaPlayer
            className={classes.player}
            title={state.presentation.title}
            slideshow={state.slideshow}
            audio={getAssetsUrl(state.presentation.audio)}
            height={dimentions.height}
            width={dimentions.width}
          />
        ) : (
          <CircularProgress color="secondary" />
        )}
      </div>
    </Container>
  );
};
