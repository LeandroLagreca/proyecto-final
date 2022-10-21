import React from 'react';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const Review = () => {
	const cartList = useSelector((state) => state.user.cartList);

	let totalPrice = cartList.map((e) => {
		return parseFloat(e.price);
	});

	totalPrice = totalPrice.reduce((a, b) => a + b, 0);

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
		</React.Fragment>
	);
};

export default Review;
