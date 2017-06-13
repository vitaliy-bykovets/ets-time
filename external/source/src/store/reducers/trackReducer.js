import {
  SET_TRACKS,
  TOGGLE_SINGLE_TRACK,
  TOGGLE_TRACK_FILTERS
} from './../actions/types';

const initial = {
  tracks: [],
  trackIsOpen: false,
  filtersIsOpen: false
};

export default function trackReducer(state = initial, action = {}) {
  switch (action.type) {
    case SET_TRACKS:
      return Object.assign({}, state, { tracks: action.tracks });
    case TOGGLE_SINGLE_TRACK:
      return Object.assign({}, state, { trackIsOpen: !state.trackIsOpen });
    case TOGGLE_TRACK_FILTERS:
      return Object.assign({}, state, { filtersIsOpen: !state.filtersIsOpen });
    default:
      return state;
  }
}
