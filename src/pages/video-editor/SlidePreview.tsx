import {
  Badge,
  createStyles,
  Divider,
  makeStyles,
  Theme,
  withStyles,
} from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { setSelectedSlideId } from '../../redux/presentation/presentationSlice';
import { RootState } from '../../redux/rootReducer';
import { useAppDispatch } from '../../redux/store';
import { ISlideResponse } from '../../types/AixmusicApiTypes';
import MicIcon from '@material-ui/icons/Mic';

const uploadsUrl = process.env.REACT_APP_UPLOADS_URL as string;
interface Props {
  slide: ISlideResponse;
}

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      right: '20%',
      top: '10%',
      height: 30,
      width: 30,
      borderRadius: '50%',
    },
  })
)(Badge);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '3px 0',
    },
    slide: {
      boxSizing: 'border-box',
      border: '1px solid',
      borderColor: theme.palette.grey[300],
    },
    selectedSlide: {
      boxSizing: 'border-box',
      border: '2px solid',
      borderColor: theme.palette.secondary.main,
    },
  })
);

export const SlidePreview = (props: Props) => {
  const classes = useStyles();
  const state = useSelector((state: RootState) => state.presentation);
  const dispatch = useAppDispatch();
  const badgeContent = props.slide.audio ? <MicIcon /> : 0;

  return (
    <StyledBadge badgeContent={badgeContent} color="error" overlap="circle">
      <div className={classes.root}>
        <img
          src={`${uploadsUrl}${props.slide.image}`}
          width="80%"
          height="100%"
          alt=""
          className={
            state.selectedSlideId === props.slide.id
              ? classes.selectedSlide
              : classes.slide
          }
          onClick={() => {
            dispatch(setSelectedSlideId(props.slide.id));
          }}
        />
      </div>
    </StyledBadge>
  );
};
