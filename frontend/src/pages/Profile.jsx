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

export function Profile() {
  const navigate = useNavigate();
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [newpass, setNewPass] = useState("");
  const [oldpass, setOldPass] = useState("");
  const [newPhotoId, setNewPhotoId] = useState("");
  const [photos, setPhotos] = useState("");
  const [university, setUniversity] = useState("");
  const [bio, setBio] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [userForm, setuserForm] = useState({
    userName: "",
    password: "",
  });

  useEffect(() => {
    var repository = new Repository();
    repository.getPhoto().then((x) => setPhotos(x));
  }, []);

  if (!photos) {
    return <></>;
  }

  // handle input form submission to backend via POST request
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("HERE");
    var repository = new Repository();
    repository.postUser(photos, university, bio).then((x) => {
      // if (typeof x.error != "undefined") {
      //   alert("Invalid Credentials")
      // } else {
      //   window.location.href = "/profile";
      // }
    });
  };
  
  const handleDelete = () => {
    var repository = new Repository();
    repository.deleteUser(sessionStorage.jwt).then((x) => {
      console.log("Deleted!");
    });
    sessionStorage.jwt = "";
    sessionStorage.director = "";
    window.location.href = "/"
  };

  const Logout = (e) => {
    sessionStorage.jwt = "";
    sessionStorage.director = "";
    window.location.href = "/"
  };

  return (
    <div className="profile" style={{ textAlign: "center" }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card className={classes.form}>
          <h2
            style={{
              fontFamily: "Baskerville",
              margin: 10,
              textAlign: "center",
            }}
          >
            Update Password
          </h2>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="oldpass"
            label="Old Password"
            type="oldpass"
            id="oldpass"
            value={oldpass}
            onInput={(e) => setOldPass(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="newpass"
            label="New Password"
            type="newpass"
            id="newpass"
            value={newpass}
            onInput={(e) => setNewPass(e.target.value)}
          />
          <div style={{ margin: 12, textAlign: "center" }}>
            <Button onClick={handleClose} type="submit" variant="contained">
              Confirm
            </Button>
          </div>
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <Button onClick={handleClose}>Cancel</Button>
          </div>
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
            <CardMedia
              component="img"
              height="500vh"
              width="auto"
              image={photos[13].photo_data}
              alt="profile"
            />
            <div style={{ marginTop: 10, marginBottom: 20 }}>
              <Typography
                className={classes.typography}
                gutterBottom
                variant="h4"
                component="div"
              >
                <b className={classes.typography}>{photos[2].caption}</b>
              </Typography>
              <Typography className={classes.typography} variant="body1">
                <b className={classes.typography}>University:</b> Southern
                Methodist University
              </Typography>
              <Typography className={classes.typography} variant="body1">
                <b className={classes.typography}>Bio:</b> This is a sentence
                about the person.
              </Typography>
              { 
                sessionStorage.director &&
                (<div>
                  <Button
                    type="submit"
                    style={{
                      marginTop: 12,
                      color: "#F6F7EB",
                      backgroundColor: "cornflowerblue",
                      fontFamily: "Baskerville",
                    }}
                    variant="contained"
                    className={classes.submit}
                    onClick={() => { navigate('director'); }}
                  >
                    Your Museum
                  </Button>
                </div>)
              }
              <div>
                <Button
                  type="submit"
                  style={{
                    marginTop: 12,
                    color: "#F6F7EB",
                    backgroundColor: "cornflowerblue",
                    fontFamily: "Baskerville",
                  }}
                  variant="contained"
                  className={classes.submit}
                  onClick={Logout}
                >
                  Log Out
                </Button>
              </div>
            </div>
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
              <FormControl sx={{ mt: 1 }} size="large">
                <form noValidate onSubmit={handleSubmit}>
                  <InputLabel id="photo">Photo</InputLabel>
                  <Select
                    sx={{ display: "flex" }}
                    name="photo"
                    id="photo"
                    label="photo"
                    value={newPhotoId}
                    onChange={(event) => setNewPhotoId(event.target.value)}
                  >
                    {photos.map((photo, index) => {
                      if (photo.is_profile) {
                        return (
                          <MenuItem key={index} value={photo.photoId}>
                            {photo.caption}
                          </MenuItem>
                        );
                      }
                      return undefined;
                    })}
                  </Select>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="university"
                    label="University"
                    type="university"
                    id="university"
                    value={university}
                    onInput={(e) => setUniversity(e.target.value)}
                  />
                  <TextField
                    sx={{ mb: 3, mt: 1 }}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="bio"
                    label="Bio"
                    type="bio"
                    id="bio"
                    value={bio}
                    onInput={(e) => setBio(e.target.value)}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    style={{
                      color: "#F6F7EB",
                      backgroundColor: "cornflowerblue",
                      fontFamily: "Baskerville",
                    }}
                    variant="contained"
                    className={classes.submit}
                  >
                    Confirm Changes
                  </Button>
                </form>
                <Button
                  sx={{ color: "cornflowerblue", mt: 1 }}
                  style={{
                    color: "cornflowerblue",
                    fontFamily: "Baskerville",
                  }}
                  onClick={handleOpen}
                >
                  Change Password
                </Button>
              </FormControl>
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
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Card>
        <Grid item xs={9}>
          <Card>
            <CardContent sx={{ maxWidth: 400, backgroundcolor: "#FFFFFF" }}>
              <h2
                style={{ fontSize: 50, fontFamily: "Baskerville", margin: 10 }}
              >
                My Tours
              </h2>
              <hr />
              <Typography className={classes.typography} variant="body2">
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
            </CardContent>
          </Card>
        </Grid>
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
