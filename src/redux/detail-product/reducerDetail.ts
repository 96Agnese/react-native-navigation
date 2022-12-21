import {
  DECREMENT_COUNT,
  GET_PRODUCT_DETAIL,
  INCREASE_COUNT,
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
    case GET_PRODUCT_DETAIL:
      return {...state, products: action.payload};
    case INCREASE_COUNT:
      return {...state, count: state.count + 1};
    case DECREMENT_COUNT:
      return {...state, count: state.count - 1};
    default:
      return state;
  }
}

export default productReducer;
