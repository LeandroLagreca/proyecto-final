import React from "react";


import { Link } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

import { AddToCartButton, AddToWishes } from "../";

const styles = {
  card: {
    display: "flex",
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 200,
    height: 300,
    position: "relative",
  },
};

export default function MainCard({ name, background_image, price, id }) {
  return (
    <Card sx={styles.card}>
      <CardMedia
        component="img"
        alt="gameCard"
        height="150"
        image={background_image}
      />
      <CardContent>
        <Typography
          gutterBottom
          sx={{ fontWeight: 600 }}
          variant="subtitle1"
          component="div"
        >
          {name}
        </Typography>
        <Typography variant="subtitle2" color="text.primary">
          ${price}
        </Typography>
      </CardContent>
      <CardActions>
        <AddToWishes
          id={id}
          name={name}
          image={background_image}
          price={price}
          styles={{ position: "absolute", left: 0, top: 0}}
        />
        <AddToCartButton
          id={id}
          name={name}
          picture={background_image}
          price={price}
          styles={{ position: "absolute", right: 0, top: 0}}
        />
      </CardActions>
      <Link to={`/detail/${id}`}>
        <Button variant="outlined" size="small" sx={{ width: "100%",}} color={"secondary"} >
          Detail
        </Button>
      </Link>
    </Card>
  );
}
