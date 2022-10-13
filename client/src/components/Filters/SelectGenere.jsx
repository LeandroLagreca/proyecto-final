import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { setFilterByGenere } from '../../redux/actions/videoGame';

export default function SelectGenere() {
	const dispatch = useDispatch();
	const [genere, setGenere] = React.useState('');
	const games = useSelector((state) => state.videogames.games);

	// Se comento el dispatch para que no se rompa el codigo, se esta esperando que se cree este campo en la data de la API
	const handleGenere = (event) => {
		setGenere(event.target.value);
		//dispatch(setFilterByGenere(games, event.target.value))
	};

	return (
		<div>
			<FormControl sx={{ m: 1, minWidth: 100 }}>
				<InputLabel>Genere</InputLabel>
				<Select value={genere} onChange={handleGenere} autoWidth label="Genere">
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
					<MenuItem value="Accion">Accion</MenuItem>
					<MenuItem value="Deportes">Deportes</MenuItem>
					<MenuItem value="Arcade">Arcade</MenuItem>
					<MenuItem value="Estrategia">Estrategia</MenuItem>
					<MenuItem value="Disparos">Disparos</MenuItem>
				</Select>
			</FormControl>
		</div>
	);
}
