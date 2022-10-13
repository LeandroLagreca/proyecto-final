import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { setFilterByType } from '../../redux/actions/videoGame';

export default function SelectType() {
	const dispatch = useDispatch();

	const games = useSelector((state) => state.videogames.games);

	const [type, setType] = React.useState('');

	// Se comento el dispatch para que no se rompa el codigo, se esta esperando que se cree este campo en la data de la API
	const handleType = (event) => {
		setType(event.target.value);
		// dispatch(setFilterByType(games, event.target.value));
	};

	return (
		<div>
			<FormControl sx={{ m: 1, minWidth: 100 }}>
				<InputLabel>Type</InputLabel>
				<Select value={type} onChange={handleType} autoWidth label="Type">
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
					<MenuItem value="alto">Pago</MenuItem>
					<MenuItem value="bajo">Gratis</MenuItem>
				</Select>
			</FormControl>
		</div>
	);
}
