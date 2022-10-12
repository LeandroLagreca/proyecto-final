import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetails } from "../redux/actions/videoGame";
import { Button, Typography, Container, Box } from "@mui/material";

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
        <Box>
      <Typography gutterBottom variant="h5" component="div">
        {gameDetail.name}
      </Typography>
      <Typography variant="h6" color="text.primary">
        {gameDetail.price}
      </Typography>
        </Box>
        <img
          className="i"
          src={gameDetail.background_image}
          width="300"
          height="230"
          alt="not found"
        />
      <Typography variant="body2" color="text.secondary">
        {gameDetail.description}
      </Typography>
      </Container>
  );
}
