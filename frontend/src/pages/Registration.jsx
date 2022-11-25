import React, { useEffect, useState } from 'react';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Repository } from './repository';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Version "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
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
      primary: "#323031",
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
  image: {
    backgroundImage:
      "url(https://glasstire.com/wp-content/uploads/2018/09/Texas-Artist-Ludwig-Schwarz-Dallas-Museum-of-Art-paintings-from-Conduit-Gallery-3-1170x742.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// React functional component
export function Registration() {
  const classes = useStyles();

  // state for storage of the information on the webpage of forms and list, uses hooks
  // const [number, setNumber] = useState("");
  // const [values, setValues] = useState([]);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [director, setDirector] = useState('');

  // ENTER YOUR EC2 PUBLIC IP/URL HERE
  const ec2_url = "";
  // CHANGE THIS TO TRUE IF HOSTING ON EC2, MAKE SURE TO ADD IP/URL ABOVE
  const ec2 = false;
  // USE localhost OR ec2_url ACCORDING TO ENVIRONMENT
  const url = ec2 ? ec2_url : "localhost";

  var repository = new Repository();
  // handle input field state change
  // const handleChange = (e) => {
  //   setNumber(e.target.value);
  // };

  // const fetchBase = () => {
  //   axios.get(`http://${url}:8000/`).then((res) => {
  //     alert(res.data);
  //   });
  // };

  // fetches vals of db via GET request
  // const fetchVals = () => {
  //   axios
  //     .get(`http://${url}:8000/values`)
  //     .then((res) => {
  //       const values = res.data.data;
  //       console.log(values);
  //       setValues(values);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // handle input form submission to backend via POST request
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      alert("Passwords Must Match!")
    }
    else {
      repository.postRegristration(email, username, password, director).then(x => {
        if (typeof x.error != "undefined") {
          alert("Error: Unable To Sign Up")
        } else {
          sessionStorage.email = x.email;
          sessionStorage.jwt = x.jwt;
          sessionStorage.director = x.is_director;
          window.location.href = "/profile";
        }
      });
    }
    // axios
    // .get(`http://${url}:8000/login`, {
    //   data: {
    //     username: username, 
    //     password: password
    //   }
    // })
    // .then((res) => {
    //   console.log("res");
    //   console.log(res);
    // })
    // .catch((err) => {
    //   console.log("logging error");
    //   console.log(err);
    // });
    // Do Something With Result (Route to New Location)
  };

  return (
    <Grid
      container
      component="main"
      className={classes.root}
      sx={{ backgroundcolor: "#F6F7EB" }}
    >
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}></Avatar>
          <Typography
            component="h1"
            className="title"
          >
            REGISTER
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={email}
              onInput={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={username}
              onInput={(e) => setUsername(e.target.value)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onInput={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirm-password"
              label="Confirm Password"
              type="password"
              id="confirm-password"
              value={confirmpassword}
              onInput={(e) => setConfirmPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value={director} fontFamily="Baskerville" onChange={() => setDirector(!director)} />}
              style={{ color: "#323031" }}
              label="Museum Director?"
            />
            <Button
              style={{ color: "#FFFFFF", backgroundColor: "#7F96FF", marginTop: "6px", marginBottom: "4px" }}
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link
                  href="#"
                  variant="body2"
                  style={{
                    color: "#7F96FF",
                    fontFamily: "Baskerville",
                  }}
                >
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link
                  href="/Login"
                  variant="body2"
                  style={{
                    color: "#7F96FF",
                    fontFamily: "Baskerville",
                  }}
                >
                  {"Have an account? Log in"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
