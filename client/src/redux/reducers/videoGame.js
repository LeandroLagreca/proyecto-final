import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	games: [],
	details: {}
}

const videoGameSlice = createSlice({
    name: 'videoGames',
    initialState,
    reducers: {
			getAllGames: (state, { payload }) => {
				state.games = payload
			},
			getGameById: (state, { payload }) => {
				state.details = payload
			}
    }
})

export const { getAllGames, getGameById } = videoGameSlice.actions
export default videoGameSlice.reducer