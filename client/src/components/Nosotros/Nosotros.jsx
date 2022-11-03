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
import { Grid } from '@mui/material';
import Navbar from "../Navbar/Navbar"
import GitHubIcon from '@mui/icons-material/GitHub';
import {Link} from '@mui/material';
import imagen from '../Nosotros/mario.png';
import natal from '../Nosotros/natal.png';
import lea from '../Nosotros/lea.png';
import fondo from '../Nosotros/fondo.png';
import leanlg from '../Nosotros/leanlg.png';
import cris from '../Nosotros/cristian.png';
import fede from '../Nosotros/fede.png';
import gustavo from '../Nosotros/gustavo.png';
import david from '../Nosotros/david.png';
import { ColorModeContext } from '../Theme/Theme';
import { useContext } from 'react';

export default function MediaControlCard() {
	const theme = useTheme();
	const { mode, toggleMode } = useContext(ColorModeContext);

	return (
		<div>
		<Navbar/>
			<Typography variant='h1' margin={3} fontSize={60}>Our Team</Typography>
			<Typography margin={1}>
				We are a group of dedicated programmers who enjoy working as a team.
				 During this experience we learned a lot about programming and about communication and working together.
			</Typography>
			  	
				<Grid container direction="row" spacing={6} margin={8}>
				<Grid item xs={3.5} >
				<Card sx={{ display: 'flex' }}>
					<Box sx={{ width:"100%", display: 'flex', flexDirection: 'column' }}>
						<CardContent sx={{ flex: '1 0 auto' }}>
							<Typography component="div" variant="h5">
								Cristian Benitez
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
							<Link
							 href='https://www.linkedin.com/in/cristian-benitez/'
							 sx={mode === 'dark' ? { color: 'white' } : { color: 'black' }}>
								<LinkedInIcon sx={{ height: 38, width: 38 }}/>
								</Link>
							<Link
							 href='https://github.com/Cristianbenz'
							 sx={mode === 'dark' ? { color: 'white' } : { color: 'black' }}>
								<GitHubIcon  sx={{ height: 34, width: 34 }}/>
							</Link>
						</Box>
					</Box>
					<CardMedia
						component="img"
						sx={{ width: 151 }}
						image={cris}
						alt="Live from space album cover"
					/>
				</Card>		
				</Grid>

				<Grid item xs={3.5} >
				<Card sx={{ display: 'flex' }}>
					<Box sx={{ width:"100%", display: 'flex', flexDirection: 'column' }}>
						<CardContent sx={{ flex: '1 0 auto' }}>
							<Typography component="div" variant="h5">
								Natal Escudero
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
							<Link href='https://www.linkedin.com/in/natal-escudero-0a0020210/'
								  sx={mode === 'dark' ? { color: 'white' } : { color: 'black' }}>
								<LinkedInIcon sx={{ height: 38, width: 38 }}/>
								</Link>
							<Link href='https://github.com/NatalEscudero190254'
								  sx={mode === 'dark' ? { color: 'white' } : { color: 'black' }}>
								<GitHubIcon  sx={{ height: 34, width: 34 }}/>
							</Link>
						</Box>
					</Box>
					<CardMedia
						component="img"
						sx={{ width: 151 }}
						image={natal}
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
							<Link href='https://www.linkedin.com/in/mario-villalba-8b7136179/'
								  sx={mode === 'dark' ? { color: 'white' } : { color: 'black' }}>
								<LinkedInIcon sx={{ height: 38, width: 38 }}/>
								</Link>
							<Link href='https://github.com/Mariovillalba98'
								  sx={mode === 'dark' ? { color: 'white' } : { color: 'black' }}>
								<GitHubIcon  sx={{ height: 34, width: 34 }}/>
							</Link>
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
								Leandro Martinó
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
							<Link href='https://www.linkedin.com/in/leandro-martin%C3%B3/'
								  sx={mode === 'dark' ? { color: 'white' } : { color: 'black' }}>
								<LinkedInIcon sx={{ height: 38, width: 38 }}/>
								</Link>
							<Link href='https://github.com/lemarti'
								  sx={mode === 'dark' ? { color: 'white' } : { color: 'black' }}>
								<GitHubIcon  sx={{ height: 34, width: 34 }}/>
							</Link>
						</Box>
					</Box>
					<CardMedia
						component="img"
						sx={{ width: 151 }}
						image={lea}
						alt="Live from space album cover"
					/>
				</Card>		
				</Grid>

				<Grid item xs={3.5} >
				<Card sx={{ display: 'flex' }}>
					<Box sx={{ width:"100%", display: 'flex', flexDirection: 'column' }}>
						<CardContent sx={{ flex: '1 0 auto' }}>
							<Typography component="div" variant="h5">
								Gustavo Castillo
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
							<Link href='https://www.linkedin.com/in/gacr1990/'
								  sx={mode === 'dark' ? { color: 'white' } : { color: 'black' }}>
								<LinkedInIcon sx={{ height: 38, width: 38 }}/>
								</Link>
							<Link href='https://github.com/megagus182'
								  sx={mode === 'dark' ? { color: 'white' } : { color: 'black' }}>
								<GitHubIcon  sx={{ height: 34, width: 34 }}/>
							</Link>
						</Box>
					</Box>
					<CardMedia
						component="img"
						sx={{ width: 151 }}
						image={gustavo}
						alt="Live from space album cover"
					/>
				</Card>		
				</Grid>

				<Grid item xs={3.5} >
				<Card sx={{ display: 'flex' }}>
					<Box sx={{ width:"100%", display: 'flex', flexDirection: 'column' }}>
						<CardContent sx={{ flex: '1 0 auto' }}>
							<Typography component="div" variant="h5">
								Leandro La Greca
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
							<Link href='https://www.linkedin.com/in/leandro-la-greca-7582ab240/'
								  sx={mode === 'dark' ? { color: 'white' } : { color: 'black' }}>
								<LinkedInIcon sx={{ height: 38, width: 38 }}/>
								</Link>
							<Link href='https://github.com/LeandroLagreca'
								  sx={mode === 'dark' ? { color: 'white' } : { color: 'black' }}>
								<GitHubIcon  sx={{ height: 34, width: 34 }}/>
							</Link>
						</Box>
					</Box>
					<CardMedia
						component="img"
						sx={{ width: 151 }}
						image={leanlg}
						alt="Live from space album cover"
					/>
				</Card>		
				</Grid>

				<Grid item xs={3.5} >
				<Card sx={{ display: 'flex' }}>
					<Box sx={{ width:"100%", display: 'flex', flexDirection: 'column' }}>
						<CardContent sx={{ flex: '1 0 auto' }}>
							<Typography component="div" variant="h5">
								Federico Goldammer
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
							<Link href='https://www.linkedin.com/in/federico-goldammer-084196232/'
								  sx={mode === 'dark' ? { color: 'white' } : { color: 'black' }}>
								<LinkedInIcon sx={{ height: 38, width: 38 }}/>
								</Link>
							<Link href='https://github.com/Zaikkoz'
								  sx={mode === 'dark' ? { color: 'white' } : { color: 'black' }}>
								<GitHubIcon  sx={{ height: 34, width: 34 }}/>
							</Link>
						</Box>
					</Box>
					<CardMedia
						component="img"
						sx={{ width: 151 }}
						image={fede}
						alt="Live from space album cover"
					/>
				</Card>		
				</Grid>

				<Grid item xs={3.5} >
				<Card sx={{ display: 'flex' }}>
					<Box sx={{ width:"100%", display: 'flex', flexDirection: 'column' }}>
						<CardContent sx={{ flex: '1 0 auto' }}>
							<Typography component="div" variant="h5">
								David Huaricancha
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
							<Link href='https://www.linkedin.com/in/davidjss04/'
								  sx={mode === 'dark' ? { color: 'white' } : { color: 'black' }}>
								<LinkedInIcon sx={{ height: 38, width: 38 }}/>
								</Link>
							<Link href='https://github.com/davidjss04'
								  sx={mode === 'dark' ? { color: 'white' } : { color: 'black' }}>
								<GitHubIcon  sx={{ height: 34, width: 34 }}/>
							</Link>
						</Box>
					</Box>
					<CardMedia
						component="img"
						sx={{ width: 151 }}
						image={david}
						alt="Live from space album cover"
					/>
				</Card>		
				</Grid>

				

				
				</Grid>
		</div>
	);
}