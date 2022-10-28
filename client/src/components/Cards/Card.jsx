import React from 'react';

import { Link as RouterLink } from 'react-router-dom';
import { useContext } from 'react';
import { ColorModeContext } from '../Theme/Theme';

import { Link } from '@mui/material';
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
	Box,
} from '@mui/material';

import { AddToCartButton, AddToWishes } from '../';

import "./Cards.css"

const styles = {
	card: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		width: 220,
		height: 300,
		position: 'relative',
		overflow: 'visible',
	},
	discountPercent: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		background: 'green',
		color: 'white',
		fontSize: 20,
		paddingX: 0.8,
	},
};

export default function MainCard({
	name,
	background_image,
	price,
	id,
	discount,
}) {
	const { mode, toggleMode } = useContext(ColorModeContext);
	return (
		<Card sx={styles.card} className='imgCard'>
			<CardMedia
			
				component="img"
				alt="gameCard"
				height={130}
				image={background_image}
			/>
			<CardContent>
				<Typography
					textAlign={"start"}
					sx={{ fontWeight: 600 }}
					variant="subtitle2"
					component="div"
				>
					{name}
				</Typography>
				{!discount?.status ? (
					<Box sx={{display:"flex", height:50}}>
					<Typography variant="subtitle2" color="text.primary" alignitems="flex-end">
						<b>${price}</b>
					</Typography>
					</Box>
				) : (
					<Box display="flex">
						<Typography
							sx={styles.discountPercent}
							variant="subtitle2"
							color="text.primary"
						>
							{`${Math.floor(
								100 - (discount.currentPrice * 100) / discount.prevPrice
							)}%`}
						</Typography>
						<Box
							sx={{
								background: 'rgba(160, 149, 147, .3)',
								textAlign: 'center',
								paddingX: 0.8,
							}}
						>
							<Typography
								sx={{
									textDecoration: 'line-through',
									color: 'gray',
									fontSize: 12,
								}}
								variant="subtitle2"
							>
								${discount.prevPrice}
							</Typography>
							<Typography
								sx={{ color: 'green', fontSize: 15 }}
								variant="subtitle2"
							>
								${discount.currentPrice}
							</Typography>
						</Box>
					</Box>
				)}
			</CardContent>
			<CardActions>
				<AddToWishes
					id={id}
					name={name}
					image={background_image}
					price={price}
					styles={{ position: 'absolute', left: 0, top: 0 }}
				/>
				<AddToCartButton
					id={id}
					name={name}
					picture={background_image}
					price={price}
					styles={{ position: 'absolute', right: 0, top: 0 }}
				/>
			</CardActions>
			<Link component={RouterLink} to={`/detail/${id}`} underline="none">
				<Button
					variant="outlined"
					size="small"
					sx={[
						mode === 'dark' ? { borderColor: 'white' } : { borderColor: 'primary' },
						{ width: '100%' },
					]}
				>
					<Typography
						sx={[
							mode === 'dark' ? { color: 'white' } : { color: 'primary' },
							{ width: '100%' },
						]}
					>
						Detail
					</Typography>
				</Button>
			</Link>
		</Card>
	);
}
