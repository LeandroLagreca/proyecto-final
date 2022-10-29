import SelectGenere from './SelectGenere'
import SelectPrice from './SelectPrice'
import SelectRating from './SelectRating'
import SelectType from './SelectType'
import { useSelector, useDispatch } from 'react-redux';
import { setLoading } from '../../redux/reducers/videoGame';
import { useEffect } from 'react';
import { getGames } from '../../redux/actions/videoGame';
import { Box, List, ListItem, ListSubheader } from '@mui/material';
import "./filter.css"


export default function Filter() {
	const { filters } = useSelector(state => state.videogames)
	const { page } = useSelector(state => state.videogames)
	const dispatch = useDispatch()
	const { name, rating, price, genre, sort } = filters
	
	useEffect(() => {
		const filter = {
			name: name || '',
			rating: rating || '',
			price: price || '',
			genre: genre || ''
		}
		dispatch(setLoading())
		dispatch(getGames(filter, sort, page))
		const parseFilter = JSON.stringify({...filter, sort});
		const parsePage = JSON.stringify(page);
		window.sessionStorage.setItem('filters', parseFilter);
		window.sessionStorage.setItem('page', parsePage);
	}, [page, sort, name, rating, price, genre, dispatch])

	return (
				<Box className='Filters' sx={{display:"flex", textAling:"center", alignItems: 'center'}}>

					<List 
					subheader={
						<Box   sx={{fontSize: 40, color: "black"}} >
						  Filters
						</Box>
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