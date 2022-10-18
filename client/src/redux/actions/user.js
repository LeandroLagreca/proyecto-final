

import { addToPurchases } from "../reducers/user" 

export const addPurchases = (game) => {
	try {
		return function (dispatch) {
			dispatch(addToPurchases(game))
		}
	} catch (error) {
		console.log(error)
	}
}
