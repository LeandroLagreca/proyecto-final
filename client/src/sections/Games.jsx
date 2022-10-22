import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/material';

import { changePage } from '../redux/reducers/videoGame';

import { Loader } from '../components';
import Card from '../components/Cards/Card';
import Pagined from '../components/Pagination/Pagination';
import { getGames, getRowVideoGames } from '../redux/actions/videoGame';

const styles = {
	container: {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
		justifyItems: 'center',
		paddingX: 10,
	},
};

const Games = () => {
	const allGames = useSelector((state) => state.videogames.filterGames);
	const count = useSelector((state) => state.videogames.rowVideoGames);
	const { loading, page } = useSelector((state) => state.videogames);
	const [gamesPerPage, setGamesPerPage] = useState(10);
	const indexOfLastGame = gamesPerPage * page; // 10
	const indexOfFirtsGame = indexOfLastGame - gamesPerPage; // 0
	// const currentGames = allGames.slice(indexOfFirtsGame, indexOfLastGame);
  const currentGames = []
	const totalPages = Math.ceil(parseInt(count) / gamesPerPage);

	const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getGames("", page));
  // }, [page, dispatch]);

	if (loading) return <Loader />;
	else if (!allGames.length)
		return <h3>No hay resultados que coincidan con tu búsqueda.</h3>;

	return (
		<Box flex={4}>
			<Box sx={styles.container}>
				{allGames?.map((e, index) => {
					return (
						<Box key={index}>
							<ul
								style={{
									display: 'flex',
									flexWrap: 'wrap',
									width: '190px',
									justifyContent: 'center',
									listStyle: 'none',
								}}
							>
								<li>
									{
										<Card
											background_image={e.background_image}
											name={e.name}
											id={e.id}
											price={e.price}
											description={e.description}
										/>
									}
								</li>
							</ul>
						</Box>
					);
				})}
			</Box>
			<Pagined
				setPage={(num) => dispatch(changePage(num))}
				setGamesPerPage={setGamesPerPage}
				total={totalPages}
				current={page}
			/>
		</Box>
	);
};

export default Games;
