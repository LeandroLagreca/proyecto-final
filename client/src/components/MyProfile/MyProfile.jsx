import React from 'react';
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
} from '@mui/material';

import { styled } from '@mui/material/styles';

import { SaveAs, PhotoCamera } from '@mui/icons-material';

const MyProfile = () => {
	return (
		<Container
			maxWidth="sm"
			sx={{ mb: 5, paddingTop: '40px' }}
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
							required
							id="firstName"
							name="firstName"
							label="First name"
							fullWidth
							autoComplete="given-name"
							variant="standard"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id="lastName"
							name="lastName"
							label="Last name"
							fullWidth
							autoComplete="family-name"
							variant="standard"
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							id="address1"
							name="address1"
							label="Address line 1"
							fullWidth
							autoComplete="shipping address-line1"
							variant="standard"
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="address2"
							name="address2"
							label="Address line 2"
							fullWidth
							autoComplete="shipping address-line2"
							variant="standard"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id="city"
							name="city"
							label="City"
							fullWidth
							autoComplete="shipping address-level2"
							variant="standard"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							id="state"
							name="state"
							label="State/Province/Region"
							fullWidth
							variant="standard"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id="zip"
							name="zip"
							label="Zip / Postal code"
							fullWidth
							autoComplete="shipping postal-code"
							variant="standard"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id="country"
							name="country"
							label="Country"
							fullWidth
							autoComplete="shipping country"
							variant="standard"
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							id="cardName"
							name="cardName"
							label="Card holder"
							fullWidth
							autoComplete="cc-name"
							variant="standard"
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							id="numberCard"
							name="numberCard"
							label="Card number"
							fullWidth
							autoComplete="cc-number"
							variant="standard"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControlLabel
							control={<Switch defaultChecked />}
							label="Label"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Button variant="contained" endIcon={<SaveAs />}>
							Save
						</Button>
					</Grid>
				</Grid>
			</FormControl>
			<Stack direction="row" spacing={1}>
				<Badge
					overlap="circular"
					anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
					badgeContent={
						<IconButton
							color="primary"
							aria-label="upload picture"
							component="label"
						>
							<input hidden accept="image/*" type="file" />
							<PhotoCamera sx={{ width: 100, height: 100 }} />
						</IconButton>
					}
				>
					<Avatar
						sx={{ width: 400, height: 400 }}
						alt="Travis Howard"
						src="https://learn.microsoft.com/en-us/answers/storage/attachments/209536-360-f-364211147-1qglvxv1tcq0ohz3fawufrtonzz8nq3e.jpg"
					/>
				</Badge>
			</Stack>
		</Container>
	);
};

export default MyProfile;
