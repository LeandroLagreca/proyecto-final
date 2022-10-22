import { useSelector, useDispatch } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { filterByGenre } from '../../redux/reducers/videoGame';

export default function SelectGenere() {
	const dispatch = useDispatch();
	const { genre } = useSelector(state => state.videogames.filters)
	
	const handleGenere = (event) => {
		dispatch(filterByGenre(event.target.value))
	};

	return (
		<div>
			<FormControl sx={{ m: 1, minWidth: 100 }}>
				<InputLabel>Genere</InputLabel>
				<Select value={genre} onChange={handleGenere} autoWidth label="Genere">
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
					<MenuItem value="Action">Action</MenuItem>
					<MenuItem value="Indie">Indie</MenuItem>
					<MenuItem value="Adventure">Adventure</MenuItem>
					<MenuItem value="RPG">RPG</MenuItem>
					<MenuItem value="Strategy">Strategy</MenuItem>
					<MenuItem value="Shooter">Shooter</MenuItem>
					<MenuItem value="Casual">Casual</MenuItem>
					<MenuItem value="Simulation">Simulation</MenuItem>
					<MenuItem value="Puzzle">Puzzle</MenuItem>
					<MenuItem value="Arcade">Arcade</MenuItem>
					<MenuItem value="Platformer">Platformer</MenuItem>
					<MenuItem value="Racing">Racing</MenuItem>
					<MenuItem value="Massively Multiplayer">Massively Multiplayer</MenuItem>
					<MenuItem value="Sports">Sports</MenuItem>
					<MenuItem value="Fighting">Fighting</MenuItem>
					<MenuItem value="Family">Family</MenuItem>
					<MenuItem value="Board Games">Board Games</MenuItem>
					<MenuItem value="Educational">Educational</MenuItem>
					<MenuItem value="Card">Card</MenuItem>
				</Select>
			</FormControl>
		</div>
	);
}
