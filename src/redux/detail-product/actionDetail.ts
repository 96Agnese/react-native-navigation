import {AnyAction, Dispatch} from 'redux';

export const SET_PRODUCTS = 'SET_PRODUCTS';

export const INCREASE_COUNT = 'INCREASE';
export const DECREMENT_COUNT = 'DECREMENT_COUNT';

// favourite
export const SET_FAVOURITE_ID = 'SET_PRODUCTS_ID';

export const setFavouriteID = favouriteID => {
  return {
    type: SET_FAVOURITE_ID,
    payload: favouriteID,
  };
};

export const setProducts = favourite => {
  return {
    type: SET_PRODUCTS,
    payload: favourite,
  };
};

// const API_URL = 'https://jsonplaceholder.typicode.com/todos';
const API_URL = 'https://fakestoreapi.com/products/';

export const getProduct = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const result = await fetch(API_URL, {
        method: 'GET',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
      });
      const json = await result.json();
      if (json) {
        dispatch({
          type: SET_PRODUCTS,
          payload: json,
        });
      } else {
        console.log('Unable to fetch');
      }
    } catch (error) {
      console.error(error);
    }
  };
};
export const decrementCount = () => {
  return {
    type: DECREMENT_COUNT,
  };
};

export const increaseCount = () => {
  return {
    type: INCREASE_COUNT,
  };
};
