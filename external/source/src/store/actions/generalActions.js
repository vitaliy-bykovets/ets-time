import {
  CHANGE_BG_COLOR,
  CLEAR_ERROR_FIELD,
  SET_ERRORS,
  CLEAR_ERRORS
} from './../actions/types';

export function changeBgColor(color) {
  return {
    type: CHANGE_BG_COLOR,
    color
  };
}

export function clearErrorField(field) {
  return {
    type: CLEAR_ERROR_FIELD,
    field
  };
}

export function setErrors(errors) {
  return {
    type: SET_ERRORS,
    errors
  };
}

export function clearErrors() {
  return {
    type: CLEAR_ERRORS
  };
}
