import { Home, About, Games } from '../sections';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/reducers/videoGame';
import { getGames } from '../redux/actions/videoGame';

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
				<Home />
				<Games />
				<About />
			</div>
		</>
	);
};

export default MainHome;
