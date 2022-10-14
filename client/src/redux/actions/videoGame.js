import axios from 'axios';

import {
	getAllGames,
	getGameById,
	filterByPrice,
	filterByRating,
	filterByGenere,
	filterByType,
	filterBySearch,
	addToWishes,
	removeToWishes,
	changePage

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
	var orderPrice = [];
	try {
		switch (order) {
			
			case "none":
				orderPrice = gamesCopy.filter((e) => Number(e.price.replace('$', '')));
				break;

			case "5":
				orderPrice = gamesCopy.filter((e) => Number(e.price.replace('$', '')) <= 5);
				break;
			case "5a10":
				orderPrice = gamesCopy.filter((e) => Number(e.price.replace('$', ''))>= 5 && Number(e.price.replace('$', '')) <= 10);
				break;
			case "10a30":
				orderPrice = gamesCopy.filter((e) => Number(e.price.replace('$', '')) >= 10 && Number(e.price.replace('$', '')) <= 30);
				break;
			case "30a50":
				orderPrice = gamesCopy.filter((e) => Number(e.price.replace('$', '')) >= 30 && Number(e.price.replace('$', '')) <= 50);
				break;
			case "50":
				orderPrice = gamesCopy.filter((e) => Number(e.price.replace('$', '')) >= 50);
				break;
			default:
				break;
		}
		dispatch(filterByPrice(orderPrice));
	} catch (error) {
		return;
	}
};

export const setFilterByRating = (games, order) => (dispatch) => {
	const gamesCopy = [...games];
	var orderRating = [];

	try {


		switch (order) {
			case "none":
				orderRating = gamesCopy.filter((e) => e);
				break;
			case "1star":
				orderRating = gamesCopy.filter((e) => e.rating_api < 2);
				break;
			case "2star":
				orderRating = gamesCopy.filter((e) => e.rating_api >= 2 && e.rating_api < 3);
				break;
			case "3star":
				orderRating = gamesCopy.filter((e) => e.rating_api >= 3 && e.rating_api < 4);
				break;
			case "4star":
				orderRating = gamesCopy.filter((e) => e.rating_api >= 4 && e.rating_api < 5);
				break;
			case "5star":
				orderRating = gamesCopy.filter((e) => e.rating_api === 5);
				break;
			default:
				break;
		}

		dispatch(filterByRating(orderRating));
		dispatch(changePage(1))
	} catch (error) {
		return;
	}
};


export const setFilterByGenere = (games, genere) => (dispatch) => {
	const gamesCopy = [...games];
	var gamesFilter = [];
	gamesFilter = gamesCopy.filter((game) => game.genres.includes(genere));
	dispatch(filterByGenere(gamesFilter));
	dispatch(changePage(1))
};

export const setFilterByType = (games, order) => (dispatch) => {
	const gamesCopy = [...games];

	try {

		if (order === 'asc') {
			gamesCopy.sort((a, b) => a.name.localeCompare(b.name));
		} if (order === 'desc') {
			gamesCopy.sort((a, b) => b.name.localeCompare(a.name));
		}

		dispatch(filterByType(gamesCopy));
	} catch (error) {
		return;
	}
};

export const setFilterBySearch = (games, input) => (dispatch) => {
	const gamesCopy = [...games];
	const gamesFilter = gamesCopy.filter((game) =>
		game.name.toLowerCase().includes(input.toLowerCase())
	);
	dispatch(filterBySearch(gamesFilter));
};

// export const filterBySearch = (games, input) => {};

export const addWishes = (game) => {
	try {
		return function (dispatch) {
			dispatch(addToWishes(game))
		}
	} catch (error) {
		console.log(error)
	}
}

export const removeWishes = (name) => {
	try {
		return function (dispatch) {
			dispatch(removeToWishes(name))
		}
	} catch (error) {
		console.log(error)
	}
}

