import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import imagen from '../Nosotros/fotomario.png';
import { Grid } from '@mui/material';
import Navbar from "../Navbar/Navbar"


export default function MediaControlCard() {
	const theme = useTheme();

	return (
		<div>
		<Navbar/>
			<Typography margin={3} fontSize={60}>Our Team</Typography>
			<Typography>We like to program and work as a team. We don't solve problems, we create solutions.</Typography>
			  	
				<Grid container direction="row" spacing={6} margin={8}>
				<Grid item xs={3.5} >
				<Card sx={{ display: 'flex' }}>
					<Box sx={{ width:"100%", display: 'flex', flexDirection: 'column' }}>
						<CardContent sx={{ flex: '1 0 auto' }}>
							<Typography component="div" variant="h5">
								Mario Villalba
							</Typography>
							<Typography
								variant="subtitle1"
								color="text.secondary"
								component="div"
							>
								Software Developer
							</Typography>
						</CardContent>
						<Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
							<LinkedInIcon sx={{ height: 38, width: 38 }}>
								{theme.direction === 'rtl' ? (
									<SkipNextIcon />
								) : (
									<SkipPreviousIcon />
								)}
							</LinkedInIcon>
						</Box>
					</Box>
					<CardMedia
						component="img"
						sx={{ width: 151 }}
						image={imagen}
						alt="Live from space album cover"
					/>
				</Card>		
				</Grid>

				<Grid item xs={3.5} >
				<Card sx={{ display: 'flex' }}>
					<Box sx={{ width:"100%", display: 'flex', flexDirection: 'column' }}>
						<CardContent sx={{ flex: '1 0 auto' }}>
							<Typography component="div" variant="h5">
								Mario Villalba
							</Typography>
							<Typography
								variant="subtitle1"
								color="text.secondary"
								component="div"
							>
								Software Developer
							</Typography>
						</CardContent>
						<Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
							<LinkedInIcon sx={{ height: 38, width: 38 }}>
								{theme.direction === 'rtl' ? (
									<SkipNextIcon />
								) : (
									<SkipPreviousIcon />
								)}
							</LinkedInIcon>
						</Box>
					</Box>
					<CardMedia
						component="img"
						sx={{ width: 151 }}
						image={imagen}
						alt="Live from space album cover"
					/>
				</Card>		
				</Grid>

				<Grid item xs={3.5} >
				<Card sx={{ display: 'flex' }}>
					<Box sx={{ width:"100%", display: 'flex', flexDirection: 'column' }}>
						<CardContent sx={{ flex: '1 0 auto' }}>
							<Typography component="div" variant="h5">
								Mario Villalba
							</Typography>
							<Typography
								variant="subtitle1"
								color="text.secondary"
								component="div"
							>
								Software Developer
							</Typography>
						</CardContent>
						<Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
							<LinkedInIcon sx={{ height: 38, width: 38 }}>
								{theme.direction === 'rtl' ? (
									<SkipNextIcon />
								) : (
									<SkipPreviousIcon />
								)}
							</LinkedInIcon>
						</Box>
					</Box>
					<CardMedia
						component="img"
						sx={{ width: 151 }}
						image={imagen}
						alt="Live from space album cover"
					/>
				</Card>		
				</Grid>

				<Grid item xs={3.5} >
				<Card sx={{ display: 'flex' }}>
					<Box sx={{ width:"100%", display: 'flex', flexDirection: 'column' }}>
						<CardContent sx={{ flex: '1 0 auto' }}>
							<Typography component="div" variant="h5">
								Mario Villalba
							</Typography>
							<Typography
								variant="subtitle1"
								color="text.secondary"
								component="div"
							>
								Software Developer
							</Typography>
						</CardContent>
						<Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
							<LinkedInIcon sx={{ height: 38, width: 38 }}>
								{theme.direction === 'rtl' ? (
									<SkipNextIcon />
								) : (
									<SkipPreviousIcon />
								)}
							</LinkedInIcon>
						</Box>
					</Box>
					<CardMedia
						component="img"
						sx={{ width: 151 }}
						image={imagen}
						alt="Live from space album cover"
					/>
				</Card>		
				</Grid>

				<Grid item xs={3.5} >
				<Card sx={{ display: 'flex' }}>
					<Box sx={{ width:"100%", display: 'flex', flexDirection: 'column' }}>
						<CardContent sx={{ flex: '1 0 auto' }}>
							<Typography component="div" variant="h5">
								Mario Villalba
							</Typography>
							<Typography
								variant="subtitle1"
								color="text.secondary"
								component="div"
							>
								Software Developer
							</Typography>
						</CardContent>
						<Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
							<LinkedInIcon sx={{ height: 38, width: 38 }}>
								{theme.direction === 'rtl' ? (
									<SkipNextIcon />
								) : (
									<SkipPreviousIcon />
								)}
							</LinkedInIcon>
						</Box>
					</Box>
					<CardMedia
						component="img"
						sx={{ width: 151 }}
						image={imagen}
						alt="Live from space album cover"
					/>
				</Card>		
				</Grid>

				<Grid item xs={3.5} >
				<Card sx={{ display: 'flex' }}>
					<Box sx={{ width:"100%", display: 'flex', flexDirection: 'column' }}>
						<CardContent sx={{ flex: '1 0 auto' }}>
							<Typography component="div" variant="h5">
								Mario Villalba
							</Typography>
							<Typography
								variant="subtitle1"
								color="text.secondary"
								component="div"
							>
								Software Developer
							</Typography>
						</CardContent>
						<Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
							<LinkedInIcon sx={{ height: 38, width: 38 }}>
								{theme.direction === 'rtl' ? (
									<SkipNextIcon />
								) : (
									<SkipPreviousIcon />
								)}
							</LinkedInIcon>
						</Box>
					</Box>
					<CardMedia
						component="img"
						sx={{ width: 151 }}
						image={imagen}
						alt="Live from space album cover"
					/>
				</Card>		
				</Grid>

				<Grid item xs={3.5} >
				<Card sx={{ display: 'flex' }}>
					<Box sx={{ width:"100%", display: 'flex', flexDirection: 'column' }}>
						<CardContent sx={{ flex: '1 0 auto' }}>
							<Typography component="div" variant="h5">
								Mario Villalba
							</Typography>
							<Typography
								variant="subtitle1"
								color="text.secondary"
								component="div"
							>
								Software Developer
							</Typography>
						</CardContent>
						<Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
							<LinkedInIcon sx={{ height: 38, width: 38 }}>
								{theme.direction === 'rtl' ? (
									<SkipNextIcon />
								) : (
									<SkipPreviousIcon />
								)}
							</LinkedInIcon>
						</Box>
					</Box>
					<CardMedia
						component="img"
						sx={{ width: 151 }}
						image={imagen}
						alt="Live from space album cover"
					/>
				</Card>		
				</Grid>

				<Grid item xs={3.5} >
				<Card sx={{ display: 'flex' }}>
					<Box sx={{ width:"100%", display: 'flex', flexDirection: 'column' }}>
						<CardContent sx={{ flex: '1 0 auto' }}>
							<Typography component="div" variant="h5">
								Mario Villalba
							</Typography>
							<Typography
								variant="subtitle1"
								color="text.secondary"
								component="div"
							>
								Software Developer
							</Typography>
						</CardContent>
						<Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
							<LinkedInIcon sx={{ height: 38, width: 38 }}>
								{theme.direction === 'rtl' ? (
									<SkipNextIcon />
								) : (
									<SkipPreviousIcon />
								)}
							</LinkedInIcon>
						</Box>
					</Box>
					<CardMedia
						component="img"
						sx={{ width: 151 }}
						image={imagen}
						alt="Live from space album cover"
					/>
				</Card>		
				</Grid>
				</Grid>
		</div>
	);
}