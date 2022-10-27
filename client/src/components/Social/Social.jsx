import React from 'react';
import { Paper, Box } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import Item from '../../components/Items/Item';
import { useSelector } from 'react-redux';
import './Social.css';
import { Link } from 'react-router-dom';

const Social = () => {
	const gameBanner = useSelector((state) => state.videogames.games);

	return (
		<Box className="boxBanner">
			<Paper height={400} className="paperBan" elevation={1}>
				<Carousel className="carusel" indicators={false} animation={'slide'}>
					{gameBanner.map((item) => (
						<Link to={`/detail/${item.id}`} key={item.id}>
							<Item
								key={item.id}
								item={item.background_image}
								name={item.name}
							/>
						</Link>
					))}
				</Carousel>
			</Paper>
		</Box>
	);
};

export default Social;
