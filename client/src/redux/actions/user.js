import axios from "axios";
import { setInfo } from "../reducers/user";
const API = "http://localhost:3001/";

export const getUserInfo = (email) => {
  return async function (dispatch) {
    try {
			const user = await axios.get(API + 'login', {	email })
			dispatch(setInfo(user))
    } catch (error) {
			return null
		}
  };
};
