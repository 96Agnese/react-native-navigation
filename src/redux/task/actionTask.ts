import {AnyAction, Dispatch} from 'redux';

export const SET_TASK = 'SET_TASK';
export const SET_TASK_ID = 'SET_TASK_ID';

export const setTasks = tasks => {
  return {
    type: SET_TASK,
    payload: tasks,
  };
};

export const setTaskID = tasksID => {
  return {
    type: SET_TASK_ID,
    payload: tasksID,
  };
};
