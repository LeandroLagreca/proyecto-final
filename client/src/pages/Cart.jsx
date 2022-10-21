import React from 'react';
import { AddressForm, Review } from '../components';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Modal from '@mui/material/Modal';

import { loadStripe } from '@stripe/stripe-js';
import {
	Elements,
	CardElement,
	useStripe,
	useElements,
} from '@stripe/react-stripe-js';

import axios from 'axios';

const stripePromise = loadStripe(
	'pk_test_51LufTBJFaEjO8LKN7nRBtmqKYj68WceXrgvn25J1vq7CdkiP3W6fVrFWvFsQ1AnWgvUfqF9ZCSeP6vtFWNEHMAk000XeUTK9Fn'
);

const steps = ['Payment order'];

function getStepContent() {
	return true;
}

const theme = createTheme();

const Cart = () => {
	//Aplicando tecnologia de hook stripe hooks

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const stripe = useStripe();
	const elements = useElements();

	const [loading, setLoading] = useState(false);

	const [activeStep, setActiveStep] = React.useState(0);

	const cartList = useSelector((state) => state.user.cartList);

	let totalPrice = cartList.map((e) => {
		if (e.price == null) {
			return 0;
		} else {
			return parseFloat(e.price);
		}
	});

	totalPrice = totalPrice.reduce((a, b) => a + b, 0);

	if (Number.isInteger(totalPrice)) {
		totalPrice = totalPrice + '00';
		totalPrice = parseFloat(totalPrice);
	} else {
		let splitedPrice = totalPrice.toFixed(2);
		splitedPrice = splitedPrice.toString();
		if (splitedPrice[4] === undefined) {
			splitedPrice = splitedPrice + '0';
		}
		splitedPrice = splitedPrice.replace('.', '');
		totalPrice = parseInt(splitedPrice, 10);
	}
	console.log(totalPrice);

	const handlePlaceOrder = async (e) => {
		e.preventDefault();

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: elements.getElement(CardElement),
		});
		setLoading(true);

		if (!error) {
			setOpen(true);
			console.log(paymentMethod);
			const { id } = paymentMethod;
			try {
				const { data } = await axios.post('http://localhost:3001/payment', {
					id,
					amount: totalPrice, //cents
				});
				console.log(data);

				elements.getElement(CardElement).clear();
			} catch (error) {
				console.log(error);
			}
			setLoading(false);
		}
		setActiveStep(activeStep + 1);
	};

	console.log(!stripe || loading);

	const [cardPay, setCardPay] = useState({
		cardNumber: '',
		cardExpiry: '',
		cardCvc: '',
		cardName: '',
	});

	const [address, setAddress] = useState({
		firstName: '',
		lastName: '',
		address1: '',
		address2: '',
		city: '',
		state: '',
		zip: '',
		country: '',
	});

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	useEffect(() => {}, []);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Container maxWidth="sm" sx={{ mb: 4 }}>
				<Paper
					variant="outlined"
					sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
				>
					<Typography component="h1" variant="h4" align="center">
						Checkout
					</Typography>
					<React.Fragment>
						<AddressForm />
						<Review />
						<React.Fragment>
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
							<Box sx={{ display: 'flex', justifyContent: 'center' }}>
								<Button
									variant="contained"
									disabled={!stripe}
									onClick={handlePlaceOrder}
									sx={{ mt: 3, ml: 1 }}
								>
									{'PLACE ORDER'}
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
										<Button variant="contained" href="/home" sx={{ mt: 2 }}>
											{'OK'}
										</Button>
									</Box>
								</Modal>
							</Box>
						</React.Fragment>
					</React.Fragment>
				</Paper>
			</Container>
		</ThemeProvider>
	);
};

const style = {
	position: 'absolute',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-around',
	flexDirection: 'column',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export default Cart;
