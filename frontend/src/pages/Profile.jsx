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
              <h2 style={{ fontSize: 50, fontFamily: "Baskerville", margin: 10 }}>My Tours 🤨📸</h2>
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
                Caught you in 8K UHD surround sound 16 Gigs ram, HDR GEFORCE RTX, TI-80 texas insturments, Triple A duracell battery ultrapower100 Cargador Compatible iPhone 1A 5 W 1400 + Cable 100% 1 Metro Blanco Compatible iPhone 5 5 C 5S 6 SE 6S 7 8 X XR XS XS MAX GoPro hero 1 2 terrabyte xbox series x Dell UltraSharp 49 Curved Monitor - U4919DW Sony HDC-3300R 2/3" CCD HD Super Motion Color Camera, 1080p Resolution Toshiba EM131A5C-SS Microwave Oven with Smart Sensor, Easy Clean Interior, ECO Mode and Sound On/Off, 1.2 Cu. ft, Stainless Steel HP LaserJet Pro M404n Monochrome Laser Printer with Built-in Ethernet (W1A52A) GE Voluson E10 Ultrasound Machine LG 23 Cu. Ft. Smart Wi-Fi Enabled InstaView Door-in-Door Counter-Depth Refrigerator with Craft Ice Maker GFW850SPNRS GE 28" Front Load Steam Washer 5.0 Cu. Ft. with SmartDispense, WiFi, OdorBlock and Sanitize and Allergen - Royal Sapphire Kohler K-3589 Cimarron Comfort Height Two-Piece Elongated 1.6 GPF Toilet with AquaPiston Flush Technology., Quick Charge 30W Cargador 3.0 Cargador de Viaje Enchufe Cargador USB Carga Rápida con 3 Puertos carga rápida Adaptador de Corriente para iPhone x 8 7 Xiaomi Pocophone F1 Mix 3 A1 Samsung S10 S9 S8AUKEY Quick Charge 3.0 Cargador de Pared 39W Dual Puerto Cargador Móvil para Samsung Galaxy S8 / S8+/ Note 8, iPhone XS / XS Max / XR, iPad Pro / Air, HTC 10, LG G5 / G6 AUKEY Quick Charge 3.0 Cargador USB 60W 6 Puerto Cargador Móvil para Samsung Galaxy S8 / S8+ / Note 8, LG G5 / G6, Nexus 5X / 6P, HTC 10, iPhone XS / XS Max / XR, iPad Pro/ Air, Moto G4 SAMSUNG 85-inch Class Crystal UHD TU-8000 Series - 4K UHD HDR Smart TV with Alexa Built-in (UN85TU8000FXZA, 2020 Model) GE 38846 Premium Slim LED Light Bar, 18 Inch Under Cabinet Fixture, Plug-In, Convertible to Direct Wire, Linkable 628 Lumens, 3000K Soft Warm White, High/Off/Low, Easy to Install, 18 Ft Bissell Cleanview Swivel Pet Upright Bagless Vacuum Cleaner Trane20,000-Watt 1-Phase LPG/NG Liquid Cooled Whole House Standby Generator.Caught you in 8K UHD surround sound 16 Gigs ram, HDR GEFORCE RTX, TI-80 texas insturments, Triple A duracell battery ultrapower100 Cargador Compatible iPhone 1A 5 W 1400 + Cable 100% 1 Metro Blanco Compatible iPhone 5 5 C 5S 6 SE 6S 7 8 X XR XS XS MAX GoPro hero 1 2 terrabyte xbox series x Dell UltraSharp 49 Curved Monitor - U4919DW Sony HDC-3300R 2/3" CCD HD Super Motion Color Camera, 1080p Resolution Toshiba EM131A5C-SS Microwave Oven with Smart Sensor, Easy Clean Interior, ECO Mode and Sound On/Off, 1.2 Cu. ft, Stainless Steel HP LaserJet Pro M404n Monochrome Laser Printer with Built-in Ethernet (W1A52A) GE Voluson E10 Ultrasound Machine LG 23 Cu. Ft. Smart Wi-Fi Enabled InstaView Door-in-Door Counter-Depth Refrigerator with Craft Ice Maker GFW850SPNRS GE 28" Front Load Steam Washer 5.0 Cu. Ft. with SmartDispense, WiFi, OdorBlock and Sanitize and Allergen - Royal Sapphire Kohler K-3589 Cimarron Comfort Height Two-Piece Elongated 1.6 GPF Toilet with AquaPiston Flush Technology., Quick Charge 30W Cargador 3.0 Cargador de Viaje Enchufe Cargador USB Carga Rápida con 3 Puertos carga rápida Adaptador de Corriente para iPhone x 8 7 Xiaomi Pocophone F1 Mix 3 A1 Samsung S10 S9 S8AUKEY Quick Charge 3.0 Cargador de Pared 39W Dual Puerto Cargador Móvil para Samsung Galaxy S8 / S8+/ Note 8, iPhone XS / XS Max / XR, iPad Pro / Air, HTC 10, LG G5 / G6 AUKEY Quick Charge 3.0 Cargador USB 60W 6 Puerto Cargador Móvil para Samsung Galaxy S8 / S8+ / Note 8, LG G5 / G6, Nexus 5X / 6P, HTC 10, iPhone XS / XS Max / XR, iPad Pro/ Air, Moto G4 SAMSUNG 85-inch Class Crystal UHD TU-8000 Series - 4K UHD HDR Smart TV with Alexa Built-in (UN85TU8000FXZA, 2020 Model) GE 38846 Premium Slim LED Light Bar, 18 Inch Under Cabinet Fixture, Plug-In, Convertible to Direct Wire, Linkable 628 Lumens, 3000K Soft Warm White, High/Off/Low, Easy to Install, 18 Ft Bissell Cleanview Swivel Pet Upright Bagless Vacuum Cleaner Trane20,000-Watt 1-Phase LPG/NG Liquid Cooled Whole House Standby Generator.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}