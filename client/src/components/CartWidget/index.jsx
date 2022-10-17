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
  Badge
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";

import { CartCard } from '../'
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function CartWidget() {
	const cartList = useSelector(state => state.user.cartList);
  const user = useSelector((state) => state.user.role);
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  
  
  
  const handleCheckout = () => {
    if(user === "guest" ){
      Swal.fire("you are not registered", "try registering", "error");
    }else{
      navigate("/cart");
      
    }
  }
  
  useEffect(() => {
    const newTotal = cartList.reduce((acc, el) => acc + el.price * el.cant, 0);
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
      <Drawer
        open={open}
        onClose={handleOut}
        anchor="right"
        PaperProps={{ sx: { width: 500, height: "max-content" } }}
      >
        <List sx={{display: 'flex', flexDirection: 'column', gap: '3px', height: 500, overflowY: "scroll" }}>
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
					borderTop={'1px solid black'}
					p={2}
					alignItems={'center'}
          justifyContent={"space-between"}
        >
          <Typography variant="h5">Total: {total}</Typography>

          
            <Button sx={{ width: 200 }} variant="contained"
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
