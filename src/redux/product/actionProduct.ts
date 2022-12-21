import {AnyAction, Dispatch} from 'redux';

//!dichiaro le azioni

export const GET_ALBUM = 'GET_ALBUM';

// const API_URL = 'https://jsonplaceholder.typicode.com/todos';
const API_URL = 'https://jsonplaceholder.typicode.com/photos';

export const getAlbum = () => {
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
          type: GET_ALBUM,
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
