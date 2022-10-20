import { createSlice } from '@reduxjs/toolkit';
import { ratingFilter, priceFilter, genreFilter, sort } from './utils'

const page = window.sessionStorage.getItem('page')
	? JSON.parse(window.sessionStorage.getItem('page'))
	: 1;

const filters = window.sessionStorage.getItem('filters')
	? JSON.parse(window.sessionStorage.getItem('filters'))
	: {
		rating: 'none',
		price: 'none',
		genre: 'none',
		sort: 'none'
	};

const initialState = {
	games: [],
	filterGames: [],
	discounts: [],
	details: {},
  	wishes: [],
	page,
	loading: false,
	filters,
	comments: {
		"name": "gus@123.com",
		"comments": [
		  {
			"text": "Que onda banda, pues estuvo ahi mas o menos el juego",
			"rating_like": 5,
			"rating_dislike": 0,
			"createdAt": "2022-10-20T16:50:58.699Z",
			"id": 2
		  }
		]
	  }
};




const videoGameSlice = createSlice({
	name: 'videogames',
	initialState,
	reducers: {
		getAllGames: (state, { payload }) => {
			state.games = payload;
			state.filterGames = payload;
			state.loading = false
		},
		getGameById: (state, { payload }) => {
			state.details = payload;
			state.loading = false
		},
		getAllDiscounts: (state, { payload }) => {
			state.discounts = []
		},
		applyFilters: (state) => {
			let newFilter = state.filterGames.length
				? state.filterGames
				: state.games
			newFilter = ratingFilter(newFilter, state.filters.rating)
			newFilter = priceFilter(newFilter, state.filters.price)
			newFilter = genreFilter(newFilter, state.filters.genre)
			newFilter = sort(newFilter, state.filters.sort)
			state.filterGames = newFilter
			const parseFilters = JSON.stringify(state.filters)
			window.sessionStorage.setItem('filters', parseFilters)
		},
		filterByPrice: (state, { payload }) => {
			state.filters = {
				...state.filters,
				price : payload
			}
		},
		filterByRating: (state, { payload }) => {
			state.filters = {
				...state.filters,
				rating: payload
			};
		},
		filterByGenre: (state, { payload }) => {
			state.filters = {
				...state.filters,
				genre: payload
			};
		},
		orderAlphabetically: (state, { payload }) => {
			state.filters = {
				...state.filters,
				sort: payload
			};
		},
		filterBySearch: (state, { payload }) => {
			state.filterGames = payload;
		},
    	addToWishes: (state, { payload }) => {
				state.wishes =  [...state.wishes, payload]
		},
		removeToWishes: (state, { payload }) => {
				state.wishes = state.wishes.filter(((e) => e.name !== payload))
		},
		changePage: (state, { payload }) => {
			state.page = payload
			const parsePage = JSON.stringify(state.page)
			window.sessionStorage.setItem('page', parsePage)
		},
		setLoading: (state) => {
			state.loading = true
		},
		cleanFilter: (state, { payload }) => {
			state.games = payload
		},
		getAllComments: (state, {payload}) => {
			state.comments = payload
		}
	},
});

export const {
	getAllGames,
	getGameById,
	getAllDiscounts,
	applyFilters,
	filterByPrice,
	filterByRating,
	filterByGenre,
	orderAlphabetically,
	filterBySearch,
  addToWishes, 
  removeToWishes,
  changePage,
	setLoading,
	cleanFilter,
	getAllComments
} = videoGameSlice.actions;

export default videoGameSlice.reducer;