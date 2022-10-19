import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import "./App.css";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

// React functional component
function App() {
  // state for storage of the information on the webpage of forms and list, uses hooks
  const [number, setNumber] = useState('');
  const [values, setValues] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // ENTER YOUR EC2 PUBLIC IP/URL HERE
  const ec2_url = "";
  // CHANGE THIS TO TRUE IF HOSTING ON EC2, MAKE SURE TO ADD IP/URL ABOVE
  const ec2 = false;
  // USE localhost OR ec2_url ACCORDING TO ENVIRONMENT
  const url = ec2 ? ec2_url : "localhost";

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
    console.log(username, password);
    axios
      .post(`http://${url}:8000/login`, { username: username, password: password})
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
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

      <div className="Front-body">
        <section id="homeView">
          <h1>Artt.</h1>
          <img src="https://via.placeholder.com/100" alt="placeholder"></img>

          <div>
            <section id="carousel">
              <article className="tile">
                <h2>Dallas Museum of Art</h2>
                <img
                  src="https://via.placeholder.com/100"
                  alt="placeholder"
                ></img>
              </article>

              <article className="tile">
                <h2>Perot Museum of Natural History</h2>
                <img
                  src="https://via.placeholder.com/100"
                  alt="placeholder"
                ></img>
              </article>

              <article className="tile">
                <h2>Bush Presidential Center</h2>
                <img
                  src="https://via.placeholder.com/100"
                  alt="placeholder"
                ></img>
              </article>

              <article className="tile">
                <h2>Meadows Museum</h2>
                <img
                  src="https://via.placeholder.com/100"
                  alt="placeholder"
                ></img>
              </article>
            </section>
          </div>
        </section>
      </div>

      <div className="loginBody">
        <section id="loginView">
          <h2>Login</h2>
          <form className="form-field required" onSubmit={handleSubmit}>
            <TextField
              required
              value={username} 
              onInput={(e) => setUsername(e.target.value)} 
              id="username-required"
              label="Username"
              sx = {{ mb: 2 }}
            />
            <Typography />
            <TextField
              required
              value={password} 
              onInput={(e) => setPassword(e.target.value)} 
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <Typography />
            <Button variant="submit" type="submit" label="Submit"
              sx = {{ m: 2, background: '#7F96FF', color: '#282c34', p: 1 }}> Submit
            </Button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default App;
