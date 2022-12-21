import {
  SET_USER_NAME,
  SET_USER_AGE,
  INCREASE_AGE,
  GET_ALBUM,
} from './actionLogin';
//! dico cosa devono fare
export interface UserState {
  name: string;
  age: number;
  //! API album
  album: {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
  }[];
}

const initialState: UserState = {
  name: '',
  age: 0,
  album: [],
};

interface Action<T, P> {
  type: T;
  payload?: P;
}

function userReducer(
  state = initialState,
  action: Action<any, any>,
): UserState {
  switch (action.type) {
    case SET_USER_NAME:
      return {...state, name: action.payload};
    case SET_USER_AGE:
      return {...state, age: action.payload};
    // case INCREASE_AGE:
    //   return {...state, age: state.age + 1};
    // case GET_ALBUM:
    //   return {...state, album: action.payload};
    default:
      return state;
  }
}

export default userReducer;
