// Handle http errors
export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

// Parse http response to json
export function parseJSON(response) {
  return response.json();
}

// Format date to server special
export function formatDateToServer(inputDate) {
  let d = inputDate.toLocaleDateString().split('/');
  let y = d.splice(-1)[0];
  d.splice(0, 0, y);

  return d.map(i => (i.length === 1 ? `0${i}` : i)).join('-');
}

// Get start of week
export function getStartOfWeek(date) {
  date = date ? new Date(date) : new Date();
  date.setHours(0, 0, 0, 0);

  // Set date to previous monday
  date.setDate(date.getDate() - (date.getDay() || 7) + 1);

  return date;
}

// Get end of week
export function getEndOfWeek(date) {
  date = getStartOfWeek(date);
  date.setDate(date.getDate() + 6);
  return date;
}

// Check if filters was selected
export function showClearFilters(filters) {
  let { workType, status, project, task, startDate, endDate } = filters;
  const sWeek = getStartOfWeek().toLocaleDateString();
  const eWeek = getEndOfWeek().toLocaleDateString();

  return (
    workType !== null ||
    status !== null ||
    project !== '' ||
    task !== '' ||
    startDate.toLocaleDateString() !== sWeek ||
    endDate.toLocaleDateString() !== eWeek
  );
}
