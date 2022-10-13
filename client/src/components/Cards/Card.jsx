import React from "react";
import {Card, CardActions, CardContent, CardMedia, Button,Typography,} from "@mui/material";

export default function MainCard({ name, description, background_image, price, id}) {
  
var descriptionFilter = "";
  function descFilter() {   //Agrego una funcion que me acorte la descripcion, ya que me la trae muy larga de la API, en detalle se podra ver completa
    descriptionFilter = description.slice(0, 100);
  }
  descFilter();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="gameCard"
        height="140"
        image={background_image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="h6" color="text.primary">
          {price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {descriptionFilter} . . .
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Buy</Button>
        <Button size="small">More Detail...</Button>
      </CardActions>
    </Card>
  );
}
