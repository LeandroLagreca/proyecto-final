import axios from "axios";
import { setInfo, addToPurchases } from "../reducers/user";
const API = "http://localhost:3001/";

export const getUserInfo = (email) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.post(API + "login", { email });
      dispatch(setInfo(data));
    } catch (error) {
      return null;
    }
  };
};

export const addPurchases = (game) => {
  return function (dispatch) {
    try {
      dispatch(addToPurchases(game));
    } catch (error) {
      console.log(error);
    }
  };
};
