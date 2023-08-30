import { combineReducers } from 'redux';
import {
  FETCH_TASKS,
  CLOSE_TASK,
  SELECT_TASK,
  SORT,
  SEARCH,
  FILTER,
} from '../actions';

function clearSelection(arr) {
  return arr.map((item) => {
    return { ...item, active: 0 };
  });
}

function tasks(
  state = {
    tasks: [],
    active: 0,
    rejected: 0,
    approved: 0,
    deadline: 0,
    overdue: 0,
    all: 0,
  },
  action
) {
  let newState = [];
  switch (action.type) {
    case FETCH_TASKS:
      newState = clearSelection(action.tasks);
      newState[0].active = 1;
      return {
        tasks: newState,
        rejected: newState.filter((item) => item.stage === 2).length,
        approved: newState.filter((item) => item.stage === 1).length,
        deadline: newState.filter((item) => item.level === 'Warn').length,
        overdue: newState.filter((item) => item.level === 'Error').length,
        all: newState.length,
        active: newState.filter((item) => item.stage === 0).length,
      };
    case CLOSE_TASK:
      newState = clearSelection(state.tasks);
      const index = newState.findIndex((item) => item.id === action.taskId);
      const taskToChange = { ...newState[index], stage: action.stageId };
      newState = newState
        .slice(0, index)
        .concat([taskToChange], newState.slice(index + 1));
      return action.stageId === 1
        ? {
            ...state,
            tasks: newState,
            approved: state.approved + 1,
            active: state.active - 1,
          }
        : {
            ...state,
            tasks: newState,
            rejected: state.rejected + 1,
            active: state.active - 1,
          };
    case SELECT_TASK:
      newState = clearSelection(state.tasks);
      const selected = newState.find((item) => item.id === action.taskId);
      selected.active = 1;
      return { ...state, tasks: newState };
    case SORT:
      newState = clearSelection(
        Object.assign(
          [],
          state.tasks.sort((a, b) =>
            a[action.sorterField] > b[action.sorterField] ? 1 : -1
          )
        )
      );
      return { ...state, tasks: newState };
    default:
      return state;
  }
}

function search(query = '', action) {
  return action.type === SEARCH ? action.query : query;
}

function filterCriterium(state = 'all', action) {
  switch (action.type) {
    case FILTER:
      return action.criterium;
    default:
      return state;
  }
}

const rootReducer = combineReducers({ tasks, search, filterCriterium });
export default rootReducer;
