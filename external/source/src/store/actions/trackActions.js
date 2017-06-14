import { getTracksApi, getWorkTypesApi } from './../../shared/ApiService';
import {
  SET_TRACKS,
  TOGGLE_SINGLE_TRACK,
  TOGGLE_TRACK_FILTERS,
  SET_WORK_TYPES,
  SET_STATUS_TYPES,
  SET_TRACK_FILTER,
  CLEAR_TRACK_FILTERS
} from './types';

export function getTracks(filters) {
  return dispatch => {
    getTracksApi(filters).then(resp => dispatch(setTracks(resp.data)));
  };
}

function setTracks(tracks) {
  return {
    type: SET_TRACKS,
    tracks
  };
}

export function clearTrackFilters() {
  return {
    type: CLEAR_TRACK_FILTERS
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

export function setTrackFilters(filters) {
  return {
    type: SET_TRACK_FILTER,
    filters
  };
}

export function getLibraries() {
  return dispatch => {
    getWorkTypesApi().then(resp => {
      dispatch(setWorkTypes(resp.type_works));
      dispatch(setStatusTypes(resp.task_status));
    });
  };
}

function setWorkTypes(workTypes) {
  return {
    type: SET_WORK_TYPES,
    workTypes
  };
}

function setStatusTypes(statusTypes) {
  return {
    type: SET_STATUS_TYPES,
    statusTypes
  };
}
