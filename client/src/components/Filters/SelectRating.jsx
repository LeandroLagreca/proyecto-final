import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import { useSelector, useDispatch } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { setFilterByRating } from '../../redux/actions/videoGame';
import { useState } from 'react';
export default function SelectRating() {
	const dispatch = useDispatch();

	const [rating, setRating] = React.useState('');
	const page = useSelector(state => state.videogames.page)
	const games = useSelector((state) => state.videogames.filterGames);
	const [currentPage, setCurrentPage] = useState(page)

	const handleRating = (event) => {
		setRating(event.target.value);
		console.log(event.target.value);
		dispatch(setFilterByRating(games, event.target.value));
		setCurrentPage(1)
	};

	return (
		<div>
			<FormControl sx={{ m: 1, minWidth: 100 }}>
				<InputLabel>Rating</InputLabel>
				<Select value={rating} onChange={handleRating} autoWidth label="Rating">
					<MenuItem value="none">
						<em>None</em>
					</MenuItem>
					<MenuItem value="1star">1⭐</MenuItem>
					<MenuItem value="2star">2⭐⭐</MenuItem>
					<MenuItem value="3star">3⭐⭐⭐</MenuItem>
					<MenuItem value="4star">4⭐⭐⭐⭐</MenuItem>
					<MenuItem value="5star">5⭐⭐⭐⭐⭐</MenuItem>
				</Select>
			</FormControl>
		</div>
	);
}
