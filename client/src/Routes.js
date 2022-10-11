import React from 'react';
import { Routes as Rutas, Route } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import { MainHome } from './pages';
import { Navbar, Social, Footer, Loader } from './components';

const Routes = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<>
			<Loader />
			<Navbar />
			{!isMobile ? <Social /> : null}
			<Rutas>
				<Route exact path="/" element={<MainHome />} />
			</Rutas>
			<Footer />
		</>
	);
};

export default Routes;
