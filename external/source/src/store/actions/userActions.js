import { SET_ACTIVE_USER } from './types';

export function setActiveUser(user) {
  return {
    type: SET_ACTIVE_USER,
    user
  };
}
