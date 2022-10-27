import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Typography,Button} from "@mui/material";
import Card from "../Cards/Card";
import { margin, padding } from "@mui/system";
import { AddToCartButton, AddToWishes } from "../";
import "./AddWishes.css";

const Wishes = () => {
  const { wishes } = useSelector((state) => state.user);

  return (
    <div>
      <Typography display="flex" mt={2} ml={2} mb={1} variant="h4">
        <b>Wish list</b>
      </Typography>
      <Typography variant="caption" display="flex" ml={1} mb={1}>
        <Link className="redir" to={"/home"}>
          Games
        </Link>{" "}
        <Typography variant="caption" ml={1} mr={1} color={"darkgray"}>
          >{" "}
        </Typography>{" "}
        <b>Wish List</b>{" "}
      </Typography>
      <Typography variant="subtitle1" display={"flex"} ml={2}>
        Browse, purchase or remove items from your wish list here.
      </Typography>
      <Box display="flex" flexDirection={"column"}>
        {wishes.map((e, index) => {
          return (
            <Box key={index} align-items="center" display="flex" width={"96%"}>
              <ul
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  listStyle: "none",
                }}
              >
                <li className="lisWishStyle">
                  {
                    <Box className="CardsWishes">
                      <Link to={`/detail/${e.id}`} underline="none"> {/*Imagen*/}
                        <img
                          className="imageWishes"
                          src={e.image}
                          alt="imageWishes"
                        />
                      </Link>
                      <Typography
                        variant="subtitle2"
                        ml={2}
                        display={"flex"}
                        alignSelf="center"
                      >
                        <b>{e.name}</b> {/*Nombre*/}
                      </Typography>
                    </Box>
                  }
                  <Typography
                    variant="subtitle2"
                    ml={2}
                    display={"flex"}
                    alignSelf="center"
                    justifyContent= "center"
                  >
                    <b>${e.price}</b>{" "} {/*Precio*/}
                  </Typography>
                  <Button sx={{minWidth: 277}} variant="contained">Add to shopping cart
                  <AddToCartButton
                    id={e.id}
                    name={e.name}
                    picture={e.background_image}
                    price={e.price}
                  />
                  </Button>
                  <AddToWishes
                    className="meguta"
                    id={e.id}
                    name={e.name}
                    image={e.background_image}
                    price={e.price}
                  />
                </li>
              </ul>
            </Box>
          );
        })}
      </Box>
    </div>
  );
};

export default Wishes;
