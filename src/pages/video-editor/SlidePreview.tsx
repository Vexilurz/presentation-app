import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { setSelectedSlideId } from '../../redux/presentation/presentationSlice';
import { RootState } from '../../redux/rootReducer';
import { useAppDispatch } from '../../redux/store';
import { ISlideResponse } from '../../types/AixmusicApiTypes';

const uploadsUrl = process.env.REACT_APP_UPLOADS_URL as string;
interface Props {
  slide: ISlideResponse;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '3px 0',
    },
    selectedSlide: {
      boxSizing: 'border-box',
      border: '2px solid',
      borderColor: theme.palette.secondary.main
    },
  })
);

export const SlidePreview = (props: Props) => {
  const classes = useStyles();
  const state = useSelector((state: RootState) => state.presentation);
  const dispatch = useAppDispatch();
  return (
    <div className={classes.root}>
      <img
        src={`${uploadsUrl}${props.slide.image}`}
        width="30%"
        height="100%"
        alt=""
        className={
          state.selectedSlideId === props.slide.id ? classes.selectedSlide : ''
        }
        onClick={() => {
          dispatch(setSelectedSlideId(props.slide.id));
        }}
      />
    </div>
  );
};
