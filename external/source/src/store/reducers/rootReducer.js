import { combineReducers } from 'redux';

import trackReducer from './trackReducer';
import userReducer from './userReducer';
import generalReducer from './generalReducer';

export default combineReducers({
  trackReducer,
  userReducer,
  generalReducer
});
