import { CHANGE_BG_COLOR } from './../actions/types';

export function changeBgColor(color) {
  return {
    type: CHANGE_BG_COLOR,
    color
  };
}
