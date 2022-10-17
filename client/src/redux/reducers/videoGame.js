import { createSlice } from '@reduxjs/toolkit';

const page = window.sessionStorage.getItem('page')
	? JSON.parse(window.sessionStorage.getItem('page'))
	: 1

const initialState = {
	games: [],
	filterGames: [],
	details: {},
  	wishes: [],
	page,
	loading: false,
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
	filterBySearch,
  addToWishes, 
  removeToWishes,
  changePage,
	setLoading
} = videoGameSlice.actions;

export default videoGameSlice.reducer;
// =======
// 	wishes: []
// }

// const videoGameSlice = createSlice({
//     name: 'videogames',
//     initialState,
//     reducers: {
// 			getAllGames: (state, { payload }) => {
// 				state.games = payload
// 				state.filterGames = payload
// 			},
// 			getGameById: (state, { payload }) => {
// 				state.details = payload
// 			},
// 			filterByPrice: (state, { payload }) => {
// 				state.filterGames = payload
// 			},
// 			addToWishes: (state, { payload }) => {
// 				state.wishes = [...state.wishes, payload]
// 			},
// 			removeToWishes: (state, { payload }) => {
// 				state.wishes = state.wishes.filter(((e) => e.name !== payload))
// 			}
			

//     }
// })

// export const { getAllGames, getGameById, filterByPrice, addToWishes, removeToWishes } = videoGameSlice.actions
// export default videoGameSlice.reducer
// >>>>>>> main



// [...state.wishes, payload]