import React from "react";


// import { Link } from "react-router-dom";

import {Link } from "@mui/material";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box
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
    overflow: 'visible'
  },
  discountPercent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: 'green',
    color: 'white',
    fontSize: 20,
    paddingX: .8,
  }
};

export default function MainCard({ name, background_image, price, id, discount }) {
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
        {
          !discount.status ? (
            <Typography  variant="subtitle2" color="text.primary">
              ${price}
            </Typography>
          ) : (
            <Box display='flex'>
              <Typography sx={styles.discountPercent} variant="subtitle2" color="text.primary">
                {`${Math.floor(100 - (discount.currentPrice * 100) / price)}%`}
              </Typography>
              <Box sx={{background: 'rgba(160, 149, 147, .3)', textAlign: 'center', paddingX: .8}}>
                <Typography sx={{textDecoration: 'line-through', color: 'gray', fontSize: 12}} variant="subtitle2">
                  ${price}
                </Typography>
                <Typography sx={{color: 'green', fontSize: 15}} variant="subtitle2">
                  ${discount.currentPrice}
                </Typography>
              </Box>
            </Box>
          )
        }
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
      <Link href={`/detail/${id}`} underline='none'>
        <Button variant="outlined" size="small" sx={{ width: "100%",}} color={"secondary"} >
          Detail
        </Button>
      </Link>
    </Card>
  );
}
