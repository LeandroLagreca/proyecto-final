import { About, Games, FilterSection  } from '../sections';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/reducers/videoGame';
import { getGames } from '../redux/actions/videoGame';
import Sidebar from '../components/Sidebar/Sidebar';
import { Social } from '../components';
import { Box, Stack } from '@mui/material';


const MainHome = ({setMode, mode}) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setLoading())
		dispatch(getGames());
	}, [dispatch]);

	return (
		<>
			<Box>
				<Social />
				<Stack direction={"row"}  >
					<FilterSection />
					<Games />
				</Stack>
				<About />	
			</Box>
		</>
	);
};

export default MainHome;
