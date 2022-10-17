import SelectGenere from './SelectGenere'
import SelectPrice from './SelectPrice'
import SelectRating from './SelectRating'
import SelectType from './SelectType'
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';



export default function Filter() {
	

	return (
		<Box>
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
		</Box>
	)
}