import React from 'react';
import { Home, About, Games } from '../sections';
import Paginated from '../components/Pagination/Pagination';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getGames } from '../redux/actions/videoGame';
import Cards from '../components/Cards/Cards';
import firebaseApp from '../firebase/credenciales';
import { getAuth, signOut } from 'firebase/auth';
const auth = getAuth(firebaseApp);

const MainHome = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getGames());
	}, []);

	return (
		<>
			<div>
				<div>
					{' '}
					Home
					<button onClick={() => signOut(auth)}>AUTH</button>
				</div>
				<Home />
				<Games />
				<About />
			</div>
		</>
	);
};

export default MainHome;
