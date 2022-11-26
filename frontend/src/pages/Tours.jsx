import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Dialog,
  Box,
} from "@material-ui/core";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";


export const Tours = ({ museums, photos }) => {
  // const [museum, setMuseum] = useState({});

  const nav = useNavigate();

  function GridItem(props) {
    let items = [
      <Paper
        className="Project"
        style={{
          backgroundColor: "ivory",
          alignItems: "center",
          marginBottom: 10,
          display: "flex",
          overflow: 'auto',
          overflowY: 'hidden'
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
              fontWeight: "bold",
              backgroundColor: "#323031",
              paddingTop: "10px",
              paddingBottom: "20px",
              textAlign: "center"
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

//apisdjhfladk
