import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Paper,
  Grid,
} from "@material-ui/core";
import { Repository } from "../api";
import { ScheduleContext } from "../context";

export const Bookings = () => {
  const [tour, setTour] = useState([]);
  const nav = useNavigate();
  const params = useParams();

  const repository = new Repository();

  // get the context from ScheduleContext
  const context = useContext(ScheduleContext).context;
  console.log(context);

  useEffect(() => {
    console.log("PARAMS.MUSEUM = " + params.museum_name);
    repository.getToursByMuseum(params.museum_name).then((response) => {
      setTour(response);
    });
  }, []);

  const addToTourHandler = (bookingToAdd) => {
    console.log("Added to My Tours");
    context.addToSchedule(tour);
    console.log(sessionStorage, bookingToAdd);
    repository.postBooking(sessionStorage.email, bookingToAdd);
    nav("/profile");
  };

  function GridItem(props) {
    let items = [
      <Paper
        className="Project"
        style={{
          backgroundColor: "ivory",
          alignItems: "center",
          marginBottom: 10,
          display: "flex",
        }}
        elevation={10}
        key={props.item.museum_name}
      >
        <CardContent className="Content" style={{ display: "flex" }}>
          <img
            className="Image"
            alt="museumlogo"
            src="https://1000logos.net/wp-content/uploads/2021/12/Microsoft-Teams-Logo-2016.png"
            style={{
              height: 150,
              width: "auto",
              borderRadius: "16px",
            }}
          ></img>
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
              {props.item.tour_Name}
            </Typography>
            <hr></hr>
            <Typography
              className="Schedule"
              style={{
                color: "#696963",
                fontFamily: "Baskerville",
                fontSize: 20,
              }}
            >
              {props.item.tourDate} at {props.item.tourTime}
            </Typography>
            <Typography
              className="Description"
              style={{
                color: "#696963",
                fontFamily: "Baskerville",
                fontSize: 20,
              }}
            >
              {props.item.tourDescription}
            </Typography>
            <Typography
              className="Theme"
              style={{
                color: "#696963",
                fontFamily: "Baskerville",
                fontSize: 20,
              }}
            >
              {props.item.theme}
            </Typography>
            <Typography
              className="Slots"
              style={{
                color: "#696963",
                fontFamily: "Baskerville",
                fontSize: 20,
              }}
            >
              Available Space: {props.item.num_spaces_available}
            </Typography>
            <Button
              fullWidth
              variant="outlined"
              className="ViewButton"
              style={{
                color: "#F6F7EB",
                backgroundColor: "cornflowerblue",
                fontFamily: "Baskerville",
                marginTop: "10px",
                alignItems: "center",
              }}
              onClick={() => {
                addToTourHandler(props.item.tour_Name);
              }}
            >
              Book Now
            </Button>
          </div>
        </CardContent>
      </Paper>,
    ];
    return (
      <Grid item xs={11}>
        {items}
      </Grid>
    );
  }

  return (
    <div
      justifyContent="center"
      alignItems="center"
      style={{ marginTop: 10, maxWidth: "100%" }}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Card
          variant="outlined"
          style={{
            display: "inline-block",
            backgroundcolor: "#F6F7EB",
            border: "none",
          }}
          width="50%"
        >
          <Typography
            className="h3"
            variant="h3"
            style={{
              color: "#F6F7EB",
              fontFamily: "Baskerville",
              textDecoration: "underline",
              backgroundColor: "#323031",
            }}
          >
            Tours at {params.museum_name}
          </Typography>
        </Card>
        <div>
          {tour.map((item, index) => (
            <GridItem item={item} key={index} />
          ))}
        </div>
      </Grid>
    </div>
  );
};
