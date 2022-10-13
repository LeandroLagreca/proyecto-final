import React from "react";
import {Card, CardActions, CardContent, CardMedia, Button,Typography,} from "@mui/material";
import { NavLink } from "react-router-dom";




export default function MainCard({ name, description, background_image, price, id}) {

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="gameCard"
        width={190}
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
      </CardContent>
      <CardActions>
        <Button size="small">Buy</Button>
        <NavLink to={`/detail/${id}`}>
        <Button variant="contained" size="small">More Detail...</Button>
        </NavLink>
      </CardActions>
    </Card>
  );
}
