import React from 'react';
import {
	Typography,
	Button,
	Container,
	Grid,
	Box,
	Modal,
	OutlinedInput,
	InputAdornment,
	IconButton,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './AddWishes.css';

import { VpnKey, Visibility, VisibilityOff } from '@mui/icons-material';
import { ReviewForm } from '..';

const MyPurchases = () => {
	const { wishes, id } = useSelector((state) => state.user);
	const handleClose = () => setOpen(false);
	const [open, setOpen] = React.useState(false);

	const [values, setValues] = React.useState({
		password: 'qiureiqhkjqehihadslkjfakjfhdalkjhfkaljhfkl',
		showPassword: false,
	});

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

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
				{wishes.map((e, index) => {
					return (
						<Box key={index} align-items="center" display="flex" width={'96%'}>
							<ReviewForm gameId={e.id} userId={id} />
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
									<Button
										sx={{ minWidth: 'auto' }}
										variant="contained"
										onClick={() => {
											setOpen(true);
										}}
									>
										CODE
										<VpnKey />
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
												CODE
											</Typography>
											<div>
												<OutlinedInput
													type={values.showPassword ? 'text' : 'password'}
													value={values.password}
													endAdornment={
														<InputAdornment position="end">
															<IconButton
																aria-label="toggle password visibility"
																onClick={handleClickShowPassword}
																onMouseDown={handleMouseDownPassword}
																edge="end"
															>
																{values.showPassword ? (
																	<VisibilityOff />
																) : (
																	<Visibility />
																)}
															</IconButton>
														</InputAdornment>
													}
													label="Password"
												/>
											</div>
										</Box>
									</Modal>
								</li>
							</ul>
						</Box>
					);
				})}
			</Box>
			
		</Container>
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

export default MyPurchases;
