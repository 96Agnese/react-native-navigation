import {GET_ALBUM} from './action';
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
    case GET_ALBUM:
      return {...state, album: action.payload};
    default:
      return state;
  }
}

export default userReducer;
