import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Paper,
  Grid
} from "@material-ui/core";
import axios from "axios";
import { Repository } from "../api";
import { ScheduleContext } from "../context";
import { Tour } from "../models";

export const Bookings = () => {
  const [tour, setTour] = useState(new Tour(0, "", "", 0, "", []));
  const nav = useNavigate();
  const params = useParams();

  var repository = new Repository();

  // get the context from ScheduleContext
  // const { addToTours } = useContext(ScheduleContext).context;

  useEffect(() => {
    console.log("PARAMS.MUSEUM = " + params.museum_name);
    repository.getToursByMuseum(params.museum_name).then((response) => {
      setTour(response);
    });
  }, []);

  // const addToTourHandler = () => {
  //   console.log("Added to My Tours");
  //   addToTours(tour);
  //   nav("/profile");
  // };

  return (
    <div style={{ marginTop: 10, maxWidth: "100%" }}>
      <Grid container alignItems="center" justifyContent="center">
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
      </Grid>
    </div>
  );
};
