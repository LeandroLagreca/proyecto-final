import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { setFilterByPrice } from '../../redux/actions/videoGame';
import { useState } from 'react';

export default function SelectPrice() {
	const dispatch = useDispatch();
	// const filterGames = useSelector((state) => state.videogames.filterGames);
	const games = useSelector((state) => state.videogames.filterGames);
	const [price, setPrice] = React.useState('');
	const page = useSelector(state => state.videogames.page)
	const [currentPage, setCurrentPage] = useState(page)

	const handlePrice = (event) => {
		setPrice(event.target.value);
		dispatch(setFilterByPrice(games, event.target.value));
		setCurrentPage(1);
	};

	return (
		<div>
			<FormControl sx={{ m: 1, minWidth: 100 }}>
				<InputLabel>Price</InputLabel>
				<Select value={price} onChange={handlePrice} autoWidth label="Price">
					<MenuItem value="none">
						<em>None</em>
					</MenuItem>
					<MenuItem value="5">Hasta $5</MenuItem>
					<MenuItem value="5a10">$5 a $10</MenuItem>
					<MenuItem value="10a30">$10 a $30</MenuItem>
					<MenuItem value="30a50">$30 a $50</MenuItem>
					<MenuItem value="50">Más de $50</MenuItem>
				</Select>
			</FormControl>
		</div>
	);
}



