import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
//import Carousel from 'react-material-ui-carousel'

// React functional component
function App () {
  // state for storage of the information on the webpage of forms and list, uses hooks
  const [number, setNumber] = useState("")
  const [values, setValues] = useState([])

  // ENTER YOUR EC2 PUBLIC IP/URL HERE
  const ec2_url = ''
  // CHANGE THIS TO TRUE IF HOSTING ON EC2, MAKE SURE TO ADD IP/URL ABOVE
  const ec2 = false;
  // USE localhost OR ec2_url ACCORDING TO ENVIRONMENT
  const url = ec2 ? ec2_url : 'localhost'

  // handle input field state change
  const handleChange = (e) => {
    setNumber(e.target.value);
  }

  const fetchBase = () => {
    axios.get(`http://${url}:8000/`).then((res)=>{
      alert(res.data);
    })
  }

  // fetches vals of db via GET request
  const fetchVals = () => {
    axios.get(`http://${url}:8000/values`).then(
      res => {
        const values = res.data.data;
        console.log(values);
        setValues(values)
    }).catch(err => {
      console.log(err)
    });
  }

  // handle input form submission to backend via POST request
  const handleSubmit = (e) => {
    e.preventDefault();
    let prod = number * number;
    axios.post(`http://${url}:8000/multplynumber`, {product: prod}).then(res => {
      console.log(res);
      fetchVals();
    }).catch(err => {
      console.log(err)
    });;
    setNumber("");
  }

  // handle intialization and setup of database table, can reinitialize to wipe db
  const reset = () => {
    axios.post(`http://${url}:8000/reset`).then(res => {
      console.log(res);
      fetchVals();
    }).catch(err => {
      console.log(err)
    });;
  }

  // tell app to fetch values from db on first load (if initialized)
  // the comment below silences an error that doesn't matter.=
  useEffect(() => {
    fetchVals();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="Front-div">
      <header className = "Front-header">
      <nav>
        <p>Login</p>
      </nav>
      </header>

      <body className="Front-body">
        <section id="homeView">
       <h1>Artt.</h1>
       <img src = "https://via.placeholder.com/100" alt = "placeholder">
         </img>

      <div>
        <article className = "tile">
          <h2>Dallas Museum of Art</h2>
          <img src = "https://via.placeholder.com/100" alt = "placeholder">
         </img>
        </article>

        <article className = "tile">
          <h2>Perot Museum of Natural History</h2>
          <img src = "https://via.placeholder.com/100" alt = "placeholder">
         </img>
        </article>

        <article className = "tile">
          <h2>Bush Presidential Center</h2>
          <img src = "https://via.placeholder.com/100" alt = "placeholder">
         </img>
        </article>

        <article className = "tile">
          <h2>Meadows Museum</h2>
          <img src = "https://via.placeholder.com/100" alt = "placeholder">
         </img>
        </article>
        </div>
        </section>
      </body>
     
    </div>
    
  );
}

export default App;
