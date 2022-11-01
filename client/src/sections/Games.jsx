import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/material';

import { changePage } from '../redux/reducers/videoGame';

import { Loader } from '../components';
import Card from '../components/Cards/Card';
import Pagined from '../components/Pagination/Pagination';

const styles = {
	container: {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
		justifyItems: 'center',
		columnGap: 5,
		rowGap: 5,
		paddingX: 8,
	},
};

const Games = () => {
	const { loading, page, games, totalResults } = useSelector((state) => state.videogames);
	const [gamesPerPage, setGamesPerPage] = useState(10);
	const totalPages = Math.ceil(parseInt(totalResults) / gamesPerPage);

	const dispatch = useDispatch();

	if (loading) return <Loader />;
	else if (!games.length && !loading)
		return <h3>No hay resultados que coincidan con tu búsqueda.</h3>;

	return (
		<Box flex={6} >
			<Box sx={styles.container} >
				{games?.map((e, index) => {
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
											discount={e.discount}
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
