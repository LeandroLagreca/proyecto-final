import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Drawer,
  List,
  Typography,
  IconButton,
  Badge,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";

import { CartCard } from "../";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const drawerWidth = 240;

export default function CartWidget() {
  const cartList = useSelector((state) => state.user.cartList);
  const user = useSelector((state) => state.user.status);
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (user === "guest") {
      Swal.fire("you are not registered", "try registering", "error");
    } else {
      navigate("/cart");
    }
  };

  useEffect(() => {
    let totalPrice = cartList.map((e) => {
      if (e.price == null) {
        return 0;
      } else {
        return {
          cant: e.cant,
          price: parseFloat(e.price),
        };
      }
    });

    totalPrice = totalPrice.reduce((a, b) => a + b.price * b.cant, 0);

    if (Number.isInteger(totalPrice)) {
      totalPrice = totalPrice + "00";
      totalPrice = parseFloat(totalPrice);
    } else {
      let splitedPrice = totalPrice.toFixed(2);
      splitedPrice = splitedPrice.toString();
      if (splitedPrice[4] === undefined) {
        splitedPrice = splitedPrice + "0";
      }
      totalPrice = parseFloat(splitedPrice);
    }

    const newTotal = totalPrice;
    setTotal(newTotal);
  }, [cartList]);

  function handleIconButton() {
    setOpen(true);
  }

  function handleOut() {
    setOpen(false);
  }

  return (
    <>
      {Boolean(cartList.length) && (
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
          onClick={handleIconButton}
        >
          <Badge badgeContent={cartList.length} color="primary">
            <ShoppingCart />
          </Badge>
        </IconButton>
      )}
      <Drawer
        open={open}
        onClose={handleOut}
        anchor="right"
        PaperProps={{
          sx: {
            width: { xs: "90%", sm: 500 },
            height: "max-content",
            flexShrink: 0,
          },
        }}
      >
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "3px",
            height: 500,
            overflowY: "auto",
          }}
        >
          {cartList.map((el, i) => (
            <CartCard
              key={el.id}
              id={el.id}
              name={el.name}
              picture={el.picture}
              price={el.price}
              cant={el.cant}
              stock={el.stock}
            />
          ))}
        </List>
        <Box
          display={"flex"}
          flexWrap={"wrap"}
          borderTop={"1px solid black"}
          p={2}
          justifyContent={"space-between"}
          alignItems={{ xs: "center", sm: "space-between" }}
        >
          <Typography variant="h5">Total: ${total}</Typography>

          <Button
            sx={{ width: 200 }}
            variant="contained"
            onClick={() => {
              handleCheckout();
            }}
          >
            Checkout
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
