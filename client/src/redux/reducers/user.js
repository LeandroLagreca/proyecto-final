import { createSlice } from "@reduxjs/toolkit";

const cartList = localStorage.getItem('cartList') ? JSON.parse(localStorage.getItem('cartList')) : []

const initialState = {
	role: 'guest',
	cartList 
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
			setRole: (state, { payload }) => {
				state.role = payload
			},
			addToCart: (state, { payload }) => {
				state.cartList = [...state.cartList, payload]
				const parseCart = JSON.stringify([...state.cartList, payload])
				localStorage.setItem('cartList', parseCart)
			},
			deleteFromCart: (state, { payload }) => {
				state.cartList = state.cartList.filter(prod => prod.id !== payload)
				const parseCart = JSON.stringify(state.cartList.filter(prod => prod.id !== payload ))
				localStorage.setItem('cartList', parseCart)
			}
    }
})

export const { getAllGames, getGamesById } = userSlice.actions
export default userSlice.reducer