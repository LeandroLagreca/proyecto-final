import axios from "axios";

import {
  getAllGames,
  getGameById,
  getAllDiscounts,
  filterBySearch,
  addToWishes,
  removeToWishes,
  cleanFilter,
} from "../reducers/videoGame";

const API = "http://localhost:3001/";

export const getGames = (name) => {
  const queryName = name ? name : "";
  return async function (dispatch) {
    try {
      const { data } = await axios(API + `videogames?` + queryName);
      dispatch(getAllGames(data.games));
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