import data from '../data/tasks';
export const FETCH_TASKS = 'FETCH_TASKS';
export const CLOSE_TASK = 'CLOSE_TASK';
export const SELECT_TASK = 'SELECT_TASK';
export const SORT = 'SORT';
export const SEARCH = 'SEARCH';

export const fetchTasks = () => async (dispatch) => {
  try {
    const result = data.sort((a, b) => a.title.localeCompare(b.title));
    dispatch({
      type: FETCH_TASKS,
      tasks: result,
    });
  } catch (e) {
    dispatch({
      type: FETCH_TASKS,
      tasks: [],
    });
  }
};

export const closeTask = (taskId, stageId) => {
  return { type: CLOSE_TASK, taskId: taskId, stageId: stageId };
};

export const selectTask = (taskId) => {
  return { type: SELECT_TASK, taskId: taskId };
};

export const sort = (sorterField) => {
  return { type: SORT, sorterField: sorterField };
};

export const search = (query) => {
  return { type: SEARCH, query: query };
};
