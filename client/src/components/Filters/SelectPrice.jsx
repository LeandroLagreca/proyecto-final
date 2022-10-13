import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { setFilterByPrice } from '../../redux/actions/videoGame';

export default function SelectPrice() {
  const dispatch = useDispatch();
	// const filterGames = useSelector((state) => state.videogames.filterGames);
	const games = useSelector((state) => state.videogames.games);

	const [price, setPrice] = React.useState('');

	const handlePrice = (event) => {
		setPrice(event.target.value);
    dispatch(setFilterByPrice(games,event.target.value));

	};

	return (
		<div>
			<FormControl sx={{ m: 1, minWidth: 100 }}>
				<InputLabel>Price</InputLabel>
				<Select value={price} onChange={handlePrice} autoWidth label="Price">
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
					<MenuItem value="asc">Alto</MenuItem>
					<MenuItem value="desc">Bajo</MenuItem>
				</Select>
			</FormControl>
		</div>
	);
}
