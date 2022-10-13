import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetails } from "../redux/actions/videoGame";
import { Button, Typography, Container, Box, Paper } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import "./Detail.css";

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
              sx={{ border: "1px dashed grey"}}
            >
              <Typography  padding={1} variant="h5" component="div">
                {gameDetail.name}
              </Typography>
              <Typography variant="h6" color="text.primary">
                {gameDetail.price}
              </Typography>
            </Box>
            <Box display="flex"  sx={{ border: "" }}>
              <Button variant="contained">Comprar</Button>
            </Box>
            <Box>
            <FavoriteBorderIcon/>
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
            <img
              className="imagenDetail"
              src={gameDetail.background_image}
              width="auto"
              height={300}
              alt="not found"
            />
          </Box>
          <Box className="smallImages" backgroundColor="#ffffff" sx={{ border: "1px dashed grey" }}>
          <img
              src={gameDetail.background_image}
              width={90}
              height={50}
              alt="not found"
            />
            <img
              src={gameDetail.background_image}
              width={90}
              height={50}
              alt="not found"
            />
            <img
              src={gameDetail.background_image}
              width={90}
              height={50}
              alt="not found"
            />
          </Box>
          <Box className="description" borderRadius={.5}>
            <Typography variant="body2" textAlign="justify" color="text.secondary">
              {gameDetail.description}
            </Typography>
          </Box>
        </Box>
        <Box className="requeriments" margin={1} sx={{ borderRadius: "10"}}>
        <Typography borderRadius={.5} backgroundColor="#90caf9" variant="body2" color="text.primary">
            Requerimientos del sistema
          </Typography>
          <Typography backgroundColor="#e3f2fd" variant="body2" color="text.primary">
            {gameDetail.requirements_minimum}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ border: "1px dashed grey" }}>RESEÑAS</Box>
    </Container>
  );
}
