import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Paper } from "@material-ui/core";
import Carousel from 'react-material-ui-carousel'
import autoBind from 'auto-bind';
import axios from 'axios';
import './Home.css';

// React Functional Component
export function Home () {
  function Project(props) {
    let items = [(
      <Paper
        className="Project"
        style={{ backgroundColor: props.item.Color }}
        elevation={10}
        key={props.item.Name}
      >
        <CardContent className="Content">
          <Typography className="Title">{props.item.Name}</Typography>
          <br/>
          <Typography className="Caption">{props.item.Caption}</Typography>
          <Button variant="outlined" className="ViewButton" style={{color: 'white'}}>
            View Now
          </Button>
        </CardContent>
      </Paper>
    )];

    // if (props.newProp) console.log(props.newProp);
    // const contentPosition = props.contentPosition
    //   ? props.contentPosition
    //   : "left";
    // const totalItems = props.length ? props.length : 3;
    // const mediaLength = totalItems - 1;
  
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
  
    // if (contentPosition === "left") {
    //   items.unshift(content);
    // } else if (contentPosition === "right") {
    //   items.push(content);
    // } else if (contentPosition === "middle") {
    //   items.splice(items.length / 2, 0, content);
    // }
  
    return (
      <Card raised className="Project">
        {items}
      </Card>
    );

  }

  let items = [
    {
      Name: "Dallas Museum of Art",
      Image: "https://via.placeholder.com/100",
      Caption: "Wow! A Museum!",
      Color: "#282c34",
      // Items: [
      //   {
      //     Name: "Dallas Museum of Art",
      //     Image: "https://via.placeholder.com/100"
      //   }
      // ]
    },
    {
      Name: "Perot Museum of Natural History",
      Image: "https://via.placeholder.com/100",
      Caption: "Wow! A Museum!",
      Color: "#282c34",
    },
    {
      Name: "Bush Presidential Center",
      Image: "https://via.placeholder.com/100",
      Caption: "Wow! A Museum!",
      Color: "#282c34",
    },
    {
      Name: "Meadows Museum",
      Image: "https://via.placeholder.com/100",
      Caption: "Wow! A Museum!",
      Color: "#282c34",
    }
  ]

  let state = {
    autoPlay: true,
    animation: "slide",
    indicators: true,
    duration: 500,
    navButtonsAlwaysVisible: true,
    navButtonsAlwaysInvisible: false,
    cycleNavigation: true,
    fullHeightHover: true,
    swipe: true
  };

  return (
    <div className="Home-body">
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="*" element={<NoPage />} />
          </Route>
          <Route path="/login" element={<Login />}>
          </Route>
        </Routes>
      </BrowserRouter> */}
      <header className="Home-header">
        <nav>
          <p>Login</p>
        </nav>
      </header>
      <main>
        <Carousel
        className="Example"
        autoPlay={state.autoPlay}
        animation={state.animation}
        indicators={state.indicators}
        duration={state.duration}
        cycleNavigation={state.cycleNavigation}
        navButtonsAlwaysVisible={state.navButtonsAlwaysVisible}
        navButtonsAlwaysInvisible={state.navButtonsAlwaysInvisible}
        fullHeightHover={false}
        navButtonsProps={{style: {backgroundColor: 'cornflowerblue', borderRadius: 0}}}
        navButtonsWrapperProps={{style: {bottom: '0', top: 'unset', }}}
        indicatorContainerProps={{style: {margin: "20px"}}}
        NextIcon='next'
        >
          {items.map((item, index) => {
            return (
              <Project
                item={item}
                key={index}
              />
            );
          })}
        </Carousel>
      </main>
    </div>
  );
}

// .Options{display:flex;
//   flex-direction:row;
//   justify-content:space-between;
//   flex-wrap:wrap}
  
// .Options div {
//   display:flex;
//   flex-direction:column
// }


// .Banner {
//   height:400px;
//   position:relative
// }

// .Banner .Media {
//   background-color:#fff;
//   height:100%;
//   overflow:hidden;
//   position:relative;
//   transition:.3s;
//   cursor:pointer
// }

// .Banner .Media .MediaCaption {
//   text-overflow:ellipsis;
//   position:absolute;
//   bottom:0;
//   padding:15px;
//   background-color:#000;
//   color:#fff;
//   opacity:.6;
//   width:100%;
//   height:10%;
//   font-size:21px;
//   font-weight:200;
//   transition:.3s;
//   cursor:pointer
// }

// .Banner .Media .MediaCaption:hover {opacity:.8}

// .Banner .Media:hover{
//   -webkit-filter:brightness(115%);
//   filter:brightness(115%)}

// .Banner .BannerGrid,.Banner .Content {
//   height:100%;position:relative}
  
// .Banner .Content{
//   color:#fff;
//   background-color:#771818;
//   cursor:pointer;padding:30px;
//   transition:.3s}

// .Banner .Content:active,.Banner .Content:hover{
//   background-color:#571111}
  
// .Banner .Content:active .ViewButton,.Banner .Content:hover .ViewButton{
//   background-color:#f1f1f1;
//   color:#771818}
  
// .Banner .Content .Title{
//   font-size:30px;
//   font-weight:500;
//   color:#fff}
  
// .Banner .Content .Caption{
//   margin-top:10px;font-size:18px;color:#fff}
  
// .Banner .Content .ViewButton{
//   margin-top:40px;color:#fff;font-size:25px;border:3px solid #fff;
//   text-transform:capitalize;transition:.2s}
  
// .SecondExample{max-width:500px}

// .SecondExample .Project{max-width:100%;
//   position:relative;height:300px;overflow:hidden;padding:20px}
  
// .SecondExample .Project *{
//   color:#fff}
  
// .SecondExample .Project .CheckButton{
//   margin-top:40px;color:#fff;font-size:25px;border:3px solid #fff;
//   text-transform:capitalize}body{margin:0}
  
// @media(min-width:0px)and (max-width:1279px){
//   .root{padding:40px!important}
//   .installation{width:90%!important}}
//   .root{padding:40px 20%;background-color:#333}
//   .root .react{color:#115293}
//   .root .description{display:flex;flex-wrap:wrap}
//   .root .description div{flex-grow:1}
//   .root .installation{border-radius:5px;
//     background-color:#252525;padding:10px;width:50%}
//   .root a{text-decoration:none;color:#b71c1c;transition:.2s}
//   .root a:hover{color:#751010}.root ul{list-style:none}
//   .root .github{background-color:#222;color:#d3d3d3}
//   .root .npm{background-color:#bb2026;color:#d3d3d3}
//   .root .coffee{background-color:#fd0;color:#000}
//   .Example3{max-width:700px}
//   .Example3 .HeightItem{padding:100px;
//     color:#fff;background-color:#771818;
//     font-family:montserrat,Helvetica,Arial,sans-serif}
//   .Example3 .HeightItem h1{font-weight:100}
/*# sourceMappingURL=main.2829d7e3.chunk.css.map */