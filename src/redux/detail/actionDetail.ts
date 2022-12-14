import {AnyAction, Dispatch} from 'redux';

export const GET_PRODUCT_DETAIL = 'GET_PRODUCT';

export const INCREASE_COUNT = 'INCREASE';
export const DECREMENT_COUNT = 'DECREMENT_COUNT';

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
          type: GET_PRODUCT_DETAIL,
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
