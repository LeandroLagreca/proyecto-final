import { Filter, About, Games } from '../sections';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/reducers/videoGame';
import { getGames } from '../redux/actions/videoGame';

import { Social } from '../components';


const MainHome = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setLoading())
		dispatch(getGames());
	}, [dispatch]);

	return (
		<>
			<div>
				<div>
				</div>
				<Social />
				<Filter />
				<Games />
				<About />
			</div>
		</>
	);
};

export default MainHome;
