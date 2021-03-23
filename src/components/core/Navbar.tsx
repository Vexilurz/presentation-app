import {
  AppBar,
  Container,
  IconButton,
  ListItemText,
  makeStyles,
  Toolbar,
  List,
  ListItem,
} from '@material-ui/core';
import React, { ReactElement } from 'react';
import { Home } from '@material-ui/icons';
import {
  Link as RouterLink,
} from 'react-router-dom';

interface Props {}

const useStyles = makeStyles({
  navbarDisplayFlex: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  navDisplayFlex: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  linkText: {
    textDecoration: 'none',
    textTransform: 'uppercase',
    color: 'white',
  },
});

const navLinks = [
  { title: 'Editor', path: '/editor' },
  { title: 'Player', path: '/player' },
];

export default function Navbar(props: Props): ReactElement {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Container maxWidth="lg" className={classes.navbarDisplayFlex}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="home"
            component={RouterLink}
            to={'/'}
          >
            <Home fontSize="large" />
          </IconButton>
          <List
            component="nav"
            aria-labelledby="main navigation"
            className={classes.navDisplayFlex}
          >
            {navLinks.map(({ title, path }) => (
              <a href={path} key={title} className={classes.linkText}>
                <ListItem button>
                  <ListItemText primary={title} />
                </ListItem>
              </a>
            ))}
          </List>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
