import { checkStatus, parseJSON } from './HelpService';

export function getWorkTypesApi() {
  return fetch('/api/v1/dictionaries').then(checkStatus).then(parseJSON);
}

export function getTracksApi(
  project,
  username,
  startDate,
  endDate,
  status,
  typeWork
) {
  return fetch(
    `/api/v1/lines?project=${project ? project : ''}&user_name=${username
      ? username
      : ''}&date_start=${startDate ? startDate : ''}&date_end=${endDate
      ? endDate
      : ''}&status=${status ? status : ''}&type_work=${typeWork
      ? typeWork
      : ''}`
  )
    .then(checkStatus)
    .then(parseJSON);
}
