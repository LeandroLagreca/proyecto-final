import InputLabel from '@mui/material/InputLabel';
import { useSelector, useDispatch } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { filterByRating } from '../../redux/reducers/videoGame';
import { Rating } from '@mui/material';
import { useState } from 'react';

export default function SelectRating() {
	const {rating} = useSelector(state => state.videogames.filters)
	const dispatch = useDispatch();
	// const [value, setValue] = useState(0);
	// console.log(value)

	const handleRating = (event) => {
		// setValue(event.target.value)
		dispatch(filterByRating(event.target.value));
	};
	
	return (
		<div>
			<FormControl sx={{ m: 1, minWidth: 100 }}>
				
				{/* <Select value={rating} onChange={handleRating} autoWidth label="Rating">
					<MenuItem value="none">
					<em>None</em>
					</MenuItem>
					<MenuItem value="1star">1⭐</MenuItem>
					<MenuItem value="2star">2⭐⭐</MenuItem>
					<MenuItem value="3star">3⭐⭐⭐</MenuItem>
					<MenuItem value="4star">4⭐⭐⭐⭐</MenuItem>
					<MenuItem value="5star">5⭐⭐⭐⭐⭐</MenuItem>
				</Select> */}
				<label htmlFor="">Rating</label>
				<Rating
					name="simple-controlled"
					value={rating}
					onChange={handleRating}
				/>
			</FormControl>
		</div>
	);
}
