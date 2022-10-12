import React from 'react';
import { Routes as Rutas, Route } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import { MainHome } from './pages';
import { Navbar, Social, Footer, Loader,  } from './components';
import Paginated from './components/Pagination/Pagination';

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
				<Route path="/pagination" element={<Paginated/>}/>
			</Rutas>
			<Footer />
		</>
	);
};

export default Routes;
