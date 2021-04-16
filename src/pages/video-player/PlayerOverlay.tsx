import React from 'react';
import {
  createStyles,
  IconButton,
  makeStyles,
  Modal,
  Theme,
  Typography,
  withStyles,
} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

interface Props {
  presentationTitle: string;
  isShowed: boolean;
  setIsShowed: (s: boolean) => void;
}

const ColorButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
    width: '68px',
    height: '48px',
    borderRadius: '28%',
  },
}))(IconButton);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modalContainer: {
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    presentationTitle: {
      alignSelf: 'flex-start',
      padding: theme.spacing(2),
      width: '100%',
      color: theme.palette.primary.main,
    },
    buttonContainer: {
      width: '100%',
    }
  })
);

export const PlayerOverlay = ({
  isShowed,
  setIsShowed,
  presentationTitle,
}: Props) => {
  const classes = useStyles();
  return (
    <Modal
      open={isShowed}
      onClose={setIsShowed}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.modalContainer}>
        <Typography
          variant="h5"
          component="div"
          className={classes.presentationTitle}
        >
          {presentationTitle}
        </Typography>
        <div className={classes.buttonContainer}>
          <ColorButton
            onClick={() => {
              setIsShowed(!isShowed);
            }}
          >
            <PlayArrowIcon fontSize="large" />
          </ColorButton>
        </div>
      </div>
    </Modal>
  );
};
