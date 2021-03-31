import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { ReactElement } from 'react';
import AddIcon from '@material-ui/icons/Add';

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      allignItems: 'center',
      marginTop: 'auto',
      height: '50px'
    },
  })
);

export const SlidesViewBottomRow = ({}: Props): ReactElement => {
  const classes = useStyles();
  return (
    <div className={classes.root} >
      <Button variant="contained" color="secondary" startIcon={<AddIcon />}>
        Add from pdf
      </Button>
    </div>
  );
};
