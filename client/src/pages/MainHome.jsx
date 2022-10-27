import { About, Games, FilterSection } from '../sections';
import { Footer, Social } from '../components';
import { Box, Stack } from '@mui/material';
import Sidebar from '../components/Sidebar/Sidebar';

const MainHome = () => {

	return (
		<>
			<Box>
				<Sidebar/>
				<Social />
				<Stack direction={'row'}>
					<FilterSection />
					<Games />
				</Stack>
				<About />
				<Footer/>
			</Box>
		</>
	);
};

export default MainHome;
