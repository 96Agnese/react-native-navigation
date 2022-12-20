import {SET_TASK, SET_TASK_ID} from './actionTask';

//! dico cosa devono fare

const initialState = {
  tasks: [],
  taskID: 1,
};

interface Action<T, P> {
  type: T;
  payload?: P;
}

function taskReducer(state = initialState, action: Action<any, any>) {
  switch (action.type) {
    case SET_TASK:
      return {...state, tasks: action.payload};
    case SET_TASK_ID:
      return {...state, taskID: action.payload};

    default:
      return state;
  }
}

export default taskReducer;
