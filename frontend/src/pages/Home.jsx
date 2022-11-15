import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardActions, Typography, Paper } from "@material-ui/core";
import Carousel from 'react-material-ui-carousel'
import Button from "@mui/material/Button";
import autoBind from 'auto-bind';
import axios from 'axios';
import './Home.css';

// React Functional Component
export const Home = ({ museums, photos }) => {
  function Project(props) {
    let items = [
      <Paper
        className="Project"
        style={{ backgroundColor: "#696963", alignItems: "center", display: 'flex', justifyContent: 'center' }}
        elevation={10}
        key={props.item.museum_name}
      >
        <CardContent className="Content">
          <img
            className="Image"
            alt="museumlogo"
            src={photos.filter(x => x.photoId === props.item.photoId)[0].photo_data}
            style={{ alignItems: "center", height: 100, width: "auto" }}
          ></img>
          <Typography
            className="Title"
            style={{
              color: "#F6F7EB",
              fontFamily: "Baskerville",
              fontWeight: "bold",
              fontSize: 25,
            }}
          >
            {props.item.museum_name}
          </Typography>
          <br />
          <Typography
            className="Caption"
            style={{
              color: "#F6F7EB",
              fontFamily: "Baskerville",
            }}
          >
            {props.item.Caption}
          </Typography>
          <Button
            variant="outlined"
            className="ViewButton"
            style={{
              color: "#F6F7EB",
              backgroundColor: "#7F96FF",
              fontFamily: "Baskerville",
            }}
          >
            View Now
          </Button>
        </CardContent>
      </Paper>,
    ];

    return (
      <Card raised className="Card">
        {items}
      </Card>
    );
  }

  let state = {
    autoPlay: true,
    animation: "slide",
    indicators: true,
    duration: 500,
    navButtonsAlwaysVisible: false,
    navButtonsAlwaysInvisible: true,
    cycleNavigation: true,
    fullHeightHover: true,
    swipe: true,
  };

  const StyledButton = {
    textAlign: 'center',
    fontFamily: [ "Baskerville" ],
    fontWeight: 'bold',
    backgroundColor: "#7F96FF",
    color: "#F6F7EB",
    padding: "20px 80px",
    fontSize: "32px",
    "&:hover": {
      backgroundColor: "#EC0B43"
    },
  };
  
  return (
    <div className="Home-body">
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="*" element={<NoPage />} />
          </Route>
          <Route path="/login" element={<Login />}>
          </Route>
        </Routes>
      </BrowserRouter> */}
      <header className="Home-header">
        <Button 
          variant="contained"
          sx={StyledButton} 
          component="a"
          href="/tours"
        >
          See Bookings
        </Button>
      </header>
      <main>
        <Carousel
          className="Carousel"
          autoPlay={state.autoPlay}
          animation={state.animation}
          indicators={state.indicators}
          duration={state.duration}
          cycleNavigation={state.cycleNavigation}
          navButtonsAlwaysVisible={state.navButtonsAlwaysVisible}
          navButtonsAlwaysInvisible={state.navButtonsAlwaysInvisible}
          fullHeightHover={false}
          navButtonsProps={{ style: { backgroundColor: "#7F96FF", borderRadius: 100 }}}
          navButtonsWrapperProps={{ style: { bottom: "0", marginRight: 10, marginLeft: 10 } }}
          indicatorContainerProps={{ style: { marginTop: 20, marginBottom: 20 } }}
        >
          {museums.map((item, index) => {
            return <Project item={item} key={index} />;
          })}
        </Carousel>
      </main>
    </div>
  );
}