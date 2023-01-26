import { Box, Button, Link as MuiLink } from '@mui/material';
import React from 'react';
import './LandingPage.css';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { Link } from 'react-router-dom';
import gameScript from "../../assets/logogame.png"

const LandingPage = () => {
	return (
		<div className='eldiv' >
		<Box 
		sx={{
			mt: 8,
			mb: 12,
			p: 2,
			maxWidth: "1200px",
			mx: "auto",
			backgroundImage:""
		}}
		>
			    <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",

                }}
                > 
				<img className='foto' src={gameScript} alt="Logo not found" />     
				<MuiLink component={Link} to={'/home'} underline="none">
					<Button sx={{color:"white"}}
						className="button-recipe3"
						
					>
						Start Game
					</Button>
				</MuiLink>
				</Box>
		</Box>
		</div>
				

	);
};

export default LandingPage;
