import { createSlice } from '@reduxjs/toolkit';
import { ratingFilter, priceFilter, genreFilter, sort, setFilterBySearch } from './utils'

const page = window.sessionStorage.getItem('page')
	? JSON.parse(window.sessionStorage.getItem('page'))
	: 1;

const filters = window.sessionStorage.getItem('filters')
	? JSON.parse(window.sessionStorage.getItem('filters'))
	: {
		search: '',
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
	comments: {}
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
			let newFilter = state.games
				
			newFilter = ratingFilter(newFilter, state.filters.rating)
			newFilter = priceFilter(newFilter, state.filters.price)
			newFilter = genreFilter(newFilter, state.filters.genre)
			newFilter = sort(newFilter, state.filters.sort)
			newFilter = setFilterBySearch(newFilter, state.filters.search)
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
			state.filters = {
				search: payload,
				rating: 0 ,
				price: '0',
				genre: 'none',
				sort: 'none'
			};
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
			state.filters = {
				rating: 0 ,
				price: '0',
				genre: 'none',
				sort: 'none'
			};
		},
		getGameComments: (state, {payload}) => {
			console.log(payload)
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
	getGameComments
} = videoGameSlice.actions;

export default videoGameSlice.reducer;