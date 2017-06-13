import { getTracksApi } from './../../shared/ApiService';
import { SET_TRACKS, TOGGLE_SINGLE_TRACK, TOGGLE_TRACK_FILTERS } from './types';

export function getTracks() {
  return dispatch => {
    getTracksApi().then(resp => dispatch(setTracks(resp.data)));
  };
}

function setTracks(tracks) {
  return {
    type: SET_TRACKS,
    tracks
  };
}

export function toggleSingleTrack() {
  return {
    type: TOGGLE_SINGLE_TRACK
  };
}

export function toggleTrackFilters() {
  return {
    type: TOGGLE_TRACK_FILTERS
  };
}
