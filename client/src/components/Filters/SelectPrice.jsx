import { useSelector, useDispatch } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { filterByPrice } from '../../redux/reducers/videoGame';
import Slider from '@mui/material/Slider';
import { useState } from 'react';

export default function SelectPrice() {
	const dispatch = useDispatch();
	const { price } = useSelector(state => state.videogames.filters)
	const [value, setValue] = useState(0);
	console.log(value)

	const mark = [
		{
			value:0,
			label: "$0"
		},
		{
			value:5,
			label: "$25"
		},
		{
			value:50,
			label: "$50"
		},
		{
			value:75,
			label: "$75"
		},
		{
			value:100,
			label: "$100"
		}
	]


	

	const handlePrice = (event) => {
		setValue(event.target.value)
		dispatch(filterByPrice(event.target.value));
	};
	function valuetext(value) {
		return `${value}`;
	  }

	return (
		<div>
			<FormControl sx={{ m: 1, minWidth: 100 }}>
				{/* <InputLabel>Price</InputLabel> */}
				{/* <Select value={price} onChange={handlePrice} autoWidth label="Price">
					<MenuItem value="none">
						<em>None</em>
					</MenuItem>
					<MenuItem value="5">Hasta $5</MenuItem>
					<MenuItem value="5a10">$5 a $10</MenuItem>
					<MenuItem value="10a30">$10 a $30</MenuItem>
					<MenuItem value="30a50">$30 a $50</MenuItem>
					<MenuItem value="50">Más de $50</MenuItem>
				</Select> */}
					<div style={{width: 200}} >

					<Slider
																	
						step={25}
						min={0}
						max={100}
						onChange={handlePrice}
						value={value}
						
					/>
  					
					
					</div>
			</FormControl>
		</div>
	);
}



