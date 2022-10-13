import React from 'react';
import { Container } from '@mui/material';
import { makeStyles } from 'tss-react/mui';


const HomeContainer = ({ children, ...rest }) => {
	const classes = useStyles();

	return (
  <div>
		<Container className={classes.Container} {...rest}>
			{children}
		</Container>
</div>

	);
};

const useStyles = makeStyles((theme) => ({
	container: {
		minHeight: '100vh',
		display: 'flex',
		alignItems: 'center',
		paddingTop: `calc( ${theme.spacing(4)}px + ${theme.navbarHeight} ) `,
		paddingBottom: theme.spacing(4),
		[theme.breakpoints.down('sm')]: {
			paddingTop: theme.navbarHeight,
		},
	},
}));

export default HomeContainer;
