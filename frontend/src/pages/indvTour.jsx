import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Input from '@mui/material/Input';
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@material-ui/core/Grid";
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
  form : {
    position: "absolute",
    display: "inline-block",
    // width: "100%",
    // height: "100%",
    zIndex: 10,
  }
}));

export function indvTour() {
  const classes = useStyles();

  const [ showForm, setShowForm ] = useState(false);
  const [ userForm, setuserForm ] = useState({
    userName: "",
    password: "",
  });

  const toggleForm = () => { 
    console.log("Toggle");
    setShowForm(!showForm); 
  }

  return (
    <div className="profile" style={{ textAlign: "center" }}>
      {showForm && (
        <form className={classes.form}>
          <h2 style={{ color: "darkred" }}>Login</h2>
          <Input
            type="email"
            value={userForm.userName}
            placeholder={"User Name"}
            onChange={(e) => {
              setuserForm({ ...userForm, userName: e.target.value });
            }}
          />
          <Input
            type="password"
            value={userForm.password}
            placeholder={"Password"}
            onChange={(e) => {
              setuserForm({ ...userForm, password: e.target.value });
            }}
          />
          <Button type="submit" text="Submit" />
          {/* onClick={onValidation}  */}
        </form>
      )}
      <Grid
        container
        className={classes.root}
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
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
              image="https://www.groovejones.com/wp-content/uploads/2018/05/Perot-Museum-Main-Page-1.jpg"
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
                Perot Museum
              </Typography>
              <Typography
                className={classes.typography}
                variant="body2"
              >
                tour time
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
                Tour slots or sign up or something?
              </Typography>
              <Typography
                className={classes.typography}
                variant="body2"
              >
                {/* <List dense={false}>
                  {generate(
                    <ListItem>
                      <ListItemText
                        className={classes.typography}
                        primary="Tour Name"
                        secondary="Date"
                      />
                    </ListItem>
                  )}
                </List> */}
              </Typography>
              <Button
                sx={{ color: "cornflowerblue" }}
                onClick={toggleForm}
              >
                Change Password
              </Button>
              <Button
                sx={{ color: "cornflowerblue" }}
                onClick={() => {
                  alert("sign up for tour");
                }}
              >
                SIGN UP FOR TOUR
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
