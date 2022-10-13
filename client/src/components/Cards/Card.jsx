import React from "react";
import {Card, CardActions, CardContent, CardMedia, Button,Typography, Checkbox} from "@mui/material";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { useSelector, useDispatch } from "react-redux";
import { addWishes } from "../../redux/actions/videoGame";


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function MainCard({ name, description, background_image, price, id}) {
  const games = useSelector((state) => state.videogames.games)
  const dispatch = useDispatch()
  
  
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
        <Checkbox 

            {...label} 
            icon={<FavoriteBorder />} 
            checkedIcon={<Favorite />} 
        size="small"
        onClick={() => {
          dispatch(
            addWishes({
              name: games.name,
              description: games.description,
              background_image: games.background_image,
              price: games.price,
            })
          );
        }}
        ></Checkbox>
        <Button size="small">Buy</Button>
        <Button size="small">More Detail</Button>
      </CardActions>
    </Card>
  );
}
