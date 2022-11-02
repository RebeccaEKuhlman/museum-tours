import { sizeHeight } from '@mui/system';
import React, { useEffect, useState }from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, makeStyles, Box, Avatar } from "@material-ui/core";
import { Repository } from './pages/repository';

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

  const [ museums, setMuseums ] = useState(undefined);
  useEffect(() => {
    var repository = new Repository();
    repository.getMuseums().then(x => setMuseums(x));
  }, []);

  if (!museums) {
    return <></>;
  }

  const requireAuth = (nextState, replace, next) => {
    // if (!authenticated) {
    //   replace({
    //     pathname: "/login",
    //     state: {nextPathname: nextState.location.pathname}
    //   });
    // }
    // next();
  };

  // console.log(museums);

  // let museumsEX = [ // Get From Backend
  //   {
  //     Name: "Dallas Museum of Art",
  //     Image: "https://www.dma.org/sites/default/files/dma-logo.png",
  //     Caption: "Art museum with more than 24,000 works of art from around the world ranging from ancient to modern times. Located in downtown Dallas.",
  //     Color: "#282c34",
  //     // Items: [
  //     //   {
  //     //     Name: "Dallas Museum of Art",
  //     //     Image: "https://via.placeholder.com/100"
  //     //   }
  //     // ]
  //   },
  //   {
  //     Name: "Perot Museum of Natural History",
  //     Image: "http://photos.prnewswire.com/prnfull/20120531/DC16400LOGO",
  //     Caption: "Dallas's natural history museum. Focuses on innovation, archaeology, and curiosity. Located in downtown Dallas.",
  //     Color: "#282c34",
  //   },
  //   {
  //     Name: "Bush Presidential Center",
  //     Image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Official_logo_of_the_George_W._Bush_Presidential_Library.svg/1200px-Official_logo_of_the_George_W._Bush_Presidential_Library.svg.png",
  //     Caption: "Presidential Library and think tank of George W. Bush. Located on the campus of SMU.",
  //     Color: "#282c34",
  //   },
  //   {
  //     Name: "Meadows Museum",
  //     Image: "https://meadowsmuseumdallas.org/wp-content/uploads/2017/02/MUSE_retina.png",
  //     Caption: "The largest collection of Spanish art outside of Spain. Located on the campus of SMU.",
  //     Color: "#282c34",
  //   },
  // ];

  // console.log(museumsEX)

  // useEffect(() => {
  //   const onPageLoad = () => {
      
  //   };
  //   if (document.readyState === 'complete') {
  //     document.onload
  //     onPageLoad();
  //   } else {
  //     window.addEventListener('load');
  //     return () => window.removeEventListener('load', onPageLoad);
  //   }
  // }, []);
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
            Artt. Museum Tours
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
        <Route exact path='/' element={< Home museums={museums} />}></Route>
        <Route exact path='/login' element={< Login />}></Route>
        <Route exact path='/profile' element={< Profile />} onEnter={requireAuth}></Route>
        <Route exact path='/tours' element={< Tours museums={museums} />}></Route>
      </Routes>
    </Router>
  );
}