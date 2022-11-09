import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from '@mui/material/FormControl';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from "@material-ui/core/Checkbox";
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
  }
}));

export function Profile() {
  const classes = useStyles();

  const [ newpass, setNewPass ] = useState('');
  const [ oldpass, setOldPass ] = useState('');
  const [ newPhotoId, setNewPhotoId ] = useState('');
  const [ photos, setPhotos ] = useState('');
  const [ university, setUniversity ] = useState('');
  const [ bio, setBio ] = useState('');
  const [ darken, setDarken ] = useState(false);
  const [ showForm, setShowForm ] = useState(false);
  const [ userForm, setuserForm ] = useState({
    userName: "",
    password: "",
  });

  useEffect(() => {
    var repository = new Repository();
    repository.getPhoto().then(x => setPhotos(x));
  }, []);

  if (!photos) {
    return <></>;
  }

  // handle input form submission to backend via POST request
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("HERE");
    var repository = new Repository();
    repository.postUser(photos, university, bio).then(x => 
      {
        // if (typeof x.error != "undefined") {
        //   alert("Invalid Credentials")
        // } else {
        //   window.location.href = "/profile";
        // }
        alert("Updated");
      });
  };

  const toggleForm = () => { 
    console.log("Toggle");
    setShowForm(!showForm);
    if (!darken) setDarken(['brightness(0.3)', 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))', 'none']);
    else setDarken(false);
  }

  return (
    <div className="profile" style={{ textAlign: "center" }}>
      {showForm && (
        <Card className={classes.form}>
          <h2 style={{ fontFamily: "Baskerville", margin: 10 }}>Update Password</h2>
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
          <div style={{ margin: 12 }}>
            <Button
              onClick={toggleForm}
              type="submit"
              variant="contained"
            >
              Confirm
            </Button>
          </div>
          <div style={{ marginTop: 16 }}>
            <Button
              onClick={toggleForm}
            >
              Cancel
            </Button>
          </div>
        </Card>
      )}
      <Grid
        container
        className={classes.root}
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ padding: "0", filter: darken[0], background: darken[1], pointerEvents: darken[2] }}
      >
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={false}>
          <Card
            className={classes.card}
            sx={{ maxWidth: 345, backgroundcolor: "#FFFFFF" }}
          >
            <CardMedia
              component="img"
              height="500vh"
              width="auto"
              image={photos[13].photo_data}
              alt="profile"
            />
          </Card>
        </Grid>
        <Grid item xs={false}>
          <Card
            className={classes.card}
            sx={{ maxWidth: 345, backgroundcolor: "#FFFFFF" }}
          >
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
                {photos[2].caption}
              </Typography>
              <Typography
                className={classes.typography}
                variant="body2"
              >
                This is a sentence about the person.
              </Typography>
              <FormControl sx={{ mt: 4 }} size="large">
                <form noValidate onSubmit={handleSubmit}>
                  <InputLabel id="photo">Photo</InputLabel>
                  <Select
                    sx={{ display: "flex" }}
                    name="photo"
                    id="photo"
                    label="photo"
                    value={newPhotoId}
                    onChange={event => setNewPhotoId(event.target.value)}
                  >
                    {
                      photos.map((photo, index) => {
                        if (photo.is_profile) {
                          return <MenuItem key={index} value={photo.photoId}>{photo.photoId}</MenuItem>
                        } 
                        return undefined
                      })
                    }
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
                    sx={{mb: 4, mt: 1}}
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
                    variant="contained"
                    className={classes.submit}
                  >
                    Update Credentials
                  </Button>
                </form>
                <Button
                  sx={{ color: "cornflowerblue", mt: 2 }}
                  onClick={toggleForm}
                >
                  Change Password
                </Button>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={9}>
          <Card>
            <CardContent
              sx={{ backgroundColor: "#FFFFFF", width: "40rem" }}
            >
              <h2 style={{ fontSize: 50, fontFamily: "Baskerville", margin: 10 }}>My Tours</h2>
              <hr/>
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
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}