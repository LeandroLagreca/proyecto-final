import React from 'react';
import SelectRating from '../components/Filters/SelectRating';
import SelectPrice from '../components/Filters/SelectPrice';
import SelectType from '../components/Filters/SelectType';
import SelectGenere from '../components/Filters/SelectGenere';
import { HomeContainer } from '../containers';
import { Grid } from '@mui/material';
import { getGames, cleanToFilter } from '../redux/actions/videoGame';
import { useSelector, useDispatch } from 'react-redux';
import DisableElevation from '../components/Filters/CleanButton';


const Home = () => {
	return (
		<HomeContainer id="home">
			<div>
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
				<DisableElevation/>
			</div>
		</HomeContainer>
	);
};

export default Home;
