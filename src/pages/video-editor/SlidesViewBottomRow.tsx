import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { AddFromPdfButton } from './AddFromPdfButton';

interface Props {
  presentationUrl: string,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 'auto',
      height: '50px',
    },
  })
);

export const SlidesViewBottomRow = (props: Props): ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.root} >      
      <AddFromPdfButton 
        presentationUrl={props.presentationUrl}
      />
    </div>
  );
};
