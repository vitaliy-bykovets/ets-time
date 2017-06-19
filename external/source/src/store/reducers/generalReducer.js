import {
  CHANGE_BG_COLOR,
  SET_ERRORS,
  CLEAR_ERROR_FIELD,
  CLEAR_ERRORS
} from './../actions/types';

const bgColor = localStorage.getItem('bdColor');
const initial = {
  bgColor: bgColor ? bgColor : 'deepskyblue',
  errors: {}
};

export default function userReducer(state = initial, action = {}) {
  switch (action.type) {
    case CHANGE_BG_COLOR:
      return Object.assign({}, state, { bgColor: action.color });
    case CLEAR_ERRORS:
      return Object.assign({}, state, { errors: {} });
    case SET_ERRORS:
      return Object.assign({}, state, { errors: action.errors });
    case CLEAR_ERROR_FIELD:
      return Object.assign({}, state, {
        errors: Object.assign({}, state.errors, { [action.field]: undefined })
      });
    default:
      return state;
  }
}
