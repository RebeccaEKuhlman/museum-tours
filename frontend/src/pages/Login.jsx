import React, { useEffect, useState } from "react";
import { Typography, Card, CardActions, CardContent, CardMedia } from "@material-ui/core";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import "./Login.css";
import { Repository } from "./repository";

// React functional component
export function Login () {

  // state for storage of the information on the webpage of forms and list, uses hooks
  const [number, setNumber] = useState("");
  const [values, setValues] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
    repository.getLogin(username, password).then(x => 
      {
        if (typeof x.data != "undefined") {
          alert("Logged in");
        } else if (x.error) {
          alert("Invalid Credentials")
        }
      });
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

  // handle intialization and setup of database table, can reinitialize to wipe db
  // const reset = () => {
  //   axios
  //     .post(`http://${url}:8000/reset`)
  //     .then((res) => {
  //       console.log(res);
  //       fetchVals();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // tell app to fetch values from db on first load (if initialized)
  // the comment below silences an error that doesn't matter.=
  // useEffect(() => {
  //   fetchVals();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div className="Front-div">
      <header className="Front-header">
        <nav>
          <p>Login</p>
        </nav>
      </header>
      <body className="Front-body">
        <section id="homeView">
          <div>
            <section id="carousel">
              <Card
                sx={{
                  maxWidth: 400,
                  margin: "auto",
                  transition: "0.3s",
                  m: 5,
                  p: 5,
                  boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
                  "&:hover": {
                    boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  alt="dma"
                  height="200"
                  image="https://www.dma.org/sites/default/files/dma-logo.png"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Dallas Museum of Art
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Art museum with more than 24,000 works of art from around
                    the world ranging from ancient to modern times. Located in
                    downtown Dallas.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
              <Card
                sx={{
                  maxWidth: 400,
                  margin: "auto",
                  transition: "0.3s",
                  m: 5,
                  p: 5,
                  boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
                  "&:hover": {
                    boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  alt="perot"
                  height="200"
                  image="http://photos.prnewswire.com/prnfull/20120531/DC16400LOGO"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Perot Museum of Natural Science
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Dallas's natural history museum. Focuses on innovation,
                    archaeology, and curiosity. Located in downtown Dallas.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
              <Card
                sx={{
                  maxWidth: 400,
                  margin: "auto",
                  transition: "0.3s",
                  m: 5,
                  p: 5,
                  boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
                  "&:hover": {
                    boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  alt="bush_center"
                  height="200"
                  image="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Official_logo_of_the_George_W._Bush_Presidential_Library.svg/1200px-Official_logo_of_the_George_W._Bush_Presidential_Library.svg.png"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    George Bush Presidential Library
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Presidential Library and think tank of George W. Bush.
                    Located on the campus of SMU.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
              <Card
                sx={{
                  maxWidth: 400,
                  margin: "auto",
                  transition: "0.3s",
                  m: 5,
                  p: 5,
                  boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
                  "&:hover": {
                    boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  alt="meadows_museum"
                  height="200"
                  image="https://meadowsmuseumdallas.org/wp-content/uploads/2017/02/MUSE_retina.png"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Meadows Museum
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    The largest collection of Spanish art outside of Spain.
                    Located on the campus of SMU.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </section>
          </div>
        </section>
      </body>
      <body className="loginBody">
        <section id="loginView">
          <h2>LOGIN</h2>
          <hr class="break" />
          <form class="form-field required" onSubmit={handleSubmit}>
            <TextField
              required
              value={username} 
              onInput={(e) => setUsername(e.target.value)} 
              id="username-required"
              label="Username"
              defaultValue=""
              sx={{
                mb: 2,
                width: 250,
                background: "white",
              }}
            />
            <TextField
              required
              value={password} 
              onInput={(e) => setPassword(e.target.value)} 
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              sx={{
                mb: 2,
                width: 250,
                background: "white",
              }}
            />
            <div />
            <Button
              variant="submit"
              type="submit"
              label = "Submit"
              sx={{
                m: 2,
                background: "#7F96FF",
                color: "#F6F7EB",
                p: 1,
                width: 250,
                fontWeight: "bold",
                "&:hover": { color: "#7F96FF" },
              }}> Submit
            </Button>
            <h4>New? Register here.</h4>
          </form>
        </section>
      </body>
    </div>
  );
};