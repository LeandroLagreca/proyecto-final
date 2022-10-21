import SelectGenere from './SelectGenere'
import SelectPrice from './SelectPrice'
import SelectRating from './SelectRating'
import SelectType from './SelectType'
import { useSelector, useDispatch } from 'react-redux';
import { applyFilters } from '../../redux/reducers/videoGame';
import { useEffect } from 'react';
import { Box, Grid, List, ListItem, ListSubheader } from '@mui/material';



export default function Filter() {
	const { filters } = useSelector(state => state.videogames)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(applyFilters())
	}, [filters, dispatch])

	return (
				<Box sx={{display:"flex", textAling:"center"}}>

					<List 
					subheader={
						<ListSubheader>
						  Filters
						</ListSubheader>
					  }>
						<ListItem sx={{marginLeft:"45px"}}>
							<SelectRating />
						</ListItem>
						<ListItem>
							<SelectPrice />
						
						</ListItem>
						<ListItem sx={{marginLeft:"50px"}}>
							<SelectType />
							
						</ListItem>
						<ListItem sx={{marginLeft:"50px"}}>
							<SelectGenere />
							
						</ListItem>
					</List>
				
				</Box>
			
	)
}