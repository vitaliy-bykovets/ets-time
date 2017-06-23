// Types
import {
  SET_ACTIVE_USER,
  SET_USERS,
  ME_FAILED,
  TOGGLE_SINGLE_USER
} from './types';

// Actions
import { setErrors } from './generalActions';

// Helpers
import {
  getUsersApi,
  createUserApi,
  updateUserApi
} from './../../shared/ApiService';

export function createUser(data, token) {
  return dispatch => {
    createUserApi(data, token).then(resp => {
      if (resp.status >= 200 && resp.status < 300) {
        dispatch(getUsers(token));
        dispatch(toggleSingleUser(false));
      } else {
        if (resp.status === 404) {
          dispatch(setErrors({ singleUserError: true }));
        } else {
          resp.json().then(resp => {
            dispatch(setErrors(resp.errors));
          });
        }
      }
    });
  };
}

export function updateUser(data, token) {
  return dispatch => {
    updateUserApi(data, token).then(resp => {
      if (resp.status >= 200 && resp.status < 300) {
        dispatch(getUsers(token));
        dispatch(toggleSingleUser(false));
      } else {
        if (resp.status === 404) {
          dispatch(setErrors({ singleUserError: true }));
        } else {
          resp.json().then(resp => {
            dispatch(setErrors(resp.errors));
          });
        }
      }
    });
  };
}

export function setActiveUser(user) {
  return {
    type: SET_ACTIVE_USER,
    user
  };
}

export function getUsers(token) {
  return dispatch => {
    getUsersApi(token).then(resp => {
      if (resp.data) dispatch(setUsers(resp.data));
    });
  };
}

export function meFailed(param) {
  return {
    type: ME_FAILED,
    param
  };
}

function setUsers(users) {
  return {
    type: SET_USERS,
    users
  };
}

export function toggleSingleUser(param, isUserEdit, data) {
  return {
    type: TOGGLE_SINGLE_USER,
    data,
    isUserEdit,
    param
  };
}
