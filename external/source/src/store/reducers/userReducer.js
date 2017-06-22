import { SET_ACTIVE_USER, SET_USERS } from './../actions/types';

const initial = {
  activeUser: {
    first_name: '',
    last_name: '',
    email: ''
  },
  users: []
};

export default function userReducer(state = initial, action = {}) {
  switch (action.type) {
    case SET_ACTIVE_USER:
      return Object.assign({}, state, { activeUser: action.user });
    case SET_USERS:
      return Object.assign({}, state, { users: action.users });

    default:
      return state;
  }
}
