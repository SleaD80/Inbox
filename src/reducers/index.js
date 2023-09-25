import { combineReducers } from 'redux';
import {
  FETCH_TASKS,
  CLOSE_TASK,
  SELECT_TASK,
  SORT,
  SEARCH,
  FILTER,
  CHANGE_THEME,
  LOAD_STORED_THEME,
  LOGIN,
  RESTORE_SESSION,
  USER_INFO,
  DOWNLOAD_ATTACHMENTS,
} from '../actions';
import { getColor } from '../helpers';

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
  let newState = {};
  switch (action.type) {
    case FETCH_TASKS:
      newState = clearSelection(action.tasks);
      newState[0].active = 1;
      return {
        tasks: newState,
        all: newState.length,
        active: newState.filter((item) => item.stage === 0).length,
        approved: newState.filter((item) => item.stage === 1).length,
        rejected: newState.filter((item) => item.stage === 2).length,
        deadline: newState.filter((item) => item.level === 'Warn').length,
        overdue: newState.filter((item) => item.level === 'Error').length,
      };
    case CLOSE_TASK:
      const index = state.tasks.findIndex((item) => item.id === action.taskId);
      let taskToChange = state.tasks[index];
      let levelFilterToDecrement = null;
      if (taskToChange.level !== 'Ok') {
        levelFilterToDecrement =
          taskToChange.level === 'Warn' ? 'deadline' : 'overdue';
      }
      const stageToIncrement = action.stageId === 1 ? 'approved' : 'rejected';
      taskToChange = { ...taskToChange, level: 'Ok', stage: action.stageId };
      newState = Object.assign({}, state);
      newState.tasks[index] = taskToChange;
      newState.active = newState.active - 1;
      newState[stageToIncrement] = newState[stageToIncrement] + 1;
      if (levelFilterToDecrement) {
        newState[levelFilterToDecrement] = newState[levelFilterToDecrement] - 1;
      }
      return newState;
    case SELECT_TASK:
      newState = clearSelection(state.tasks);
      const selected = newState.find((item) => item.id === action.taskId);
      selected.active = 1;
      return { ...state, tasks: newState };
    case SORT:
      newState = Object.assign(
        [],
        state.tasks.sort((a, b) =>
          a[action.sorterField] > b[action.sorterField] ? 1 : -1
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

function theme(state = 'materia', action) {
  switch (action.type) {
    case CHANGE_THEME:
    case LOAD_STORED_THEME:
      return action.theme;
    default:
      return state;
  }
}

function userProfile(state = { authenticated: false }, action) {
  switch (action.type) {
    case LOGIN:
    case RESTORE_SESSION:
      return action.profile;
    case USER_INFO:
      return { ...state, address: action.address, fullname: action.fullname };
    default:
      return state;
  }
}

function attachments(state = {}, action) {
  switch (action.type) {
    case DOWNLOAD_ATTACHMENTS:
      let newState = Object.assign({}, state);
      newState[action.taskId] = action.content;
      return newState;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  tasks,
  search,
  filterCriterium,
  theme,
  userProfile,
  attachments,
});
export default rootReducer;
