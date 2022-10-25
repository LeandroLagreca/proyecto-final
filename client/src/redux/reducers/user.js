import { createSlice } from "@reduxjs/toolkit";

const cartList = window.localStorage.getItem('cartList')
	? JSON.parse(window.localStorage.getItem('cartList'))
	: []

const initialState = {
  status: "guest",
  id: null,
  cartList,
  wishes: [],
  admin: false,
  emailVerified: false,
  purchases: [],
  collection: [],
  comments: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSigned: (state, { payload }) => {
      state.status = payload;
    },
    setInfo: (state, { payload }) => {
		const {
			id,
			deseos,
			cart,
      admin
		} = payload
      return {
		...state,
		id,
		wishes: deseos,
		cartList: cart,
    admin
	  }
    },
    updateCart: (state, { payload }) => {
      state.cartList = payload
    },
    addOne: (state, { payload }) => {
      const productRef = state.cartList.find((el) => el.id === payload);
      const newCant = ++productRef.cant;
      productRef.cant = newCant;
    },
    removeOne: (state, { payload }) => {
      const productRef = state.cartList.find((el) => el.id === payload);
      const newCant = --productRef.cant;
      productRef.cant = newCant;
    },
    updateWishes: (state, { payload }) => {
      state.wishes = payload;
    },
    addToPurchases: (state, { payload }) => {
      state.purchases = [...state.purchases, payload];
    },
    addToCollection: (state, { payload }) => {
      state.collection = [...state.collection, payload];
    },
    getAllUserComments: (state, { payload }) => {
      state.comments = payload;
    },
  },
});

export const {
  setSigned,
  updateCart,
  addOne,
  removeOne,
  updateWishes,
  setInfo,
  addToPurchases,
  addToCollection,
  getAllUserComments,
} = userSlice.actions;
export default userSlice.reducer;
