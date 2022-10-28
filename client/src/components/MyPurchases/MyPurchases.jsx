import React from 'react';
import { Typography, Button, Container, Grid, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AddToCartButton, AddToWishes } from '../';
import './AddWishes.css';

import { VpnKey } from '@mui/icons-material';

import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';

const MyPurchases = () => {
	const { wishes } = useSelector((state) => state.user);

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
				sx={{ fontWight: 'bold', pading: '10px' }}
			>
				PURCHASED GAMES
			</Typography>
			<Typography variant="subtitle1" display={'flex'} ml={2}>
				Esta es una lista de productos comprados, haga clic en CODE para ver la
				clave del juego
			</Typography>
			<Box display="flex" flexDirection={'column'}>
				{wishes.map((e, index) => {
					return (
						<Box key={index} align-items="center" display="flex" width={'96%'}>
							<ul
								style={{
									display: 'flex',
									flexWrap: 'wrap',
									justifyContent: 'center',
									listStyle: 'none',
								}}
							>
								<li className="lisWishStyle">
									{
										<Box className="CardsWishes">
											<Link to={`/detail/${e.id}`} underline="none">
												<img
													className="imageWishes"
													src={e.image}
													alt="imageWishes"
												/>
											</Link>
											<Typography
												variant="subtitle2"
												ml={2}
												display={'flex'}
												alignSelf="center"
											>
												<b>{e.name}</b>
											</Typography>
										</Box>
									}
									<Typography
										variant="subtitle2"
										ml={2}
										display={'flex'}
										alignSelf="center"
										justifyContent="center"
									>
										<b>${e.price}</b>
									</Typography>
									<Button sx={{ minWidth: 'auto' }} variant="contained">
										CODE
										<VpnKey />
									</Button>
								</li>
							</ul>
						</Box>
					);
				})}
			</Box>
		</Container>
	);
};

export default MyPurchases;
