import React from "react";
import {Card, CardActions, CardContent, CardMedia, Button,Typography,} from "@mui/material";

export default function MainCard({ name, background_image, price, id}) {

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="gameCard"
        height="140"
        image={background_image}
      />
      <CardContent>
        <Typography gutterBottom variant="subtitle1" component="div">
          {name}
        </Typography>
        <Typography variant="subtitle2" color="text.primary">
          {price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Buy</Button>
        <Button variant="outlined" size="small" href={`/detail/${id}`}>
          Detail ...
        </Button>
      </CardActions>
    </Card>
  );
}
