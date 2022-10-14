import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  Avatar,
  Typography,
  Divider
} from "@mui/material";
import { IconButton, Badge } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function CartWidget() {
	const cartList = useSelector(state => state.user.cartList)
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = cartList.reduce((acc, el) => acc + el.price, 0);
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
              <ListItem key={i} alignItems="flex-start" sx={{display: 'flex', justifyContent: 'space-between', height: 'max-content', gap: 2}}>
                <Avatar
                  variant="square"
                  src={el.picture}
                  sx={{ width: 90, height: "auto" }}
                  alt=""
                />
                <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'} width={'100%'} height={80}>
                  <Box>
                    <Typography variant="h6">{el.name}</Typography>
                  </Box>
                  <Typography textAlign={'end'}>${el.price || 0}</Typography>
                <Divider />
                </Box>
              </ListItem>
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

          <Link to="/cart">
            <Button sx={{ width: 200 }} variant="contained">
              Checkout
            </Button>
          </Link>
        </Box>
      </Drawer>
    </>
  );
}
