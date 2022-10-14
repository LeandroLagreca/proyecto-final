import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetails } from "../redux/actions/videoGame";
import { AddToWishes } from "../components";
import {
  Button,
  Typography,
  Container,
  Box,
  Checkbox,
  TextField,
  Paper
} from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Carousel from "react-material-ui-carousel";
import "./Detail.css";
import Item from "../components/Items/Item";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import LinkIcon from '@mui/icons-material/Link';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export default function Detail() {
  const gameDetail = useSelector((state) => state.videogames.details);
  const dispatch = useDispatch();
  let { id } = useParams();

  var imgCarousel = []
  if(gameDetail.images){
    var images =gameDetail.images
    imgCarousel = images.split(",")
  }

  //Form de Reseñas
  const [value, setValue] = React.useState("Controlled"); //Estado local

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(value)
  };

  useEffect(() => {
    dispatch(getDetails(id));
  }, []);


  return (
    <Container>
      <Paper elevation={8} sx={{padding:2}}>
      <Box display="flex" alignItems="flex-start" className="boxDivisor">
        <Box
          className="containerNombreImagenDescription"
          backgroundColor="#e3f2fd"
          width={650}
          borderRadius={3}
          sx={{ border: "grey" }}
        >
          <Box
            display="flex"
            backgroundColor="#90caf9"
            borderRadius={1}
            sx={{
              borderColor: "#42a5f5",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Box
              display="contents"
              className="nombrePrecio"
              sx={{ border: "1px dashed grey" }}
            >
              <Box></Box>
              <Typography padding={1} variant="h5" component="div">
                {gameDetail.name}
              </Typography>
              <Typography variant="h6" color="text.primary">
                {gameDetail.price}
              </Typography>
            </Box>
            <Box display="flex" sx={{ border: "" }}>
              <Button variant="contained">
                <AddShoppingCartIcon />{" "}
              </Button>
            </Box>
            <Box>
            <AddToWishes 
              id={id}
              name={gameDetail.name} 
              image={gameDetail.background_image}
              price={gameDetail.price}
            />
            </Box>
          </Box>
          <Box
            width={650}
            height={300}
            alignItems="center"
            className="imagen"
            display="inline-block"
            sx={{ borderRadius: "4px" }}
          >
            <Carousel className="carusel">
              {imgCarousel.map((item) => (
                <Item key={item.id} item={item} />
              ))} 
            </Carousel>
          </Box>
          <Box className="description" borderRadius={0.5} sx={{padding: 1}}>
            <Typography
              variant="body2"
              textAlign="justify"
              color="text.primary"
            >
              {gameDetail.description}
            </Typography>
          </Box>
        </Box>
        <Box className="requeriments" margin={1.5} sx={{ borderRadius: 1, padding: 1 }}>
          <Typography
            borderRadius={0.5}
            backgroundColor="#90caf9"
            variant="body1"
            color="text.primary"
          >
            Requeriments
          </Typography>
          <Typography
          sx={{ borderRadius: 2 }}
            backgroundColor="#e3f2fd"
            variant="body2"
            color="text.primary"
          >
            {gameDetail.requirements}
          </Typography>
        </Box>
      </Box>
        </Paper>
      <section>
        <Box className="newComment">
        <Box>
          <AccountBoxIcon sx={{ fontSize: 50 }}/>
        </Box>
        <Box width={340} sx={{bgcolor: '#e3f2fd',borderColor: 'secondary.main', border: 1, borderRadius: 1, display: "inline-block"}}>
          <TextField
            onChange={handleChange}
            id="standard-multiline-static"
            fullWidth
            label="Reseñas"
            multiline
            rows={4}
            placeholder="Agrega un comentario..."
            variant="standard"
          />
          <Box className="postActions"  sx={{bgcolor: '#90caf9', borderColor: 'secondary.main', border: 1}}>
            <Box className="iconsComment">
            <AddPhotoAlternateIcon opacity={30}/> | <FormatBoldIcon /> <FormatItalicIcon /> <FormatUnderlinedIcon/> <LinkIcon/> <FormatQuoteIcon/>
            </Box>
          </Box>
        </Box>
        </Box>
      </section>
    </Container>
  );
}
