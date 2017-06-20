import { parseJSON, formatDateToServer } from './HelpService';

export function getDictionaries() {
  return fetch('/api/v1/dictionaries').then(parseJSON);
}

export function deleteTrackApi(id) {
  return fetch('/api/v1/lines', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id,
      user_id: 1
    })
  });
}

export function createTrackApi(data) {
  let { project = '', task = '', type_work = '', hours = 0, trackDate } = data;

  return fetch('/api/v1/lines', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      project,
      task,
      type_work,
      hours,
      date_task: trackDate ? trackDate.format('YYYY-MM-DD') : ''
    })
  });
}

export function updateTrackApi(data) {
  let {
    id = '',
    project = '',
    task = '',
    type_work = '',
    hours = 0,
    trackDate
  } = data;

  return fetch('/api/v1/lines', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id,
      project,
      task,
      type_work,
      hours,
      date_task: trackDate ? trackDate.format('YYYY-MM-DD') : ''
    })
  });
}

export function getTracksApi(filters) {
  let {
    type_work = '',
    status = '',
    project = '',
    task = '',
    startDate = '',
    endDate = '',
    username = ''
  } = filters ? filters : {};

  let sDate = startDate ? formatDateToServer(startDate) : '';
  let eDate = endDate ? formatDateToServer(endDate) : '';

  return fetch(
    `/api/v1/lines?project=${project ? project : ''}&user_name=${username
      ? username
      : ''}&date_start=${startDate ? sDate : ''}&date_end=${endDate
      ? eDate
      : ''}&status=${status ? status : ''}&type_work=${type_work
      ? type_work
      : ''}&task=${task}`
  ).then(parseJSON);
}
