const CACHE_KEY = 'calculation_history';

// function to check if browser support localStorage or not
function isStorangeExists() {
  return typeof Storage !== 'undefined';
}

// function to add new history
function addHistory(history) {
  if (!isStorangeExists()) return false;

  const historyData =
    localStorage.getItem(CACHE_KEY) === null
      ? []
      : JSON.parse(localStorage.getItem(CACHE_KEY));

  // add new history to first index
  historyData.unshift(history);
  // if history greater than 12, delete last history
  if (historyData.length > 12) historyData.pop();
  // store
  localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
}

function getHistory() {
  if (!isStorangeExists()) return [];
  // if can't find localStorage with that key, return empty array
  return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
}

// this function to renderhistory to table history
function renderHistory() {
  const historyData = getHistory();
  // elementHistory
  const historyEl = document.getElementById('history-list');

  historyEl.innerHTML = '';

  historyData.forEach((history, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<th>${++index}</th><td>${history}</td>`;

    historyEl.appendChild(tr);
  });
}

renderHistory();
