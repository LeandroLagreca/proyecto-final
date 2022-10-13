import axios from 'axios';
import {
	getAllGames,
	getGameById,
	filterByPrice,
	filterByRating,
	filterByGenere,
	filterByType,
	filterBySearch,
} from '../reducers/videoGame';

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
			gamesCopy.sort(
				(a, b) => Number(a.price.replace('$', '')) - b.price.replace('$', '')
			);
		} else if (order === 'desc') {
			gamesCopy.sort(
				(a, b) => Number(b.price.replace('$', '')) - a.price.replace('$', '')
			);
		} else {
			gamesCopy.sort((a, b) => a.id - b.id);
		}
		dispatch(filterByPrice(gamesCopy));
	} catch (error) {
		return;
	}
};

export const setFilterByRating = (games, order) => (dispatch) => {
	const gamesCopy = [...games];

	try {
		if (order === 'asc') {
			gamesCopy.sort((a, b) => a.rating_api - b.rating_api);
		} else if (order === 'desc') {
			gamesCopy.sort((a, b) => b.rating_api - a.rating_api);
		} else {
			gamesCopy.sort((a, b) => a.id - b.id);
		}
		dispatch(filterByRating(gamesCopy));
	} catch (error) {
		return;
	}
};

export const setFilterByGenere = (games, genere) => (dispatch) => {
	const gamesCopy = [...games];
	const gamesFilter = gamesCopy.filter((game) => game.generes.includes(genere));
	dispatch(filterByGenere(gamesFilter));
};

export const setFilterByType = (games, type) => (dispatch) => {
	const gamesCopy = [...games];
	const gamesFilter = gamesCopy.filter((game) => game.type === type);
	dispatch(filterByType(gamesFilter));
};

export const setFilterBySearch = (games, input) => (dispatch) => {
	const gamesCopy = [...games];
	const gamesFilter = gamesCopy.filter((game) =>
		game.name.toLowerCase().includes(input.toLowerCase())
	);
	dispatch(filterBySearch(gamesFilter));
};
