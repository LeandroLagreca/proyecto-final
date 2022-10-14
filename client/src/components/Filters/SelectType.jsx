import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { setFilterByType } from '../../redux/actions/videoGame';
import { useState } from 'react';
export default function SelectType() {
	const dispatch = useDispatch();

	const games = useSelector((state) => state.videogames.games);
	const page = useSelector(state => state.videogames.page)
	const [type, setType] = React.useState('');
	const [currentPage, setCurrentPage] = useState(page)

	// Se comento el dispatch para que no se rompa el codigo, se esta esperando que se cree este campo en la data de la API
	const handleType = (event) => {
		setType(event.target.value);
		console.log(event.target.value);
		 dispatch(setFilterByType(games, event.target.value));
		 setCurrentPage(1)
	};

	return (
		<div>
			<FormControl sx={{ m: 1, minWidth: 100 }}>
				<InputLabel>A-Z</InputLabel>
				<Select value={type} onChange={handleType} autoWidth label="Type">
					<MenuItem value="none">
						<em>None</em>
					</MenuItem>
					<MenuItem value="asc">A/z</MenuItem>
					<MenuItem value="desc">Z/a</MenuItem>
				</Select>
			</FormControl>
		</div>
	);
}
