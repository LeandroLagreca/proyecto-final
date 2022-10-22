import axios from "axios";

import {
  getAllGames,
  getGameById,
  getAllDiscounts,
  filterBySearch,
  addToWishes,
  removeToWishes,
  cleanFilter,
  rowVideoGames,
} from "../reducers/videoGame";

const API = "http://localhost:3001/";


export const getRowVideoGames = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API}row-videogames`);
    dispatch(rowVideoGames(response.data));
  } catch (error) {
    console.log(error);
  }
}


export const getGames = (name, page) => {
  const queryPage = page ? page : "";
  const queryName = name ? name : "";
  return async function (dispatch) {
    try {
      if(queryPage === ""){
        const { data } = await axios(API + `videogames?` + queryName);
        dispatch(getAllGames(data.games));
      }else {
        const { data } = await axios(API + `videogames?page=` +queryPage);
        dispatch(getAllGames(data.games));
      }
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

export const getDiscounts = () => {
  return async function(dispatch) {
    try {
      const { data } = await axios(API + `discounts`);
      dispatch(getAllDiscounts(data))
    } catch (error) {
        return
    }
  }
}

// export const filterBySearch = (games, input) => {};

export const addWishes = (game) => {
  try {
    return function (dispatch) {
      dispatch(addToWishes(game));
    };
  } catch (error) {
    console.log(error);
  }
};

export const removeWishes = (name) => {
  try {
    return function (dispatch) {
      dispatch(removeToWishes(name));
    };
  } catch (error) {
    console.log(error);
  }
};

export const cleanToFilter = (clean) => {
  try {
    return function (dispatch) {
      dispatch(cleanFilter(clean));
    };
  } catch (error) {
    console.log(error);
  }
};