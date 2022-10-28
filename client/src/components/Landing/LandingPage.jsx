import { Box, Button, Link as MuiLink } from '@mui/material';
import React from 'react';
import './LandingPage.css';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { Link } from 'react-router-dom';

const LandingPage = () => {
	return (
		<Box className="landing">
			<div className="btnContainer">
				<MuiLink component={Link} to={'/home'} underline="none">
					<Button
						className="btn"
						color="secondary"
						sx={{
							backgroundColor: 'white',
						}}
					>
						Start Game
						<SportsEsportsIcon
							sx={{
								marginLeft: '8px',
							}}
						/>
					</Button>
				</MuiLink>
			</div>
		</Box>
	);
};

export default LandingPage;
