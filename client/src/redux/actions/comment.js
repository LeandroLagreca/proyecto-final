import axios from "axios";
import {
    getAllComments
} from "../reducers/videoGame";

const API = "http://localhost:3001/";

export const getComments = (id) => {
    const queryName = id ? id : "";
    return async function (dispatch) {
      try {
        const { data } = await axios(API + `user/comments?` + queryName);
        dispatch(getAllComments(data));
      } catch (error) {
        return;
      }
    }
  };