import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	games: [],
	filterGames: [],
	details: {},
};

const videoGameSlice = createSlice({
	name: 'videogames',
	initialState,
	reducers: {
		getAllGames: (state, { payload }) => {
			state.games = payload;
			state.filterGames = payload;
		},
		getGameById: (state, { payload }) => {
			state.details = payload;
		},
		filterByPrice: (state, { payload }) => {
			state.filterGames = payload;
		},
		filterByRating: (state, { payload }) => {
			state.filterGames = payload;
		},
		filterByGenere: (state, { payload }) => {
			state.filterGames = payload;
		},
		filterByType: (state, { payload }) => {
			state.filterGames = payload;
		}
	},
});

export const {
	getAllGames,
	getGameById,
	filterByPrice,
	filterByRating,
	filterByGenere,
	filterByType,
} = videoGameSlice.actions;

export default videoGameSlice.reducer;
