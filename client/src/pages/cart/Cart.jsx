import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import {
  CssBaseline,
  Container,
  Box,
  Grid,
  TextField,
  Paper,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  Modal,
  Link,
} from "@mui/material/";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { AddressForm, Review } from "../../components";

import { makeEmail } from "./utils";
import { addPurchases, clearCart } from "../../redux/actions/user";


const Cart = () => {

  const dispatch = useDispatch();

  //Aplicando tecnologia de hook stripe hooks
  const [cardPay, setCardPay] = useState({
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    cardName: "",
  });

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);

  const [activeStep, setActiveStep] = useState(0);

  const { id: userId, cartList, email } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const stripe = useStripe();
  const elements = useElements();

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

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      const { id } = paymentMethod;
      try {
        await axios.post("http://localhost:3001/payment", {
          id,
          amount: totalPrice, //cents
        });

        const order = await axios.post("http://localhost:3001/orders", {
          userData: {
            userID: userId,
            ...address,
          },
          bildData: {
            games: cartList,
            totalPrice,
          },
        });
        dispatch(clearCart())
        setOpen(true);
        makeEmail(email, address.firstName, order.data.data)
        elements.getElement(CardElement).clear();
      } catch (error) {}
    }
    setLoading(false);

    setActiveStep(activeStep + 1);
    dispatch(addPurchases(cartList));
  };

  const handleUserInfo = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <>
            <AddressForm handleInfo={handleUserInfo} />
            <Review />
            <>
              <Typography variant="h6" gutterBottom>
                Payment method
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    id="NameCard"
                    name="NameCard"
                    label="NameCard"
                    fullWidth
                    autoComplete="given-Name-Card"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <CardElement />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox color="secondary" name="saveCard" value="yes" />
                    }
                    label="Remember credit card details for next time"
                  />
                </Grid>
              </Grid>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  disabled={!stripe}
                  onClick={handlePlaceOrder}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {"PLACE ORDER"}
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      PEDIDO REALIZADO
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      GRACIAS POR SU PREFERENCIA
                    </Typography>
                    <Link component={RouterLink} to='/home' underline="none">
                      <Button variant="contained" sx={{ mt: 2 }}>
                        {"OK"}
                      </Button>
                    </Link>
                  </Box>
                </Modal>
              </Box>
            </>
          </>
        </Paper>
      </Container>
    </>
  );
};

const style = {
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  flexDirection: "column",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default Cart;
