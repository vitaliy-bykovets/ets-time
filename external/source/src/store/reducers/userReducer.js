import { SET_ACTIVE_USER, SET_USERS, ME_FAILED } from './../actions/types';

const initial = {
  activeUser: {
    first_name: '',
    last_name: '',
    email: ''
  },
  users: [],
  meFailed: false
};

export default function userReducer(state = initial, action = {}) {
  switch (action.type) {
    case SET_ACTIVE_USER:
      return Object.assign({}, state, { activeUser: action.user });
    case SET_USERS:
      return Object.assign({}, state, { users: action.users });
    case ME_FAILED:
      return Object.assign({}, state, { meFailed: action.param });

    default:
      return state;
  }
}
