import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const Tours = () => {

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

  let items = [
    {
      Name: "Dallas Museum of Art",
      Image: "https://www.dma.org/sites/default/files/dma-logo.png",
      Caption: "Art museum with more than 24,000 works of art from around the world ranging from ancient to modern times. Located in downtown Dallas.",
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
      Image: "http://photos.prnewswire.com/prnfull/20120531/DC16400LOGO",
      Caption: "Dallas's natural history museum. Focuses on innovation, archaeology, and curiosity. Located in downtown Dallas.",
      Color: "#282c34",
    },
    {
      Name: "Bush Presidential Center",
      Image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Official_logo_of_the_George_W._Bush_Presidential_Library.svg/1200px-Official_logo_of_the_George_W._Bush_Presidential_Library.svg.png",
      Caption: "Presidential Library and think tank of George W. Bush. Located on the campus of SMU.",
      Color: "#282c34",
    },
    {
      Name: "Meadows Museum",
      Image: "https://meadowsmuseumdallas.org/wp-content/uploads/2017/02/MUSE_retina.png",
      Caption: "The largest collection of Spanish art outside of Spain. Located on the campus of SMU.",
      Color: "#282c34",
    },
  ];

  return (
    <div style={{ marginTop: 10 }}>
      <Grid
      container
      spacing={1}
      alignItems="center"
      justify="center"
    >
        <Grid item xs={11}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image="/static/images/cards/contemplative-reptile.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={11}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image="/static/images/cards/contemplative-reptile.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}