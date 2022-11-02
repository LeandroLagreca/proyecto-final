import React from 'react';
import { Typography, Container, Grid, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import './AddWishes.css';

import { ReviewForm } from '..';

import Game from './Game';

const MyPurchases = () => {
	const { purchases } = useSelector((state) => state.user);
	return (
		<Container
			maxWidth="md"
			sx={{
				mb: 6,
				paddingTop: '20px',
				margin: '0 auto',
				display: 'block',
				overflow: 'auto',
			}}
			component={Grid}
			spacing={1}
		>
			<Typography
				variant="h4"
				align="center"
				sx={{ fontWight: 'bold', padding: '10px' }}
			>
				PURCHASED GAMES
			</Typography>
			<Typography variant="subtitle1" display={'flex'} ml={2}>
				Esta es una lista de productos comprados, haga clic en CODE para ver la
				clave del juego
			</Typography>
			<Box display="flex" flexDirection={'column'}>
				{Array.isArray(purchases)
					? Array.isArray(purchases)
						? purchases.map((e) => {
								return e.games.map((game) => {
									return <Game game={game} />;
								});
						  })
						: null
					: null}
			</Box>
		</Container>
	);
};

export default MyPurchases;
