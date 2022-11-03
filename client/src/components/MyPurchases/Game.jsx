import React from 'react';
import {
	Box,
	Typography,
	Button,
	Modal,
	OutlinedInput,
	InputAdornment,
	IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff, VpnKey } from '@mui/icons-material';
import { ReviewForm } from '../'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Games = ({ game }) => {
	const { id } = useSelector(state => state.user)
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
		<Box key={game.id} align-items="center" display="flex" width={'96%'}>
			<ReviewForm gameId={game.id} userId={id} />
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
							<Link to={`/detail/${game.id}`} underline="none">
								<img
									className="imageWishes"
									src={game.picture}
									alt="imageWishes"
								/>
							</Link>
							<Typography
								variant="subtitle2"
								ml={2}
								display={'flex'}
								alignSelf="center"
							>
								<b>{game.name}</b>
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
						<b>${game.price}</b>
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
							<Typography id="modal-modal-title" variant="h6" component="h2">
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

export default Games;
