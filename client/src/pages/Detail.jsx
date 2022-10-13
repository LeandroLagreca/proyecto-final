import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetails } from "../redux/actions/videoGame";
import { Button, Typography, Container, Box } from "@mui/material";
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
      <Box display="flex" alignItems="center" className="boxDivisor">
        <Box
          className="containerNombreImagenDescription"
          sx={{ border: "1px dashed grey" }}
        >
          <Box
            display="flex"
            sx={{
              border: "1px dashed grey",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box  display="flex" className="nombrePrecio" sx={{ border: "1px dashed grey" }}>
              <Typography gutterBottom variant="h5" component="div">
                {gameDetail.name}
              </Typography>
              <Typography variant="h6" color="text.primary">
                {gameDetail.price}
              </Typography>
            </Box>
            <Box display="flex" sx={{ border: "1px dashed grey" }}>
              <Button variant="contained">Comprar</Button>
            </Box>
          </Box>
          <Box
            width={500}
            alignItems="center"
            className="imagen"
            sx={{ border: "1px dashed grey" }}
          >
            <img
              className="imagenDetail"
              src={gameDetail.background_image}
              alt="not found"
            />
          </Box>
          <Box className="smallImages" sx={{ border: "1px dashed grey" }}>
            IMAGENES CHIQUITAS
          </Box>
          <Box className="description" sx={{ border: "1px dashed grey" }}>
            <Typography variant="body2" color="text.secondary">
              {gameDetail.description}
            </Typography>
          </Box>
        </Box>
        <Box className="requeriments" sx={{ border: "1px dashed grey" }}>
          <Typography variant="body2" color="text.primary">
            {gameDetail.requirements_minimum}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ border: "1px dashed grey" }}>RESEÑAS</Box>
    </Container>
  );
}
