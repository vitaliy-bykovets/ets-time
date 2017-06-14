import { checkStatus, parseJSON, formatDateToServer } from './HelpService';

export function getWorkTypesApi() {
  return fetch('/api/v1/dictionaries').then(checkStatus).then(parseJSON);
}

export function getTracksApi(filters) {
  let {
    workType = '',
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
      : ''}&status=${status ? status : ''}&type_work=${workType
      ? workType
      : ''}&task=${task}`
  )
    .then(checkStatus)
    .then(parseJSON);
}
