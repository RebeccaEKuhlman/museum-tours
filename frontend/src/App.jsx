import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel'
import { Card, CardContent, CardMedia, Typography, Grid, Button } from "@material-ui/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import autoBind from 'auto-bind';
import axios from 'axios';
import './App.css';

import Login from "./pages/Login";
import NoPage from "./pages/NoPage";

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

  function Banner(props) {
    if (props.newProp) console.log(props.newProp);
    const contentPosition = props.contentPosition
      ? props.contentPosition
      : "left";
    const totalItems = props.length ? props.length : 3;
    const mediaLength = totalItems - 1;
  
    let items = [];
    const content = (
      <Grid item xs={12 / totalItems} key="content">
        <CardContent className="Content">
          <Typography className="Title">{props.item.Name}</Typography>
          <Typography className="Caption">{props.item.Caption}</Typography>
          <Button variant="outlined" className="ViewButton">
            View Now
          </Button>
        </CardContent>
      </Grid>
    );
  
    // for (let i = 0; i < mediaLength; i++) {
    //   const item = props.item.Items[i];
    //   const media = (
    //     <Grid item xs={12 / totalItems} key={item.Name}>
    //       <CardMedia className="Media" image={item.Image} title={item.Name}>
    //         <Typography className="MediaCaption">{item.Name}</Typography>
    //       </CardMedia>
    //     </Grid>
    //   );
    //   items.push(media);
    // }
  
    if (contentPosition === "left") {
      items.unshift(content);
    } else if (contentPosition === "right") {
      items.push(content);
    } else if (contentPosition === "middle") {
      items.splice(items.length / 2, 0, content);
    }
  
    return (
      <Card raised className="Banner">
        <Grid container spacing={0} className="BannerGrid">
          {items}
        </Grid>
      </Card>
    );
  }

  let items = [
    {
      Name: "First",
      Image: "",
      contentPosition: "left",
      Items: [

      ]
    },
    {
      Name: "Second",
      Image: "",
      contentPosition: "middle",
      Items: [

      ]
    },
    {
      Name: "Third",
      Image: "",
      contentPosition: "right",
      Items: [

      ]
    },
  ]

  
  let state = {
    autoPlay: true,
    animation: "fade",
    indicators: true,
    timeout: 500,
    navButtonsAlwaysVisible: false,
    navButtonsAlwaysInvisible: false,
    cycleNavigation: true
  };


    // toggleAutoPlay() {
    //   this.setState({
    //     autoPlay: !this.state.autoPlay
    //   });
    // }
  
    // toggleIndicators() {
    //   this.setState({
    //     indicators: !this.state.indicators
    //   });
    // }
  
    // toggleNavButtonsAlwaysVisible() {
    //   this.setState({
    //     navButtonsAlwaysVisible: !this.state.navButtonsAlwaysVisible
    //   });
    // }

    // toggleNavButtonsAlwaysInvisible() {
    //   this.setState({
    //     navButtonsAlwaysInvisible: !this.state.navButtonsAlwaysInvisible
    //   });
    // }
  
    // toggleCycleNavigation() {
    //   this.setState({
    //     cycleNavigation: !this.state.cycleNavigation
    //   });
    // }
  
    // changeAnimation(event) {
    //   this.setState({
    //     animation: event.target.value
    //   });
    // }

    // changeTimeout(event, value) {
    //   this.setState({
    //     animation: value
    //   });
    // }

  return (
    <div className="Front-div">
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="*" element={<NoPage />} />
          </Route>
          <Route path="/login" element={<Login />}>
          </Route>
        </Routes>
      </BrowserRouter> */}
      <header className = "Front-header">
        <nav>
          <p>Login</p>
        </nav>
      </header>
      <body className="Front-body">
        <section id="homeView">
          <Carousel
          className="Example"
          autoPlay={state.autoPlay}
          animation={state.animation}
          indicators={state.indicators}
          timeout={state.timeout}
          cycleNavigation={state.cycleNavigation}
          navButtonsAlwaysVisible={state.navButtonsAlwaysVisible}
          navButtonsAlwaysInvisible={state.navButtonsAlwaysInvisible}
          next={(now, previous) =>
            console.log(
              `Next User Callback: Now displaying child${now}. Previously displayed child${previous}`
            )
          }
          prev={(now, previous) =>
            console.log(
              `Prev User Callback: Now displaying child${now}. Previously displayed child${previous}`
            )
          }
          onChange={(now, previous) =>
            console.log(
              `OnChange User Callback: Now displaying child${now}. Previously displayed child${previous}`
            )
          }
          // fullHeightHover={false}
          // navButtonsProps={{style: {backgroundColor: 'cornflowerblue', borderRadius: 0}}}
          // navButtonsWrapperProps={{style: {bottom: '0', top: 'unset', }}}
          // indicatorContainerProps={{style: {margin: "20px"}}}
          // NextIcon='next'
        >
          {items.map((item, index) => {
            return (
              <Banner
                item={item}
                key={index}
                contentPosition={item.contentPosition}
              />
            );
          })}
        </Carousel>
          <h1>Artt.</h1>
          <img src = "https://via.placeholder.com/100" alt = "placeholder"></img>
          <div>
            <article className = "tile">
              <h2>Dallas Museum of Art</h2>
              <img src = "https://via.placeholder.com/100" alt = "placeholder"></img>
            </article>
            <article className = "tile">
              <h2>Perot Museum of Natural History</h2>
              <img src = "https://via.placeholder.com/100" alt = "placeholder"></img>
            </article>
            <article className = "tile">
              <h2>Bush Presidential Center</h2>
              <img src = "https://via.placeholder.com/100" alt = "placeholder"></img>
            </article>
            <article className = "tile">
              <h2>Meadows Museum</h2>
              <img src = "https://via.placeholder.com/100" alt = "placeholder"></img>
            </article>
          </div>
        </section>
      </body>
    </div>
  );
}

export default App;
