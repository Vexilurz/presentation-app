import {
  Container,
  createStyles,
  Grid,
  makeStyles,
  Theme,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { deleteSlide, getPresentation } from '../../redux/presentation/presentationThunks';
import { RootState } from '../../redux/rootReducer';
import { useAppDispatch } from '../../redux/store';
import Paper from '@material-ui/core/Paper';
import { useHistory, useParams } from 'react-router-dom';
import { SlidesView } from './SlidesView';

const uploadsUrl = process.env.REACT_APP_UPLOADS_URL as string;

interface Props {}

interface ParamTypes {
  presentationUrl: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
    },
    grid: {
      height: '100%',
    },
    sidebar: {
      height: '100%',
      overflowX: 'scroll',
      backgroundColor: theme.palette.primary.light,
      whiteSpace: 'normal',
      wordBreak: 'break-all',
    },
  })
);

export const VideoEditorPage = (props: Props) => {
  const url = 'test';
  // const state = useSelector((state: RootState) => state.presentation);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const classes = useStyles();
  const state = useSelector((state: RootState) => state.presentation);

  let { presentationUrl } = useParams<ParamTypes>();
  
  return (
    <div className={classes.root}>
      <Grid container className={classes.grid}>
        <Grid item md={3} className={classes.sidebar}>
          <SlidesView presentationUrl={presentationUrl} />
        </Grid>
        <Grid item md={9}>
          {`Selected slide ID: ${state.selectedSlide.id}`}
          <button onClick={()=>{
            dispatch(deleteSlide(state.selectedSlide.id))
          }}>
            Delete
          </button>
          {/* <button onClick={()=>{
            history.push(`/editor/${presentationUrl}`);            
          }}>
            test
          </button> */}
          <br></br>
          <img src={`${uploadsUrl}${state.selectedSlide.image}`} />
          <br></br>
        </Grid>
      </Grid>
    </div>
  );
};
