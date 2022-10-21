import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

import axios from 'axios';
const stripePromise = loadStripe("<your public key here>");

const PaymentForm = ({ setCardPay, cardPay }) => {

  // const cartList = useSelector(state => state.user.cartList);

  // const [card, setCard] = useState({
  //   cardNumber: '',
  //   cardExpiry: '',
  //   cardCvc: '',
  //   cardName: '',
  // });

  // const handleChange = (e) => {
  //   setCardPay({
  //     ...cardPay,
  //     [e.target.name]: e.target.value,
  //   });

  //   console.log(cardPay);
  // }


  // useEffect(() => {
  //   console.log(cartList);
  //   console.log(cardPay);
  // }, [cartList]);


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          {/* <TextField
            required
            component={CardElement}
            // id="cardName"
            // label="Name on card"
            fullWidth
            // autoComplete="cc-name"
            // variant="standard"
            // name="cardName"
            // value={cardPay.cardName}
            // onChange={handleChange}
          /> */}
        </Grid>
        {/* <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            name="cardNumber"
            value={cardPay.cardNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            name="cardExpiry"
            value={cardPay.cardExpiry}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            name="cardCvc"
            value={cardPay.cardCvc}
            onChange={handleChange}
          />
        </Grid> */}
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default PaymentForm;