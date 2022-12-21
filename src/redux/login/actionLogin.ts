import {AnyAction, Dispatch} from 'redux';

//!dichiaro le azioni

export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_AGE = 'SET_USER_AGE';

export const INCREASE_AGE = 'INCREASE_AGE';

// export const GET_ALBUM = 'GET_ALBUM';

//  const API_URL = 'https://jsonplaceholder.typicode.com/todos';
// const API_URL = 'https://jsonplaceholder.typicode.com/photos';

// export const getAlbum = () => {
//   return async (dispatch: Dispatch<AnyAction>) => {
//     try {
//       const result = await fetch(API_URL, {
//         method: 'GET',
//          headers: {
//         'Content-Type': 'application/json',
//          },
//       });
//       const json = await result.json();
//       if (json) {
//         dispatch({
//           type: GET_ALBUM,
//           payload: json,
//         });
//       } else {
//         console.log('Unable to fetch');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };
// };

export const setName = (name: string) => {
  return {
    type: SET_USER_NAME,
    payload: name,
  };
};

export const setAge = (age: number) => {
  return {
    type: SET_USER_AGE,
    payload: age,
  };
};

export const increaseAge = (age: number) => {
  return {
    type: INCREASE_AGE,
    payload: age,
  };
};
