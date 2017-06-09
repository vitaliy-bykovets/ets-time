import { combineReducers } from 'redux';

import trackReducer from './trackReducer';
import userReducer from './userReducer';

export default combineReducers({
  trackReducer,
  userReducer
});
