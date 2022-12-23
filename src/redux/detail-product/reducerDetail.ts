import {
  DECREMENT_COUNT,
  INCREASE_COUNT,
  SET_FAVOURITE_ID,
  SET_PRODUCTS,
} from './actionDetail';

//! dico cosa devono fare
interface ProductRating {
  rate: number;
  count: number;
}

interface Product {
  id: number;
  image: string;
  rating: ProductRating;
  title: string;
  price: number;
  description: string;
  category: string;
  favourite: boolean;
}

export interface ProductState {
  //! API products
  products: Product[];
  count: number;
}

const initialState: ProductState = {
  products: [],
  count: 0,
};

interface Action<T, P> {
  type: T;
  payload?: P;
}

function productReducer(
  state = initialState,
  action: Action<any, any>,
): ProductState {
  switch (action.type) {
    case SET_PRODUCTS:
      return {...state, products: action.payload};
    case SET_FAVOURITE_ID:
      return {...state, favourite: action.payload};
    case INCREASE_COUNT:
      return {...state, count: state.count + 1};
    case DECREMENT_COUNT:
      return {...state, count: state.count - 1};
    default:
      return state;
  }
}

export default productReducer;
