import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  CardHeader,
  Typography,
  Paper,
  Dialog,
  Box,
} from "@material-ui/core";
import Button from "@mui/material/Button";
import { maxHeight } from "@mui/system";

export const Tours = ({ museums, photos }) => {
  // const [museum, setMuseum] = useState({});

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
              marginTop: 250
            }}
            onClick={handleOpen}
          >
            View Now
          </Button>
          {/* Need a use state to handle what goes in the Dialog, rip from Lawrimore*/}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Card
              style={{
                width: 1000,
                height: 500,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#F6F7EB",
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {props.item.museum_name}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {props.item.museum_name}
              </Typography>
            </Card>
          </Dialog>
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

//apisdjhfladk
