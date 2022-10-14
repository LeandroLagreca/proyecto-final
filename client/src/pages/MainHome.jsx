import React from 'react';
import { Home, About, Games } from '../sections';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getGames } from '../redux/actions/videoGame';

const MainHome = () => {
	const dispatch = useDispatch();
	useEffect(() => {
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
