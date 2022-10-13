import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	games: [],
<<<<<<< HEAD
	details: {},
	
=======
	filterGames: [],
	details: {}
>>>>>>> origin
}

const videoGameSlice = createSlice({
    name: 'videogames',
    initialState,
    reducers: {
			getAllGames: (state, { payload }) => {
				state.games = payload
				state.filterGames = payload
			},
			getGameById: (state, { payload }) => {
				state.details = payload
			},
<<<<<<< HEAD
			
		}
=======
			filterByPrice: (state, { payload }) => {
				state.filterGames = payload
			}
    }
>>>>>>> origin
})

export const { getAllGames, getGameById, filterByPrice } = videoGameSlice.actions
export default videoGameSlice.reducer