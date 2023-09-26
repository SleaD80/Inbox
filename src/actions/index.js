import axios from 'axios';
import { base64ToArrayBuffer, getLevel } from '../helpers';
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
export const DOWNLOAD_ATTACHMENTS = 'DOWNLOAD_ATTACHMENTS';
export const SNACKBAR_SHOW = 'SNACKBAR_SHOW';
export const SNACKBAR_CLOSE = 'SNACKBAR_CLOSE';

export const downloadAttachments =
  (taskId, content) => async (dispatch, getState) => {
    try {
      if (!getState().attachments.taskId) {
        let contentArr = [];
        const userProfile = getState().userProfile;
        const ticket = userProfile.ticket;
        for (let item of content) {
          const result = await axios.get('/api/dctm/v1/content', {
            params: {
              objectId: item.id,
            },
            headers: {
              'Dctm-Ticket': ticket,
            },
            timeout: 3000,
          });
          const data = result.data.data[0].data;
          const blob = new Blob([base64ToArrayBuffer(data)], {
            type: 'application/pdf',
          });
          contentArr.push(URL.createObjectURL(blob));
        }
        dispatch({
          type: DOWNLOAD_ATTACHMENTS,
          taskId: taskId,
          content: contentArr,
        });
      }
    } catch (e) {
      dispatch(displaySnackbar('Ошибка связи с сервером. Попробуйте позже'));
    }
  };

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
      tasks: data.map((item) => {
        return { ...item, level: getLevel(item.dueDate), stage: 0 };
      }),
    });
  } catch (e) {
    dispatch(displaySnackbar('Ошибка связи с сервером. Попробуйте позже'));
  }
};

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
      } else {
        dispatch(displaySnackbar('Неверный логин или пароль'));
      }
    } catch (e) {
      dispatch({
        type: LOGIN,
        profile: { authenticated: false },
      });
      dispatch(displaySnackbar('Ошибка связи с сервером. Попробуйте позже'));
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
    dispatch(displaySnackbar('Ошибка связи с сервером. Попробуйте позже'));
  }
};

export const logout = () => {
  delete sessionStorage.session;
  delete localStorage.session;
  window.location.reload();
  return { type: LOGOUT };
};

export const restoreSession = () => async (dispatch, getState) => {
  const session =
    sessionStorage.getItem('session') || localStorage.getItem('session');
  if (session) {
    await dispatch({ type: RESTORE_SESSION, profile: JSON.parse(session) });
    dispatch(userInfo(getState().userProfile.username));
    dispatch(fetchTasks(getState().userProfile.username));
  }
};

export const displaySnackbar = (text) => {
  return { type: SNACKBAR_SHOW, text: text };
};

export const removeSnackbar = () => {
  return { type: SNACKBAR_CLOSE };
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
