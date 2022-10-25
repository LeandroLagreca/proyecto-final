import axios from "axios";
import {
  setInfo,
  updateCart,
  addOne,
  removeOne,
  addToPurchases,
  addToCollection,
  getAllUserComments,
  updateWishes
} from "../reducers/user";
import { store } from "../store";
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

export const addToCart = (game) => {
  const { status, id, cartList } = store.getState().user;
  return async function (dispatch) {
    const alreadyIs = cartList.some((el) => el.id === game.id);
    const newCart = [...cartList, game];
    if (!alreadyIs && status === "guest") {
      const parseNewCart = JSON.stringify(newCart)
      localStorage.setItem('cartList', parseNewCart)
      dispatch(updateCart(newCart))
    } else if (!alreadyIs && status !== "guest") {
      try {
        await axios.put(API + `user/${id}`, {
          cart: newCart,
        });
        dispatch(updateCart(newCart));
      } catch (error) {
        return;
      }
    } else {
      return;
    }
  };
};

export const deleteFromCart = (gameId) => {
  const { status, id, cartList } = store.getState().user;
  return async function(dispatch) {
    const newCart = cartList.filter(
      (prod) => Number(prod.id) !== Number(gameId)
    );
    if (status === "guest") {
      const parseCart = JSON.stringify(newCart);
      localStorage.setItem("cartList", parseCart);
      dispatch(updateCart(newCart))
    } else {
      try {
        await axios.put(API + `user/${id}`, {
          cart: newCart,
        });
        dispatch(updateCart(newCart));
      } catch (error) {
        return;
      }
    }
    
  }
}

export const addOneFn = (gameId) => {
  const { status, id, cartList } = store.getState().user;
  return async function(dispatch) {
    dispatch(addOne(gameId))
    const findElement = cartList.find(el => Number(el.id) === Number(gameId))
    const findPosition = cartList.indexOf(findElement)
    const elementCopy = {...findElement}
    const listCopy = [...cartList]
    const updateElement = {...elementCopy, cant: ++elementCopy.cant}
    listCopy[findPosition] = updateElement
    if(status !== 'logged') {
      const parseCart = JSON.stringify([...listCopy]);
      localStorage.setItem("cartList", parseCart);
    } else {
      await axios.put(API + `user/${id}`, {
        cart: listCopy,
      });
    }

  }
}

export const removeOneFn = (gameId) => {
  const { status, id, cartList } = store.getState().user;
  return async function(dispatch) {
    dispatch(removeOne(gameId))
    const findElement = cartList.find(el => Number(el.id) === Number(gameId))
    const findPosition = cartList.indexOf(findElement)
    const elementCopy = {...findElement}
    const listCopy = [...cartList]
    const updateElement = {...elementCopy, cant: --elementCopy.cant}
    listCopy[findPosition] = updateElement
    if(status !== 'logged') {
      const parseCart = JSON.stringify([...listCopy]);
      localStorage.setItem("cartList", parseCart);
    } else {
      await axios.put(API + `user/${id}`, {
        cart: listCopy,
      });
    }

  }
}

export const addNewWish = (game) => {
  const { id, wishes } = store.getState().user;
  return async function (dispatch) {
    const newList = [...wishes, game];
    try {
      await axios.put(API + `user/${id}`, {
        deseos: newList,
      });
      dispatch(updateWishes(newList));
    } catch (error) {}
  };
};

export const deleteWish = (gameId) => {
  const { id, wishes } = store.getState().user;
  return async function (dispatch) {
    try {
      const newList = wishes.filter(
        (dbGame) => Number(dbGame.id) !== Number(gameId)
      );
      await axios.put(API + `user/${id}`, {
        deseos: newList,
      });
      dispatch(updateWishes(newList));
    } catch (error) {}
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

export const getUserComments = (ID) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(API + "user/comments?userID=" + ID);
      dispatch(getAllUserComments(data));
    } catch (error) {
      return null;
    }
  };
};
