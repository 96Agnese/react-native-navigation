import {AnyAction, Dispatch} from 'redux';

//!dichiaro le azioni

export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_AGE = 'SET_USER_AGE';

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
