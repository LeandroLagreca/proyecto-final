import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	games: [],
	filterGames: [],
	details: {},
	wishes: []
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
			},
			addToWishes: (state, { payload }) => {
				state.wishes = [...state.wishes, payload]
			},
			removeToWishes: (state, { payload }) => {
				state.wishes = state.wishes.filter(((e) => e.name !== payload))
			}
			

    }
})

export const { getAllGames, getGameById, filterByPrice, addToWishes, removeToWishes } = videoGameSlice.actions
export default videoGameSlice.reducer