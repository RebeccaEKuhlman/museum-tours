import * as React from 'react';
import { Grid, Card, CardContent, CardMedia, CardActions, Typography, Paper } from "@material-ui/core";
import Button from '@mui/material/Button';

export const Tours = ({ museums, photos }) => {

  function GridItem(props) {
    let items = [
      <Paper
        className="Project"
        style={{ backgroundColor: "ivory", alignItems: "center" }}
        elevation={10}
        key={props.item.museum_name}
      >
        <CardContent className="Content">
          <img
            className="Image"
            alt="museumlogo"
            src={props.item.photo_data}
            style={{ alignItems: "center", height: 100, width: "auto" }}
          ></img>
          <Typography
            className="Title"
            style={{
              color: "#696963",
              fontFamily: "Baskerville",
              fontWeight: "bold",
              fontSize: 25,
            }}
          >
            {props.item.museum_name}
          </Typography>
          <Typography
            className="Caption"
            style={{
              color: "#696963",
              fontFamily: "Baskerville",
            }}
          >
            {props.item.Caption}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="outlined"
            className="ViewButton"
            style={{
              color: "#F6F7EB",
              backgroundColor: "cornflowerblue",
              fontFamily: "Baskerville",
            }}
          >
            View Now
          </Button>
        </CardActions>
      </Paper>
    ];
    return (
      <Grid item xs={11}>
        {items}
      </Grid>
    );
  }
  // function Project(props) {
  //   let items = [
  //     <Paper
  //       className="Project"
  //       style={{ backgroundColor: "ivory", alignItems: "center" }}
  //       elevation={10}
  //       key={props.item.Name}
  //     >
  //       <CardContent className="Content">
  //         <img
  //           className="Image"
  //           alt="museumlogo"
  //           src={props.item.Image}
  //           style={{ alignItems: "center", height: 100, width: "auto" }}
  //         ></img>
  //         <Typography
  //           className="Title"
  //           style={{
  //             color: "#696963",
  //             fontFamily: "Baskerville",
  //             fontWeight: "bold",
  //             fontSize: 25,
  //           }}
  //         >
  //           {props.item.Name}
  //         </Typography>
  //         <br />
  //         <Typography
  //           className="Caption"
  //           style={{
  //             color: "#696963",
  //             fontFamily: "Baskerville",
  //           }}
  //         >
  //           {props.item.Caption}
  //         </Typography>
  //         <Button
  //           variant="outlined"
  //           className="ViewButton"
  //           style={{
  //             color: "#F6F7EB",
  //             backgroundColor: "cornflowerblue",
  //             fontFamily: "Baskerville",
  //           }}
  //         >
  //           View Now
  //         </Button>
  //       </CardContent>
  //     </Paper>,
  //   ];
  //   return (
  //     <Grid item xs={11}>
  //       {items}
  //     </Grid>
  //   );
  // }

  return (
    <div style={{ marginTop: 10, maxWidth: '100%' }}>
      <Grid
      container
      spacing={1}
      alignItems="center"
      justifyContent="center"
    >
        {museums.map((item, index) => {
          return <GridItem item={item} key={index} />;
        })}
      </Grid>
    </div>
  );
}