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
import { Repository } from './repository';

export const Tours = ({ museums, photos }) => {
  // const [museum, setMuseum] = useState({});

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function GridItem(props) {
    let items = [
      <Paper
        className="Project"
        style={{ backgroundColor: "ivory", alignItems: "center", marginBottom: 10 }}
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
          <Button
            variant="outlined"
            className="ViewButton"
            style={{
              color: "#F6F7EB",
              backgroundColor: "cornflowerblue",
              fontFamily: "Baskerville",
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
        </CardActions>
          
        {/* <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            className="Caption"
            style={{
              color: "#696963",
              fontFamily: "Baskerville",
            }}
            title={props.item.museum_name}
          />
          <CardMedia
            component="img"
            height="150"
            width="300"
            
          />
          <CardContent>
            <Typography
              className="Caption"
              style={{
                color: "#696963",
                fontFamily: "Baskerville",
              }}
              variant="body2"
            >
              Address?
            </Typography>
          </CardContent>
          
            <CardContent>
              <Typography
                paragraph
                className="Caption"
                style={{
                  color: "#696963",
                  fontFamily: "Baskerville",
                }}
              >
                Current Director: {props.item.director}
              </Typography>
              <Typography
                paragraph
                className="Caption"
                style={{
                  color: "#696963",
                  fontFamily: "Baskerville",
                }}
              >
                Exhibits on Display: {props.item.num_exhibits}
              </Typography>
            </CardContent>
        </Card> */}
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
