// wrapper for querySelector... returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localStorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to localStorage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  const element = qs(selector);
  element.addEventListener('touchend', (event) => {
    event.preventDefault();
    callback(event);
  });
  element.addEventListener('click', callback);
}

// get a URL parameter, e.g. ?product=880RR
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}
