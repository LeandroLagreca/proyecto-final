import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import Card from '../components/Cards/Card';
import Pagined from '../components/Pagination/Pagination';

const Games = () => {
	const allGames = useSelector((state) => state.videogames.filterGames);

	const [page, setPage] = React.useState(1);
	const [gamesPerPage, setGamesPerPage] = React.useState(5);
	const indexOfLastGame = gamesPerPage * page; // 10
	const indexOfFirtsGame = indexOfLastGame - gamesPerPage; // 0
	const currentGames = allGames.slice(indexOfFirtsGame, indexOfLastGame);

	return (
		<div>
			<Pagined setPage={setPage} setGamesPerPage={setGamesPerPage} />
			<Box display="flex" flexDirection={'row'}>
				{currentGames?.map((e, index) => {
					return (
						<Box key={index}>
							<ul
								style={{
									display: 'flex',
									flexWrap: 'wrap',
									justifyContent: 'center',
									listStyle: 'none',
								}}
							>
								<li>
									{
										<Card
											background_image={e.background_image}
											name={e.name}
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
