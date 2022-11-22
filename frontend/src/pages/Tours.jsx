import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Paper,
} from "@material-ui/core";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { Repository } from "./repository";

export const Tours = ({ museums, photos }) => {
  const [museum, setMuseum] = useState(undefined);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.museum_name) {
      Repository.getMuseumByName(params.museum_name).then((x) => setMuseum(x));
    } else {
      alert("shite broke");
    }
  }, [params.museum_name]);

  //const mergeMuseum = (delta) => setMuseum({ ...museum, ...delta });

  const handleBookClick = () => {
    if (params.museum_name) {
      Repository.getMuseumByName(params.museum_name).then((x) => navigate("/"));
    } else {
    }

    function GridItem(props) {
      let items = [
        <Paper
          className="Project"
          style={{
            backgroundColor: "ivory",
            alignItems: "center",
            marginBottom: 10,
          }}
          elevation={10}
          key={props.item.museum_name}
        >
          <CardContent className="Content">
            <img
              className="Image"
              alt="museumlogo"
              src={
                photos.filter((x) => x.photoId === props.item.photoId)[0]
                  .photo_data
              }
              style={{ alignItems: "center", height: 100, width: "auto" }}
            ></img>
            <Typography
              className="Title"
              style={{
                color: "#696963",
                fontFamily: "Baskerville",
                fontWeight: "bold",
                fontSize: 25,
              }}
            >
              {props.item.museum_name}
            </Typography>
            <Typography
              className="Caption"
              style={{
                color: "#696963",
                fontFamily: "Baskerville",
              }}
            >
              Current Director: {props.item.director}
            </Typography>
            <Typography
              className="Caption"
              style={{
                color: "#696963",
                fontFamily: "Baskerville",
              }}
            >
              Exhibits on Display: {props.item.num_exhibits}
            </Typography>
          </CardContent>
          <CardActions>
            <Link to="/bookings">
              <Button
                variant="outlined"
                className="ViewButton"
                style={{
                  color: "#F6F7EB",
                  backgroundColor: "cornflowerblue",
                  fontFamily: "Baskerville",
                }}
              >
                View Now
              </Button>
            </Link>
            {/* Need a use state to handle what goes in the Dialog, rip from Lawrimore*/}
          </CardActions>
        </Paper>,
      ];
      return (
        <Grid item xs={11}>
          {items}
        </Grid>
      );
    }

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
              Museums Near You
            </Typography>
          </Card>
          {museums.map((item, index) => {
            return <GridItem item={item} key={index} />;
          })}
        </Grid>
      </div>
    );
  };
};
