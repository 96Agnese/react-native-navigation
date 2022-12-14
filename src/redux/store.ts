import {legacy_createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducer';
import productReducer from './detail/reducerDetail';

const rootReducer = combineReducers({userReducer, productReducer});

export type StoreState = ReturnType<typeof rootReducer>;
export const Store = legacy_createStore(rootReducer, applyMiddleware(thunk));
