import axios from "axios";
import {
    getGameComments
} from "../reducers/videoGame";

const API = "http://localhost:3001/";

export const getComments = (id) => {
    return async function (dispatch) {
      try {
        const { data } = await axios(API + `videogames/comments?gameID=` + id);
        dispatch(getGameComments(data));
        console.log(data)
      } catch (error) {
        return;
      }
    }
  };