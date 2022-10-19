import SelectGenere from './SelectGenere'
import SelectPrice from './SelectPrice'
import SelectRating from './SelectRating'
import SelectType from './SelectType'
import { useSelector, useDispatch } from 'react-redux';
import { applyFilters } from '../../redux/reducers/videoGame';
import { useEffect } from 'react';
import { Grid } from '@mui/material';



export default function Filter() {
	const { filters } = useSelector(state => state.videogames)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(applyFilters())
	}, [filters, dispatch])

	return (
			<Grid container direction="row">
				<Grid item xs>
					<SelectRating />
				</Grid>
				<Grid item xs>
					<SelectPrice />
				</Grid>
				<Grid item xs>
					<SelectType />
				</Grid>
				<Grid item xs>
					<SelectGenere />
				</Grid>
			</Grid>
	)
}