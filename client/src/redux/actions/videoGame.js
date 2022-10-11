import axios from "axios";
import { getAllGames, getGameById } from "../reducers/videoGame";

const API = "http:localhost:3000/";

export const getGames = (name) =>
  async function (dispatch) {
    try {
      const request = await axios(API + `videogames?name=${name}`);
      dispatch(getAllGames(request.data));
    } catch (error) {
        return
    }
};

export const getDetails = (id) =>
  async function (dispatch) {
    try {
      const request = await axios(API + `videogames/${id}`);
      dispatch(getGameById(request.data));
    } catch (error) {
        return
    }
};