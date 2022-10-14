import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector, } from "react-redux";
import {Card, CardActions, CardContent, CardMedia, Button,Typography,Checkbox, IconButton, Box} from "@mui/material";
import { addWishes, removeWishes } from "../../redux/actions/videoGame";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from "@mui/icons-material/Favorite";

import { AddToCartButton } from '../'
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };



export default function MainCard({ name, background_image, price, id}) {
  const wishes = useSelector((state) => state.videogames.wishes)
  const [already, setAlreadyIs] = useState(false);
  const dispatch = useDispatch()
  const addToWishes = () => {
      dispatch(
      addWishes({
        name:name,
        background_image:background_image
      })
    );
  
  }

  useEffect(() => {
		const find = wishes.some(el => el.name === name);
		if(find) setAlreadyIs(true)
		else setAlreadyIs(false)
	}, [wishes, name]);
      
// var descriptionFilter = "";
//   function descFilter() {   //Agrego una funcion que me acorte la descripcion, ya que me la trae muy larga de la API, en detalle se podra ver completa
//     descriptionFilter = description.slice(0, 100);
//   }
//   descFilter();

  return (
    <Card

    sx={{ maxWidth: 345, height:300 }}>
      <CardMedia
        component="img"
        alt="gameCard"
        height="150"
        image={background_image}
      />
      <CardContent>
        <Typography  gutterBottom sx={{ fontWeight: 600 }} variant="subtitle1" component="div">
          {name}
        </Typography>
        <Typography variant="subtitle2" color="text.primary">
          {price}
        </Typography>
      </CardContent>
      <Box
>
        <CardActions>
          {
            already ? <IconButton 
            arial-label="favorite"
            onClick={() => {
              dispatch(removeWishes(name))
            }} >
              <Favorite/>
            </IconButton>
            : <IconButton 
            arial-label="favoriteBorder"
            
            onClick={() => {
              addToWishes();
            }} 
            
            
            ><FavoriteBorder /></IconButton>
            
          }
          <Button size="small">Buy</Button>
          <Button variant="outlined" size="small" href={`/detail/${id}`}>
            Detail
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}

        