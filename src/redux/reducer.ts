import {SET_USER_NAME, SET_USER_AGE} from './action';
//! dico cosa devono fare
const initialState = {
  name: '',
  age: '',
};

interface Action<T, P> {
  type: T;
  payload?: P;
}

function userReducer(state = initialState, action: Action<any, any>) {
  switch (action.type) {
    case SET_USER_NAME:
      return {...state, name: action.payload};
    case SET_USER_AGE:
      return {...state, age: action.payload};
    default:
      return state;
  }
}

export default userReducer;
