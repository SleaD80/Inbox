import data from '../data/tasks';
import axios from 'axios';
export const FETCH_TASKS = 'FETCH_TASKS';
export const CLOSE_TASK = 'CLOSE_TASK';
export const SELECT_TASK = 'SELECT_TASK';
export const SORT = 'SORT';
export const SEARCH = 'SEARCH';
export const FILTER = 'FILTER';
export const CHANGE_THEME = 'CHANGE_THEME';
export const LOAD_STORED_THEME = 'LOAD_STORED_THEME';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const RESTORE_SESSION = 'RESTORE_SESSION';
export const USER_INFO = 'USER_INFO';

export const fetchTasks = () => async (dispatch, getState) => {
  try {
    const userProfile = getState().userProfile;
    const username = userProfile.username;
    const ticket = userProfile.ticket;
    const result = await axios.get('/api/dctm/v1/tasks', {
      params: {
        user: username,
      },
      headers: {
        'Dctm-Ticket': ticket,
      },
      timeout: 3000,
    });
    const data = result.data.data;
    dispatch({
      type: FETCH_TASKS,
      tasks: data,
    });
  } catch (e) {
    dispatch({
      type: null,
    });
  }
};

//export const fetchTasks = () => async (dispatch) => {
//try {
//const result = data.sort((a, b) => a.title.localeCompare(b.title));
//dispatch({
//type: FETCH_TASKS,
//tasks: result,
//});
//} catch (e) {
//dispatch({
//type: FETCH_TASKS,
//tasks: [],
//});
//}
//};

export const userLogin =
  (login, password, rememberUser) => async (dispatch) => {
    try {
      const result = await axios.post(
        '/api/dctm/v1/login',
        {
          userName: login,
          password: password,
        },
        { timeout: 3000 }
      );
      const data = result.data.data[0];
      const profile = data.userTicket
        ? {
            authenticated: true,
            username: data.userName,
            ticket: data.userTicket,
          }
        : { authenticated: false };
      dispatch({
        type: LOGIN,
        profile: profile,
      });
      if (profile.authenticated) {
        await dispatch(userInfo());
        await dispatch(fetchTasks());
        sessionStorage.setItem('session', JSON.stringify(profile));
        if (rememberUser) {
          localStorage.setItem('session', JSON.stringify(profile));
        }
      }
    } catch (e) {
      dispatch({
        type: LOGIN,
        profile: { authenticated: false },
      });
    }
  };

export const userInfo = () => async (dispatch, getState) => {
  try {
    const userProfile = getState().userProfile;
    const username = userProfile.username;
    const ticket = userProfile.ticket;
    const result = await axios.get('/api/dctm/v1/userInfo', {
      params: {
        user: username,
      },
      headers: {
        'Dctm-Ticket': ticket,
      },
      timeout: 3000,
    });
    const data = result.data.data[0];
    if (data.id) {
      dispatch({
        type: USER_INFO,
        address: data.address,
        fullname: data.description,
      });
    } else {
      dispatch(logout());
    }
  } catch (e) {
    dispatch({
      type: null,
    });
  }
};

export const logout = () => {
  delete sessionStorage.session;
  delete localStorage.session;
  return { type: LOGOUT };
};

export const restoreSession = () => {
  const session =
    sessionStorage.getItem('session') || localStorage.getItem('session');
  return session
    ? { type: RESTORE_SESSION, profile: JSON.parse(session) }
    : { type: null };
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

export const applyFilter = (criterium) => {
  return { type: FILTER, criterium: criterium };
};

export const changeTheme = (theme) => {
  return { type: CHANGE_THEME, theme: theme };
};

export const loadStoredTheme = (theme) => {
  return { type: LOAD_STORED_THEME, theme: theme };
};
