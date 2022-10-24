import { createSlice } from "@reduxjs/toolkit";

const cartList = localStorage.getItem('cartList') ? JSON.parse(localStorage.getItem('cartList')) : []

const initialState = {
	status: 'guest',
	id: null,
	cartList,
	admin: false,
	emailVerified: false,
	purchases: [],
	collection: [],
	info: []
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
			setSigned: (state, { payload }) => {
				state.status = payload
			},
			setInfo: (state, { payload }) => {
				state = {
					...state,
					admin: payload.admin,
					cartList: new Set([...state.cartList, ...payload.cartList]),
					emailVerified: payload.emailVerified
				}
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
				state.cartList = state.cartList.filter(prod => Number(prod.id) !== Number(payload))
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
			},
			addToPurchases: (state, { payload }) => {
				state.purchases =  [...state.purchases, payload]
			},
			addToCollection: (state, { payload }) => {
				state.collection =  [...state.collection, payload]
			},
			getAllUserInfo: (state, {payload}) => {
				state.info = payload
			}
    }
})

export const { setSigned, addToCart, deleteFromCart, addOne, removeOne, setInfo, addToPurchases, addToCollection, getAllUserInfo } = userSlice.actions
export default userSlice.reducer