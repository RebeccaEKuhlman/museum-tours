import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Repository } from "../api/repository";

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
    primary: {
      main: "#7F96FF",
    },
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
    button: {
      primary: "#7F96FF",
    },
  },
  root: {
    height: "calc(100vh - 64px)",
  },
  image: {
    backgroundImage:
      "url(https://texashighways.com/wp-content/uploads/2021/11/drive-ticket-alamosaurus.jpg)",
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
    color: "error",
    bgcolor: "error",
  },
}));

// React functional component
export function Login() {
  const classes = useStyles();

  // state for storage of the information on the webpage of forms and list, uses hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validity, setValidity] = useState("");

  // ENTER YOUR EC2 PUBLIC IP/URL HERE
  const ec2_url = "";
  // CHANGE THIS TO TRUE IF HOSTING ON EC2, MAKE SURE TO ADD IP/URL ABOVE
  const ec2 = false;
  // USE localhost OR ec2_url ACCORDING TO ENVIRONMENT
  const url = ec2 ? ec2_url : "localhost";

  var repository = new Repository();
  
  // handle input form submission to backend via POST request
  const handleSubmit = (e) => {
    e.preventDefault();
    repository.postLogin(email, password).then((x) => {
      if (typeof x.error === "undefined") {
        sessionStorage.email = x.email;
        sessionStorage.jwt = x.jwt;
        sessionStorage.director = x.is_director;
        window.location.href = "/profile";
      }
    }).catch((x) => {
      setValidity("Invalid Credentials. Please Try Again.")
    });

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
            LOGIN
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
              style={{ fontFamily: "Baskerville" }}
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
              style={{ fontFamily: "Baskerville", marginBottom: "21px" }}
            />
            {validity &&
              <p style={{
                color: "#EC0B43",
                fontFamily: "Baskerville",
                fontSize: "16px",
                marginTop: 0,
                marginBottom: 0
              }}>
                {validity}
              </p>
            }
            <Button
              style={{
                color: "#FFFFFF",
                backgroundColor: "#7F96FF",
                fontFamily: "Baskerville",
                marginTop: "4px",
                marginBottom: "4px"
              }}
              type="submit"
              fullWidth
              variant="contained"
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link
                  href="/registration"
                  variant="body2"
                  style={{
                    color: "#7F96FF",
                    fontFamily: "Baskerville",
                    fontSize: "16px"
                  }}
                >
                  {"Don't have an account? Sign Up"}
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
