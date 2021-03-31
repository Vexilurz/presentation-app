import {
  BottomNavigation,
  BottomNavigationAction,
  createStyles,
  makeStyles,
  Paper,
  Theme,
} from '@material-ui/core';
import React, { ReactElement } from 'react';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import DeleteIcon from '@material-ui/icons/Delete';

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '70px',
      width: '350px',
      backgroundColor: theme.palette.common.white,
      position: 'fixed',
      left: '50%',
      bottom: '20px',
      display: 'flex',
      flexDirection: 'column',
      allignItems: 'center',
      justifyContent: 'center'
    },
  })
);

export default function EditorBar({}: Props): ReactElement {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  return (
    <Paper variant="outlined" className={classes.root}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          console.log(newValue)
        }}
      
      >
        <BottomNavigationAction label="Record" icon={<FiberManualRecordIcon />} />
        <BottomNavigationAction label="Play" icon={<PlayArrowIcon />} />
        <BottomNavigationAction label="Delete" icon={<DeleteIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
