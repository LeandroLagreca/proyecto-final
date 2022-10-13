import axios from 'axios';
import { getAllGames, getGameById, filterByPrice, addToWishes, removeToWishes } from '../reducers/videoGame';

const API = 'http://localhost:3001/';

export const getGames = (name) => {
	const queryName = name ? name : '';

	return async function (dispatch) {
		try {
			const request = await axios(API + `videogames?` + queryName);
			dispatch(getAllGames(request.data));
		} catch (error) {
			return;
		}
	};
};

export const getDetails = (id) =>
	async function (dispatch) {
		try {
			const request = await axios(API + `videogames/${id}`);
			dispatch(getGameById(request.data));
		} catch (error) {
			return;
		}
	};

export const setFilterByPrice = (games, order) => (dispatch) => {
	const gamesCopy = [...games];

	try {
		if (order === 'asc') {
			gamesCopy.sort((a, b) => Number(a.price.replace("$","")) - (b.price.replace("$","")));
		} else if (order === 'desc') {
			gamesCopy.sort((a, b) => Number(b.price.replace("$","")) - (a.price.replace("$","")));
		} else {
			gamesCopy.sort((a, b) => a.id - b.id);
		}
		dispatch(filterByPrice(gamesCopy));
	} catch (error) {
		return;
	}
};

export const filterByRating = (games, order) => {};

export const filterByType = (games, type) => {};

export const filterBySearch = (games, input) => {};

export const addWishes = (game) => {
	try {
	  return function(dispatch){
		dispatch(addToWishes(game))
	  
	
	  }  
	} catch (error) {
	  console.log(error)
	 }
	  
	
	}

export const removeWishes = (name) => {
	try {
		return function(dispatch){
			dispatch(removeToWishes(name))
		}
	}catch(error){
		console.log(error)
	}
}