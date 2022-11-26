import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Paper,
} from "@material-ui/core";
import CardMedia from "@mui/material/CardMedia";
import Carousel from "react-material-ui-carousel";
import Button from "@mui/material/Button";
import autoBind from "auto-bind";
import axios from "axios";
import "./Home.css";

// React Functional Component
export const Home = ({ museums, photos }) => {

  const nav = useNavigate();

  function Project(props) {
    let items = [
      <Paper
        className="Project"
        style={{
          backgroundColor: "ivory",
          alignItems: "center",
          marginBottom: 10,
          display: "flex",
          overflow: 'auto',
          overflowY: 'hidden',
        }}
        elevation={10}
        key={props.item.museum_name}
      >
        <CardContent className="Content" style={{ display: "flex", alignItems: "center" }}>
          <CardMedia
            component="img"
            style={{
              marginTop: "8px",
              height: "35vh",
              width: "50vh",
              borderRadius: "16px",
            }}
            image={photos.filter((x) => x.photoId === props.item.photoId)[0].photo_data}
            alt="museumlogo"
          />
          <div className="Info" style={{ marginLeft: 30, width: 500 }}>
            <Typography
              className="Title"
              style={{
                color: "#696963",
                fontFamily: "Baskerville",
                fontWeight: "bold",
                fontSize: 30,
              }}
            >
              {props.item.museum_name}
            </Typography>
            <hr style={{ margin: "2px" }}/>
            <Typography
              className="Caption"
              style={{
                color: "#696963",
                fontFamily: "Baskerville",
                fontSize: 20,
                marginTop: "5px",
              }}
            >
              Current Director: {props.item.director}
            </Typography>
            <Typography
              className="Caption"
              style={{
                color: "#696963",
                fontFamily: "Baskerville",
                fontSize: 20,
                marginBottom: "5px"
              }}
            >
              Exhibits on Display: {props.item.num_exhibits}
            </Typography>
            <hr style={{ margin: "2px" }}/>
            {props.item.whatsNew &&
              <div>
                <Typography
                  className="Description"
                  style={{
                    color: "#696963",
                    fontFamily: "Baskerville",
                    fontSize: 20,
                    marginTop: "5px",
                    marginBottom: "5px"
                  }}
                >
                  {props.item.whatsNew}
                </Typography>
                <hr style={{ margin: "2px" }}/>
              </div>
            }
            <Button
              fullWidth
              variant="outlined"
              className="ViewButton"
              style={{
                color: "#F6F7EB",
                backgroundColor: "cornflowerblue",
                fontFamily: "Baskerville",
                marginTop: "10px",
                alignItems: "center"
              }}
              onClick={() => {
                nav(`/bookings/${props.item.museum_name}`);
              }}
            >
              View Now
            </Button>
            {/* Need a use state to handle what goes in the Dialog, rip from Lawrimore*/}
          </div>
        </CardContent>
      </Paper>,
    ];
    return (
      <Grid item>
        {items}
      </Grid>
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
    textAlign: "center",
    fontFamily: ["Baskerville"],
    fontWeight: "bold",
    backgroundColor: "#7F96FF",
    color: "#F6F7EB",
    padding: "20px 80px",
    fontSize: "32px",
    "&:hover": {
      backgroundColor: "#EC0B43",
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
      <main style={{ marginLeft: 30, marginTop: 30, marginRight: 30}}>
        <Carousel
          className="Carousel"
          animation={"fade"}
          navButtonsAlwaysInvisible={true}
          navButtonsProps={{
            style: { backgroundColor: "#7F96FF", borderRadius: 100 },
          }}
          navButtonsWrapperProps={{
            style: { bottom: "0", marginRight: 10, marginLeft: 10 },
          }}
          indicatorContainerProps={{
            style: { marginTop: 20, marginBottom: 20 },
          }}
        >
          {museums.map((item, index) => {
            return <Project item={item} key={index} />;
          })}
        </Carousel>
      </main>
    </div>
  );
};
