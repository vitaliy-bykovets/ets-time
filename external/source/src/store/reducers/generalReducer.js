import { CHANGE_BG_COLOR } from './../actions/types';

const bgColor = localStorage.getItem('bdColor');
const initial = {
  bgColor: bgColor ? bgColor : 'deepskyblue'
};

export default function userReducer(state = initial, action = {}) {
  switch (action.type) {
    case CHANGE_BG_COLOR:
      return Object.assign({}, state, { bgColor: action.color });
    default:
      return state;
  }
}
