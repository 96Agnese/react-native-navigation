import {legacy_createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './login/reducerLogin';
import productReducer from './detail-product/reducerDetail';
import taskReducer from './task/reducerTask';

const rootReducer = combineReducers({userReducer, productReducer, taskReducer});

export type StoreState = ReturnType<typeof rootReducer>;
export const Store = legacy_createStore(rootReducer, applyMiddleware(thunk));
