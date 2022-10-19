import React from "react";
import { Paper, Box } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import Item from "../../components/Items/Item";
import { useSelector } from "react-redux";
import "./Social.css";

const Social = () => {
  const gameBanner = useSelector((state) => state.videogames.games);

  return (
    <Box className="boxBanner">
      <Paper height={270} className="paperBanner" elevation={1}>
        <Carousel className="carusel" indicators={false} animation={"slide"} >
          {gameBanner.map((item) => (
            <Item key={item.id} item={item.background_image} name={item.name}/>
          ))}
        </Carousel>
      </Paper>
    </Box>
  );
};

export default Social;
