import axios from "axios";
import { setInfo, addToPurchases, addToCollection, getAllUserInfo } from "../reducers/user";
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

export const addCollection = (game) => {
  return function (dispatch) {
    try {
      dispatch(addToCollection(game));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllUserInfor = () => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(API + "user")
      dispatch(getAllUserInfo(data))
    } catch (error) {
      return null
    }
  }
}