import {
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';

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
  const classes = useStyles();

  return (
    <Toolbar className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        {state.presentation.title}
      </Typography>
      {/* <Button        
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<CloudUploadIcon />}
        disabled={uploadInProcess}
        onClick={()=>{dispatch(uploadPresentation(state.presentation))}}
      >
        Save Presentation
        {uploadInProcess ? (
          <CircularProgress color="secondary" size={25} style={{marginLeft:10}}/>
        ) : (
          <></>
        )}
      </Button> */}
    </Toolbar>
  );
};
