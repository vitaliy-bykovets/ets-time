import { SET_ACTIVE_USER, SET_USERS } from './types';

// Helpers
import { getUsersApi } from './../../shared/ApiService';

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

function setUsers(users) {
  return {
    type: SET_USERS,
    users
  };
}
