import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	Container,
	FormControl,
	Typography,
	Grid,
	TextField,
	FormControlLabel,
	Switch,
	Button,
	Stack,
	Badge,
	Avatar,
	IconButton,
	Box,
	List,
} from '@mui/material';

import { CartCard } from '../';

const MyPurchases = () => {
	const cartList = useSelector((state) => state.user.cartList);
	const user = useSelector((state) => state.user.status);
	const [open, setOpen] = useState(false);
	const [total, setTotal] = useState(0);
	const navigate = useNavigate();

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
			totalPrice = totalPrice + '00';
			totalPrice = parseFloat(totalPrice);
			console.log(totalPrice);
		} else {
			let splitedPrice = totalPrice.toFixed(2);
			console.log(splitedPrice);
			splitedPrice = splitedPrice.toString();
			if (splitedPrice[4] === undefined) {
				splitedPrice = splitedPrice + '0';
			}
			totalPrice = parseFloat(splitedPrice);
		}

		const newTotal = totalPrice;
		setTotal(newTotal);
	}, [cartList]);

	return (
		<Container
			maxWidth="sm"
			sx={{ mb: 5, paddingTop: '40px' }}
			component={Grid}
			spacing={2}
		>
			<List
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: '3px',
					height: 500,
					overflowY: 'scroll',
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
				display={'flex'}
				borderTop={'1px solid black'}
				p={2}
				alignItems={'center'}
				justifyContent={'space-between'}
			>
				<Typography variant="h5">Total: ${total}</Typography>

				<Button
					sx={{ width: 200 }}
					variant="contained"
					onClick={() => {
						navigate('/checkout');
					}}
				>
					Checkout
				</Button>
			</Box>
		</Container>
	);
};

export default MyPurchases;
