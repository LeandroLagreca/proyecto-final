import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetails, addWishes } from "../redux/actions/videoGame";
import { Button, Typography, Container, Box, Checkbox,  } from "@mui/material";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Carousel from "react-material-ui-carousel";
import "./Detail.css";
import Item from "../components/Items/Item";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Detail() {
  const gameDetail = useSelector((state) => state.videogames.details);
  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    dispatch(getDetails(id));
  }, []);

  //   useEffect(()=>{
  //     return ()=>{
  //       dispatch(cleanDetail())
  //     }
  //   },[])

  const ejemplo = [
    {
      name: "Left 4 Dead 2",
      background_image:
        "https://media.rawg.io/media/games/d58/d588947d4286e7b5e0e12e1bea7d9844.jpg",
    },
    {
      name: "Portal",
      background_image:
        "https://media.rawg.io/media/games/7fa/7fa0b586293c5861ee32490e953a4996.jpg",
    },
    {
      name: "Grand Theft Auto V",
      background_image:
        "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
    },

    {
      name: "The Witcher 3: Wild Hunt",
      background_image:
        "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
    },
    {
      name: "Portal 2",
      background_image: "https://wallpaperaccess.com/full/4334829.jpg",
    },
    {
      name: "Tomb Raider (2013)",
      background_image:
        "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
    },
    {
      name: "Borderlands 2",
      background_image:
        "https://media.rawg.io/media/games/588/588c6bdff3d4baf66ec36b1c05b793bf.jpg",
    },
    {
      name: "Borderlands 2",
      background_image:
        "https://4kwallpapers.com/images/walls/thumbs_2t/8654.jpg",
    },
    {
      name: "Borderlands 2",
      background_image: "https://wallpaperaccess.com/full/917707.jpg",
    },
    {
      name: "Borderlands 2",
      background_image: "https://wallpaperaccess.com/full/4970714.jpg",
    },
    {
      name: "Borderlands 2",
      background_image: "https://wallpaperaccess.com/full/4970684.jpg",
    },
    {
      name: "Borderlands 2",
      background_image: "https://wallpaperaccess.com/full/4970671.jpg",
    },
  ];

  return (
    <Container>
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
        <Box>
      
    </Box>
              <Typography padding={1} variant="h5" component="div">
                {gameDetail.name}
              </Typography>
              <Typography variant="h6" color="text.primary">
                {gameDetail.price}
              </Typography>
            </Box>
            <Box display="flex" sx={{ border: "" }}>
              <Button variant="contained">Comprar</Button>
            </Box>
            <Box>
            <Checkbox 
            {...label} 
            icon={<FavoriteBorder />} 
            checkedIcon={<Favorite />} 
        size="small"
        onClick={() => {
          dispatch(
            addWishes({
              name: gameDetail.name,
              description: gameDetail.description,
              background_image: gameDetail.background_image,
              price: gameDetail.price,
            })
          );
        }}
      ></Checkbox>
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
            <Carousel>
              {ejemplo.map((item) => (
                <Item key={item.id} item={item} />
              ))}
            </Carousel>
            {/* <img
              className="imagenDetail"
              src={gameDetail.background_image}
              width="auto"
              height={300}
              alt="not found"
            /> */}
          </Box>
          <Box className="smallImages" backgroundColor="#ffffff">
            <img
              className="small"
              src={gameDetail.background_image}
              width={90}
              height={50}
              alt="not found"
              margin={2}
            />
            <img
              className="small"
              src={gameDetail.background_image}
              width={90}
              height={50}
              alt="not found"
            />
            <img
              className="small"
              src={gameDetail.background_image}
              width={90}
              height={50}
              alt="not found"
            />
          </Box>
          <Box className="description" borderRadius={0.5}>
            <Typography
              variant="body2"
              textAlign="justify"
              color="text.primary"
            >
              {gameDetail.description}
            </Typography>
          </Box>
        </Box>
        <Box className="requeriments" margin={1} sx={{ borderRadius: "10" }}>
          <Typography
            borderRadius={0.5}
            backgroundColor="#90caf9"
            variant="body2"
            color="text.primary"
          >
            Requerimientos del sistema
          </Typography>
          <Typography
            backgroundColor="#e3f2fd"
            variant="body2"
            color="text.primary"
          >
            {gameDetail.requirements_minimum}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ border: "1px dashed grey" }}>RESEÑAS</Box>
      
    </Container>
  );
}
