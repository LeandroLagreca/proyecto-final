import { useSelector, useDispatch } from 'react-redux';
import FormControl from '@mui/material/FormControl';
import { filterByRating } from '../../redux/reducers/videoGame';
import { Box, Rating } from '@mui/material';

export default function SelectRating() {
	const { rating } = useSelector((state) => state.videogames.filters);
	const dispatch = useDispatch();

	const handleRating = (event) => {
		console.log(event.target.value);
		dispatch(filterByRating(event.target.value));
	};

	return (
		<div>
			<FormControl sx={{ m: 1, minWidth: 100 }}>
				<Box>
					<Box sx={{ marginLeft: '35px', marginBottom: '10px' }}>
						<label htmlFor="">Rating</label>
					</Box>
					<Rating
						name="simple-controlled"
						value={parseInt(rating)}
						onChange={handleRating}
					/>
				</Box>
			</FormControl>
		</div>
	);
}
