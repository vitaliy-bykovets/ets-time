import { SET_ACTIVE_USER } from './../actions/types';

const initial = {
  activeUser: {
    first_name: '',
    last_name: '',
    email: ''
  }
};

export default function userReducer(state = initial, action = {}) {
  switch (action.type) {
    case SET_ACTIVE_USER:
      return Object.assign({}, state, { activeUser: action.user });

    default:
      return state;
  }
}
