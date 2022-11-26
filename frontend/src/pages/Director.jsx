import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import Card from "@mui/material/Card";
import Input from "@mui/material/Input";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Modal from "@mui/material/Modal";
import { Repository } from "./repository";

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
    height: "calc(100vh - 64px)",
  },
  card: {
    fontFamily: "Baskerville",
    backgroundColor: "#F6F7EB",
  },
  form: {
    position: "absolute",
    zIndex: 10,
    padding: 20,
    width: "50%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontFamily: "Baskerville",
  },
  select: {
    alignItems: "left",
    textAlign: "left",
  },
}));

export function Director({ museums }) {
  const navigate = useNavigate();
  const classes = useStyles();

  const [open, setOpen] = useState(!sessionStorage.museum);
  const handleOpen = () => setOpen(true);
  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    sessionStorage.museum = museum;
    console.log(museum);
    setOpen(false);
  }

  const [museum, setMuseum] = useState(sessionStorage.museum || "");

  if (!museums) {
    return <></>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("HERE");
    
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ outline: 'solid' }}
      >
        <Card className={classes.form}>
          <h2
            style={{
              fontFamily: "Baskerville",
              marginBottom: 20,
              marginTop: 5,
              textAlign: "center",
            }}
          >
            Choose Museum
          </h2>
          <FormControl fullWidth>
            <InputLabel id="museum">Museum</InputLabel>
            <Select
              sx={{ display: "flex", marginBottom: "13px" }}
              name="museum"
              id="museum"
              label="museum"
              value={museum}
              onChange={(event) => setMuseum(event.target.value)}
            >
              {museums.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.museum_name}>
                    {item.museum_name}
                  </MenuItem>
                );
              })}
            </Select>
            <div style={{ margin: 12, textAlign: "center" }}>
              <Button onClick={handleClose} type="submit" variant="contained">
                Confirm Museum
              </Button>
            </div>
          </FormControl>
        </Card>
      </Modal>
      <Grid
        container
        className={classes.root}
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ padding: "0" }}
      >
        <Grid item xs={false}>
          <Card
            className={classes.card}
            sx={{ maxWidth: 400, backgroundcolor: "#FFFFFF" }}
          >
            Hi
          </Card>
        </Grid>
        <Grid item xs={false}>
          <Card
            className={classes.card}
            sx={{ maxWidth: 400, backgroundcolor: "#FFFFFF" }}
          >
            <CardContent
              className={classes.card}
              sx={{ backgroundColor: "#FFFFFF" }}
            >
              <Typography
                className={classes.typography}
                gutterBottom
                variant="h4"
                component="div"
              >
                <b className={classes.typography}>Change Fields</b>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Card
          sx={{ height: 200, width: 300, backgroundcolor: "#FFFFFF", marginTop: 12, }}
        >
          <Typography
            className={classes.typography}
            gutterBottom
            variant="h4"
            component="div"
            style={{
              marginTop: 50,
            }}
          >
            <b className={classes.typography}>Delete Account</b>
          </Typography>
          <Button
            type="submit"
            style={{
              marginTop: 5,
              color: "#F6F7EB",
              backgroundColor: "cornflowerblue",
              fontFamily: "Baskerville",
            }}
            variant="contained"
            className={classes.submit}
            onClick={handleOpen}
          >
            Change Museum
          </Button>
        </Card>
      </Grid>
    </div>
  );
}

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
