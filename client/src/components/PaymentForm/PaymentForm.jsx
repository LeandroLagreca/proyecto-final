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

const PaymentForm = () => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            // componet={CardElement}
            id="cardName"
            label="Name on card"
            autoComplete="cc-name"
            variant="standard"
            name="cardName"
          />
        </Grid>
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