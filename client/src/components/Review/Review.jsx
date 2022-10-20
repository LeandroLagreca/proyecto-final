import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

// const products = [
// 	{
// 		name: 'Product 1',
// 		desc: 'A nice thing',
// 		price: '$9.99',
// 	},
// 	{
// 		name: 'Product 2',
// 		desc: 'Another thing',
// 		price: '$3.45',
// 	},
// 	{
// 		name: 'Product 3',
// 		desc: 'Something else',
// 		price: '$6.51',
// 	},
// 	{
// 		name: 'Product 4',
// 		desc: 'Best thing of all',
// 		price: '$14.11',
// 	},
// 	{ name: 'Shipping', desc: '', price: 'Free' },
// ];

// const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
// const payments = [
// 	{ name: 'Card type', detail: 'Visa' },
// 	{ name: 'Card holder', detail: 'Mr John Smith' },
// 	{ name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
// 	{ name: 'Expiry date', detail: '04/2024' },
// ];

const Review = ({ cardPay }) => {

	const cartList = useSelector(state => state.user.cartList);

	let totalPrice = cartList.map(e => {
		return parseFloat(e.price);
	})

	totalPrice = totalPrice.reduce((a, b) => a + b, 0);

	useEffect(() => {
		console.log(cardPay);
	}, [cardPay]);

	return (
		<React.Fragment>
			<Typography variant="h6" gutterBottom>
				Order summary
			</Typography>
			<List disablePadding>
				{cartList.map((product) => (
					<ListItem key={product.name} sx={{ py: 1, px: 0 }}>
						<ListItemText primary={product.name} />
						<Typography variant="body2">{product.price}</Typography>
					</ListItem>
				))}

				<ListItem sx={{ py: 1, px: 0 }}>
					<ListItemText primary="Total" />
					<Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
						{totalPrice}
					</Typography>
				</ListItem>
			</List>
			<Grid container spacing={2}>
				<Grid item container direction="column" xs={12} sm={12}>
					<Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
						Payment details
					</Typography>
					<Grid container>
							<React.Fragment key={cardPay.cardName}>
								<Grid item xs={6}>
									<Typography gutterBottom>Card Name: {cardPay.cardName}</Typography>
								</Grid>
								<Grid item xs={6}>
									<Typography gutterBottom>Card Number:{cardPay.cardNumber}</Typography>
								</Grid>
								<Grid item xs={6}>
									<Typography gutterBottom>Card CVV: {cardPay.cardCvc}</Typography>
								</Grid>
								<Grid item xs={6}>
									<Typography gutterBottom>Card Name: {cardPay.cardExpiry}</Typography>
								</Grid>
							</React.Fragment>
					</Grid>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}

export default Review;