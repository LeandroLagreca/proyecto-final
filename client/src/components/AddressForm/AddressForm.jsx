import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { ColorContextProvider } from '../Theme/Theme';

const AddressForm = ({handleInfo, handleSave}) => {
  function handleCheck(e) {
    const status = e.target.checked
    handleSave(status)
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Billing address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={handleInfo}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange={handleInfo}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            onChange={handleInfo}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            onChange={handleInfo}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            onChange={handleInfo}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            onChange={handleInfo}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            onChange={handleInfo}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            onChange={handleInfo}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox onClick={handleCheck} color="secondary" name="saveAddress" value="true" />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default AddressForm;