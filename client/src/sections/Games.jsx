import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/material';

import { changePage } from '../redux/reducers/videoGame';

import Card from '../components/Cards/Card';
import Pagined from '../components/Pagination/Pagination';

const Games = () => {
	const allGames = useSelector((state) => state.videogames.filterGames);
	const page = useSelector(state => state.videogames.page)
	const [gamesPerPage, setGamesPerPage] = useState(5);
	const indexOfLastGame = gamesPerPage * page; // 10
	const indexOfFirtsGame = indexOfLastGame - gamesPerPage; // 0
	const currentGames = allGames.slice(indexOfFirtsGame, indexOfLastGame);
	const totalPages = Math.ceil(allGames.length / gamesPerPage)

	const dispatch = useDispatch()

	return (
		<div>
			<Pagined 
				setPage={(num) => dispatch(changePage(num))} 
				setGamesPerPage={setGamesPerPage}
				total={totalPages}
				current={page}
			/>
			<Box display="flex" flexDirection={'row'}>
				{currentGames?.map((e, index) => {
					return (
						<Box key={index}>
							<ul
								style={{
									display: 'flex',
									flexWrap: 'wrap',
									width: "190px",
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
		</div>
	);
};

export default Games;

