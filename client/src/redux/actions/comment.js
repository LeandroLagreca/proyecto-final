import axios from 'axios';
import { getGameComments, setGameComments } from '../reducers/videoGame';

const API = 'http://localhost:3001/';

export const getComments = (id) => {
	return async function (dispatch) {
		try {
			const { data } = await axios(API + `videogames/comments?gameID=${id}`);
			dispatch(getGameComments(data.comments));
		} catch (error) {
			dispatch(getGameComments([]))
		}
	};
};

export const postComments = (value) => {
	return async function (dispatch) {
		try {
			const { data } = await axios.post(API + `comments`, value);
			dispatch(setGameComments(data));
		} catch (error) {
			return;
		}
	};
};

export const updateComments = (value) => {
	return async function (dispatch) {
		try {
			console.log("Valores aaaa")
			console.log(value.comment)
			await axios.put(API + `comments`, value.comment)
		} catch (error) {
			return;
		}
	};
};