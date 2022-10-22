import { About, Games, FilterSection } from '../sections';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux/reducers/videoGame';
import { getGames } from '../redux/actions/videoGame';
import Sidebar from '../components/Sidebar/Sidebar';
import { Social } from '../components';
import { Box, Stack } from '@mui/material';
import { getRowVideoGames } from '../redux/actions/videoGame';

const MainHome = ({ setMode, mode }) => {
	const { page } = useSelector((state) => state.videogames);
	const { filterGames } = useSelector((state) => state.videogames);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getRowVideoGames());
		dispatch(setLoading());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getGames('', page.toString()));
	}, [page, dispatch]);

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
