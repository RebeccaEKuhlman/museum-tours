import { sizeHeight } from '@mui/system';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, makeStyles, Box, Avatar } from "@material-ui/core";

import { NoPage } from './pages/NoPage';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { Tours } from './pages/Tours';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    minHeight: '64px',
    justifyContent: 'space-between'
  },
  headlink: {
    fontFamily: [ "Baskerville" ],
    transitionDuration: 250,
    marginTop: 1,
    marginLeft: 30,
    fontWeight: 'bold',
    letterSpacing: '.1rem',
    textDecoration: "none",
    color: "#F6F7EB",
    fontSize: "40px",
    "&:hover": {
      color: "#EC0B43",
    },
  },
  link: {
    fontFamily: [ "Baskerville" ],
    transitionDuration: 250,
    marginTop: 1,
    fontWeight: 'bold',
    letterSpacing: '.075rem',
    textDecoration: "none",
    color: "#F6F7EB",
    fontSize: "20px",
    "&:hover": {
      color: "#EC0B43",
    },
  },
  profile: {
    transitionDuration: 250,
    marginRight: 30,
    width: 45,
    height: 45,
    "&:hover": {
      boxShadow: '0px 7px 8px -4px rgb(0 0 0 / 20%), 0px 12px 17px 2px rgb(0 0 0 / 14%), 0px 5px 22px 4px rgb(0 0 0 / 12%)',
    },
  },
}));

export const App = () => {
  const classes = useStyles();
  return (
    <Router>
      <AppBar position="static" style={{ backgroundColor: "#7F96FF" }}>
        <Toolbar disableGutters className={classes.toolbar}>
          <Typography 
            className={classes.headlink}
            component="a"
            href="/"
            noWrap
          > 
            Museum Tours
          </Typography>
          <Typography className={classes.link}>
            {/* <Link to="/tours" className={classes.link}>
              Bookings
            </Link> */}
          </Typography>
          <Avatar 
            className={classes.profile}
            component="a"
            href="/login" // Should Route To Profile After Login
            src="/broken-image.jpg"
          />
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="*" element={< NoPage />} />
        <Route exact path='/' element={< Home />}></Route>
        <Route exact path='/login' element={< Login />}></Route>
        <Route exact path='/profile' element={< Profile />}></Route>
        <Route exact path='/tours' element={< Tours />}></Route>
      </Routes>
    </Router>
  );
}