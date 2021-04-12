import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { ReactElement, ReactNode } from 'react';
import Navbar from './Navbar';

interface Props {
  children: ReactNode;
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    contents: {
      height: '100vh',
    },
    pages: {
      height: '100%'
    }
  }),
);

export default function Layout({ children }: Props): ReactElement {
  const classes = useStyles();

  return (
    <div className={classes.contents}>
      {/* <Navbar/> */}
      <main className={classes.pages}>
        {children}
      </main>
    </div> 
  );
}
