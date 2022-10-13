import React from 'react';
import { Routes as Rutas, Route } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import { Detail, MainHome, Landing, AdminPanel } from './pages';



import { Navbar, Social, Footer, Loader,  } from './components';
import Wishes from './components/Wishes/AddtoWishes';




const Routes = () => {
	//solve conflictos
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<>
			<Loader />
			<Navbar />
			{!isMobile ? <Social /> : null}
			<Rutas>
				<Route exact path="/landing" element={<Landing />} />
				<Route exact path="/" element={<MainHome />} />
				<Route path="/detail/:id" element={<Detail />} />
				<Route path='/wishes' element={<Wishes/>} />
				<Route path='/admin' element={<AdminPanel/>} />
			</Rutas>
			<Footer />
		</>
	);
};

export default Routes;
