import React, { useEffect, useState } from 'react';
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
	Modal,
	Box,
} from '@mui/material';
import { SaveAs } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { putUserData } from '../../redux/actions/user';
import { Link } from 'react-router-dom';

const MyProfile = () => {
	const { userData } = useSelector((state) => state.user);
	const { id } = useSelector((state) => state.user);

	const dispatch = useDispatch();

	const [values, setValues] = useState({
		firstname: userData.firstname,
		lastname: userData.lastname,
		country: userData.country,
		province: userData.province,
		ciut: userData.ciut,
		address: userData.address,
		cardholder: userData.cardholder,
		cardnumber: userData.cardnumber,
	});

	const [editProfile, setEditProfile] = useState(false);
	const [open, setOpen] = useState(false);

	const handleChanges = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
	};

	useEffect(() => {
	}, [editProfile]);

	const handleSave = (e) => {
		dispatch(putUserData(id, values));
		setEditProfile(false);
		setOpen(false);
	};

	useEffect(() => {
		window.onbeforeunload = function () {
			return true;
		};

		return () => {
			window.onbeforeunload = null;
		};
	}, []);

	return (
		<Container
			maxWidth="sm"
			sx={{ mb: 5, paddingTop: '50px' }}
			component={Grid}
			spacing={2}
		>
			<FormControl>
				<Typography variant="h6" gutterBottom>
					Profile Settings
				</Typography>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<TextField
							disabled={!editProfile}
							id="firstName"
							name="firstname"
							label="First name"
							fullWidth
							autoComplete="given-name"
							variant="standard"
							value={values.firstname}
							onChange={handleChanges}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							disabled={!editProfile}
							id="lastName"
							name="lastname"
							label="Last name"
							fullWidth
							autoComplete="family-name"
							variant="standard"
							value={values.lastname}
							onChange={handleChanges}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							disabled={!editProfile}
							id="country"
							name="country"
							label="Country"
							fullWidth
							autoComplete="shipping country"
							variant="standard"
							value={values.country}
							onChange={handleChanges}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							disabled={!editProfile}
							id="state"
							name="province"
							label="province"
							fullWidth
							variant="standard"
							value={values.province}
							onChange={handleChanges}
						/>
					</Grid>
					<Grid item xs={12} sm={12}>
						<TextField
							disabled={!editProfile}
							id="city"
							name="cuit"
							label="City"
							fullWidth
							autoComplete="shipping address-level2"
							variant="standard"
							value={values.ciut}
							onChange={handleChanges}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							disabled={!editProfile}
							id="address1"
							name="address"
							label="Address"
							fullWidth
							autoComplete="shipping address-line1"
							variant="standard"
							value={values.address}
							onChange={handleChanges}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							disabled={!editProfile}
							id="cardName"
							name="cardholder"
							label="Card holder"
							fullWidth
							autoComplete="cc-name"
							variant="standard"
							value={values.cardholder}
							onChange={handleChanges}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							disabled={!editProfile}
							id="numberCard"
							name="cardnumber"
							label="Card number"
							fullWidth
							autoComplete="cc-number"
							variant="standard"
							value={values.cardnumber}
							onChange={handleChanges}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControlLabel
							control={
								<Switch
									checked={editProfile}
									onChange={(e) => setEditProfile(e.target.checked)}
								/>
							}
							label="Edit profile"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Button
							variant="contained"
							endIcon={<SaveAs />}
							onClick={() => setOpen(true)}
						>
							Save
						</Button>
					</Grid>
					<Modal
						open={open}
						onClose={() => setOpen(false)}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<Box sx={style}>
							<Typography
								id="modal-modal-title"
								variant="h6"
								component="h2"
								sx={{ paddingBottom: '10px' }}
							>
								ESTA SEGURO DE GUARDAR LOS CAMBIOS?
							</Typography>
							<Stack spacing={2} direction="row">
								<Button
									component={Link}
									to="/home"
									variant="contained"
									value="no"
									onClick={handleSave}
								>
									No
								</Button>
								<Button
									component={Link}
									variant="contained"
									value="si"
									onClick={handleSave}
								>
									Si
								</Button>
							</Stack>
						</Box>
					</Modal>
				</Grid>
			</FormControl>
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

export default MyProfile;
