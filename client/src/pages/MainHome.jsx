import { About, Games, FilterSection } from '../sections';
import { Social } from '../components';
import { Box, Stack } from '@mui/material';

const MainHome = () => {

	return (
		<>
			<Box>
				<Social />
				<Stack direction={'row'}>
					<FilterSection />
					<Games />
				</Stack>
				<About />
			</Box>
		</>
	);
};

export default MainHome;
