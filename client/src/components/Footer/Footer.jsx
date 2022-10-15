import React from 'react';
import { Container, Grid, Typography, Link, styled } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import Copyright from './Copyright';

const footers = [
	{
		title: 'Team',
		description: [
			{ item: '@megagus182', url: 'https://github.com/megagus182' },
			{ item: '@Cristianbenz', url: 'https://github.com/Cristianbenz' },
			{ item: '@LeandroLagreca', url: 'https://github.com/LeandroLagreca' },
			{
				item: '@NatalEscudero190254',
				url: 'https://github.com/NatalEscudero190254',
			},
			{ item: '@Zaikkoz', url: 'https://github.com/Zaikkoz' },
			{ item: '@Mariovillalba98', url: 'https://github.com/Mariovillalba98' },
			{ item: '@lemarti', url: 'https://github.com/lemarti' },
			{ item: '@davidjss04', url: 'https://github.com/davidjss04' },
		],
	},
	{
		title: 'Technologies',
		description: [
			{ item: 'ReactJs', url: 'https://reactjs.org/' },
			{ item: 'MaterialUI', url: 'https://mui.com/' },
			{ item: 'Nodejs', url: 'https://nodejs.org/' },
			{ item: 'JavaScript', url: 'https://www.javascript.com/' },
			{ item: 'PostgreSQL', url: 'https://www.postgresql.org/' },
			{ item: 'Firebase', url: 'https://firebase.google.com/' },
			{ item: 'Express', url: 'https://expressjs.com/' },
		],
	},
	{
		title: 'Legal',
		description: [
			{ item: 'PRIVACY POLICY', url: '#' },
			{ item: 'TERMS OF USE', url: '#' },
		],
	},
	{
		title: 'Social',
		description: [
			{
				item: 'FACEBOOK',
				url: '#',
				icon: <FacebookIcon sx={{ paddingRight: '10px' }} />,
			},
			{ item: 'INSTAGRAM', url: '#', icon: <InstagramIcon sx={{ paddingRight: '10px' }}/> },
			{ item: 'TWITTER', url: '#', icon: <TwitterIcon sx={{ paddingRight: '10px' }}/> },
		],
	},
];

const List = styled('ul')(({ theme }) => ({
	margin: 0,
	padding: 0,
	listStyle: 'none',
}));

const Footer = () => {
	return (
		<>
			<Container
				maxWidth="md"
				component="footer"
				sx={{
					borderTop: (theme) => `1px solid ${theme.palette.divider}`,
					mt: 8,
					py: [3, 6],
				}}
			>
				<Grid container spacing={4} justifyContent="space-evenly">
					{footers.map((footer) => (
						<Grid item xs={6} sm={3} key={footer.title}>
							<Typography variant="h6" color="text.primary" gutterBottom>
								{footer.title}
							</Typography>
							<List>
								{footer.description.map((item) => (
									<li key={item.item}>
										<Link
											href={item.url}
											variant="subtitle1"
											color="text.secondary"
											underline="none"
											sx={{
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
											}}
										>
											{item.icon === undefined ? null : item.icon}
											{item.item}
										</Link>
									</li>
								))}
							</List>
						</Grid>
					))}
				</Grid>
				<Copyright sx={{ mt: 5 }} />
			</Container>
		</>
	);
};

export default Footer;
