import React from 'react';
import { AddressForm, PaymentForm, Review } from '../components';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { loadStripe } from '@stripe/stripe-js';
import {
	Elements,
	CardElement,
	useStripe,
	useElements,
} from '@stripe/react-stripe-js';

import axios from 'axios';

const stripePromise = loadStripe(
	'pk_test_51Luf96F1iznuqvKCn3b3BzDIpjrpf84WaSgemO1meObzaZ4EW6xHONZKUbFGMpp10DMq95TyaSGOob5hVq5FJ8HH00yqQ8eCs4'
);

const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step) {
	switch (step) {
		case 0:
			return '0';
		case 1:
			return '1';
		case 2:
			return '2';
		default:
			throw new Error('Unknown step');
	}
}

const theme = createTheme();

const Cart = () => {
	//Aplicando tecnologia de hook stripe hooks
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
	console.log(totalPrice)

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: elements.getElement(CardElement),
		});
		setLoading(true);

		if (!error) {
			// console.log(paymentMethod)
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

	const handleNext = () => {
		setActiveStep(activeStep + 1);
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	useEffect(() => {
		console.log('se volvio a renderizar ');
	}, []);

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
					<Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
						{steps.map((label) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>
					<React.Fragment>
						{/* {activeStep === steps.length ? (
							<React.Fragment>
								<Typography variant="h5" gutterBottom>
									Thank you for your order.
								</Typography>
								<Typography variant="subtitle1">
									Your order number is #2001539. We have emailed your order
									confirmation, and will send you an update when your order has
									shipped.
								</Typography>
							</React.Fragment>
						) : (
							<React.Fragment>
								{getStepContent(activeStep) === '0' ? (
									<AddressForm />
								) : getStepContent(activeStep) === '1' ? (
									<PaymentForm setCardPay={setCardPay} cardPay={cardPay} />
								) : (
									<Review cardPay={cardPay} />
								)}
								<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
									{activeStep !== 0 && (
										<Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
											Back
										</Button>
									)}

									<Button
										variant="contained"
										disabled={!stripe}
										onClick={
											activeStep === steps.length - 1
												? handleSubmit
												: handleNext
										}
										sx={{ mt: 3, ml: 1 }}
									>
										{activeStep === steps.length - 1 ? 'Place order' : 'Next'}
									</Button>
								</Box>
							</React.Fragment>
						)} */}

						<Review cardPay={cardPay} />
						<CardElement />
						<Button
							variant="contained"
							disabled={!stripe}
							onClick={handleSubmit}
							sx={{ mt: 3, ml: 1 }}
						>
							{'Place order'}
						</Button>
					</React.Fragment>
				</Paper>
			</Container>
		</ThemeProvider>
	);
};

export default Cart;
