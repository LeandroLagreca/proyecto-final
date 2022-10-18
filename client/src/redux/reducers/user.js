import { createSlice } from "@reduxjs/toolkit";

const cartList = localStorage.getItem('cartList') ? JSON.parse(localStorage.getItem('cartList')) : []

const initialState = {
	status: 'guest',
	cartList,
	admin: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
			setSigned: (state) => {
				state.status = state.status === 'logged' ? 'guest' : 'logged'
			},
			addToCart: (state, { payload }) => {
				const alreadyIs = state.cartList.some(el => el.id === payload.id);
				if(!alreadyIs) {
					state.cartList = [...state.cartList, payload]
					const parseCart = JSON.stringify([...state.cartList])
					localStorage.setItem('cartList', parseCart)
				} else {
					return
				}
			},
			deleteFromCart: (state, { payload }) => {
				state.cartList = state.cartList.filter(prod => prod.id !== payload)
				const parseCart = JSON.stringify(state.cartList.filter(prod => prod.id !== payload ))
				localStorage.setItem('cartList', parseCart)
			},
			addOne: ( state, { payload } ) => {
				const productRef = state.cartList.find(el => el.id === payload)
				const newCant = ++productRef.cant
				productRef.cant = newCant
				const parseCart = JSON.stringify([...state.cartList])
				localStorage.setItem('cartList', parseCart)
			},
			removeOne: ( state, { payload } ) => {
				const productRef = state.cartList.find(el => el.id === payload)
				const newCant = --productRef.cant
				productRef.cant = newCant
				const parseCart = JSON.stringify([...state.cartList])
				localStorage.setItem('cartList', parseCart)
			}
    }
})

export const { setSigned, addToCart, deleteFromCart, addOne, removeOne } = userSlice.actions
export default userSlice.reducer