import { createSlice } from '@reduxjs/toolkit';
import { orderByStock } from '../actions/videoGame';
const page = window.sessionStorage.getItem('page')
	? JSON.parse(window.sessionStorage.getItem('page'))
	: 1;

const filters = window.sessionStorage.getItem('filters')
	? JSON.parse(window.sessionStorage.getItem('filters'))
	: {

		name: '',
		rating: '',
		price: '',
		genre: '',
		sort: ''
	};


const initialState = {
	games: [],
	totalResults: 0,
	discounts: [],
	details: {},
	page,
	loading: false,
	filters,
	comments: {},
	genres: []
};

const videoGameSlice = createSlice({
	name: 'videogames',
	initialState,
	reducers: {
		getAllGames: (state, { payload }) => {
			state.games = payload.games;
			state.totalResults = payload.totalResults;
			state.loading = false;
		},
		getGameById: (state, { payload }) => {
			state.details = payload;
			state.loading = false;
		},
		getAllDiscounts: (state, { payload }) => {
			state.discounts = payload;
		},
		filterByPrice: (state, { payload }) => {
			state.filters = {
				...state.filters,
				price: payload,
			};
			state.page = 1;
		},
		filterByRating: (state, { payload }) => {
			state.filters = {
				...state.filters,
				rating: payload,
			};
			state.page = 1;
		},
		filterByGenre: (state, { payload }) => {
			state.filters = {
				...state.filters,
				genre: payload,
			};
			state.page = 1;
		},
		orderAlphabetically: (state, { payload }) => {
			state.filters = {
				...state.filters,
				sort: payload,
			};
		},
		filterBySearch: (state, { payload }) => {
			state.filters = {

				name: payload,
				rating: '' ,
				price: '',
				genre: '',
				sort: '',
			};
			state.page = 1;
		},
		changePage: (state, { payload }) => {
			state.page = payload;
		},
		setLoading: (state) => {
			state.loading = true;
		},
		cleanFilter: (state) => {
			state.filters = {
				name: '',
				rating: '',
				price: '',
				genre: '',
				sort: '',
			};
			state.page = 1;
		},
		getGameComments: (state, { payload }) => {
			// console.log(payload);

			state.comments = payload;
		},
		rowVideoGames: (state, { payload }) => {
			state.rowVideoGames = payload;
		},
		setGameComments: (state, { payload }) => {
			state.comments.comments = [...state.comments.comments, payload];
		},
		getAllGenres: (state, { payload }) => {
			state.genres = payload;
		},
		postAllGames: (state, { payload }) => {
			state = payload
		},
		OrderByStock: (state, {payload})=> {
        state.games === "min" 
		?
        state.games.sort(function (a, b) {
            if (a.stock > b.stock) return 1;
            if (b.stock > a.stock) return -1;
            return 0;
        })
        : state.games.sort(function (a, b) {
            if (a.stock > b.stock) return -1;
            if (b.stock > a.stock) return 1;
            return 0;
        
        });
            return {
            ...state,
            games: orderByStock.map((e) => e),
            }
		}
	},
});

export const {
	getAllGames,
	getGameById,
	getAllDiscounts,
	filterByPrice,
	filterByRating,
	filterByGenre,
	orderAlphabetically,
	filterBySearch,
	changePage,
	setLoading,
	cleanFilter,
	getGameComments,
	setGameComments,
	getAllGenres,
	postAllGames,
	OrderByStock
} = videoGameSlice.actions;

export default videoGameSlice.reducer;
