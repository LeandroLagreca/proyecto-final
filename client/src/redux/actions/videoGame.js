import axios from "axios";
import { getAllGames, getGameById } from "../reducers/videoGame";

const API = "http://localhost:3001/";

export const getGames = (name) =>{
  const queryName = name && name
  
  return async function (dispatch) {
    try {
      const request = await axios(API + `videogames?` + queryName);
      dispatch(getAllGames(request.data));
    } catch (error) {
        return
    }
}};

export const getDetails = (id) =>
  async function (dispatch) {
    try {
      const request = await axios(API + `videogames/${id}`);
      dispatch(getGameById(request.data));
    } catch (error) {
        return
    }
};