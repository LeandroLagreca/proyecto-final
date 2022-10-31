import { About, Games, FilterSection } from '../sections';
import { Footer, Social } from '../components';
import { Box, Stack } from '@mui/material';
import Sidebar from '../components/Sidebar/Sidebar';
import ContactComponent from '../components/ContactUsComponent/ContactUs';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { putUserData } from '../redux/actions/user';

const MainHome = () => {

	return (
		<>
			<Box>
				<Sidebar />
				<Social />
				<Stack direction={'row'}>
					<FilterSection />
					<Games />
				</Stack>
				<About />
				<ContactComponent />
				<Footer />
			</Box>
		</>
	);
};

export default MainHome;
