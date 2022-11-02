import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Repository } from "./repository";

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const useStyles = makeStyles((theme) => ({
  typography: {
    fontFamily: "Baskerville",
  },
  palette: {
    background: {
      paper: "#F6F7EB",
    },
    text: {
      primary: "#F6F7EB",
      secondary: "#696963",
    },
    action: {
      active: "#001E3C",
    },
    success: {
      dark: "#7F96FF",
    },
  },
  root: {
    height: "100vh",
  },
  card: {
    fontFamily: "Baskerville",
    backgroundColor: "#F6F7EB",
  },
  typography: {
    fontFamily: "Baskerville",
  },
}));

export function Profile() {
  const classes = useStyles();
  return (
    <div className="profile">
      <Grid
        container
        className={classes.root}
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh", padding: "0" }}
        
      >
        <Grid item xs="auto" sm={6}>
          <Card
            className={classes.card}
            sx={{ maxWidth: 345, backgroundcolor: "#FFFFFF" }}
          >
            <CardMedia
              component="img"
              height="500vh"
              width="auto"
              image="https://upload.wikimedia.org/wikipedia/commons/9/95/Josh_Allen_SEPT2021_%28cropped2%29.jpg"
              alt="profile"
            />
            <CardContent
              className={classes.card}
              sx={{ backgroundColor: "#FFFFFF" }}
            >
              <Typography
                className={classes.typography}
                gutterBottom
                variant="h5"
                component="div"
              >
                Josh Allen
              </Typography>
              <Typography
                className={classes.typography}
                variant="body2"
                color="palette.text.secondary"
              >
                This is a sentence about the person.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={9}>
          <Card className={classes.card} sx={{ width: 1000}}>
            <CardContent
              className={classes.card}
              sx={{ backgroundColor: "#FFFFFF" }}
            >
              <Typography
                className={classes.typography}
                gutterBottom
                variant="h5"
                component="div"
              >
                My Tours
              </Typography>
              <Typography
                className={classes.typography}
                variant="body2"
                color="palette.text.secondary"
              >
                <List dense={false}>
                  {generate(
                    <ListItem>
                      <ListItemText
                        className={classes.typography}
                        primary="Tour Name"
                        secondary="Date"
                      />
                    </ListItem>
                  )}
                </List>
              </Typography>
              <Button
                sx={{
                  color: "cornflowerblue",
                }}
                onClick={() => {
                  alert("Change Password");
                }}
              >
                Change Password
              </Button>
              <Button
                sx={{ color: "cornflowerblue" }}
                onClick={() => {
                  alert("Change Bio");
                }}
              >
                Change Bio
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
