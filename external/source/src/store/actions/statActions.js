// Types
import { SET_STAT } from './types';

// Helpers
import { getStatPerUser } from './../../shared/ApiService';

export function getStatByUserID(token, user_id) {
  return dispatch => {
    getStatPerUser(token, user_id).then(resp => {
      if (resp.per_day)
        dispatch({
          type: SET_STAT,
          payload: {
            per_day: resp.per_day,
            per_status: resp.per_status,
            per_months: resp.per_months,
            history: resp.per_day
          }
        });
    });
  };
}
