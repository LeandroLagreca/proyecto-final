import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	games: [],
	filterGames: [],
	details: {}
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
			filterByPrice: (state, { payload }) => {
				state.filterGames = payload
			}
    }
})

export const { getAllGames, getGameById, filterByPrice } = videoGameSlice.actions
export default videoGameSlice.reducer