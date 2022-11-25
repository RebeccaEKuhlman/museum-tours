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
            src={
              photos.filter((x) => x.photoId === props.item.photoId)[0]
                .photo_data
            }
            style={{
              height: 300,
              width: 500,
              borderRadius: "16px",
            }}
          ></img>
          <div className="Info" style={{ marginLeft: 30 }}>
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
            <Typography
              className="Caption"
              style={{
                color: "#696963",
                fontFamily: "Baskerville",
                fontSize: 20,
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
              }}
            >
              Exhibits on Display: {props.item.num_exhibits}
            </Typography>
          </div>

          <Button
            variant="outlined"
            className="ViewButton"
            style={{
              color: "#F6F7EB",
              backgroundColor: "cornflowerblue",
              fontFamily: "Baskerville",
              height: 45,
              width: 200,
              marginLeft: 250,
              marginTop: 250,
            }}
          >
            View Now
          </Button>
        </CardContent>
      </Paper>,
    ];
  }
    return (
      <div style={{ marginTop: 10, maxWidth: "100%" }}>
        <Grid container alignItems="center" justifyContent="center">
          <Card
            variant="outlined"
            style={{
              color: "#F6F7EB",
              fontFamily: "Baskerville",
              textDecoration: "underline",
              backgroundColor: "#323031",
            }}
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
  }