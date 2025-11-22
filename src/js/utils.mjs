// General utility functions for the Sleep Outside site

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  const element = qs(selector);
  if (!element) return;
  element.addEventListener('touchend', (event) => {
    event.preventDefault();
    callback(event);
  });
  element.addEventListener('click', callback);
}

// get a query parameter by name from the current URL
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// Render a list of items using a template element
export function renderListWithTemplate(template, parentElement, list, callback) {
  if (!template || !parentElement || !list) return;
  const fragment = document.createDocumentFragment();
  list.forEach((item) => {
    const clone = template.content.cloneNode(true);
    callback(clone, item);
    fragment.appendChild(clone);
  });
  parentElement.innerHTML = '';
  parentElement.appendChild(fragment);
}

// Render a single template string into a parent element
export function renderWithTemplate(template, parentElement, data, callback) {
  if (!parentElement || !template) return;
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

// Load an HTML partial from a path and return it as a string
export async function loadTemplate(path) {
  const res = await fetch(path);
  if (!res.ok) {
    console.error('Error loading template', path, res.status);
    return '';
  }
  const template = await res.text();
  return template;
}

// Load the header and footer partials into the current page
export async function loadHeaderFooter() {
  try {
    const headerTemplate = await loadTemplate('../partials/header.html');
    const footerTemplate = await loadTemplate('../partials/footer.html');

    const headerElement = document.querySelector('#main-header');
    const footerElement = document.querySelector('#main-footer');

    if (headerElement) {
      renderWithTemplate(headerTemplate, headerElement);
    }
    if (footerElement) {
      renderWithTemplate(footerTemplate, footerElement);
    }
  } catch (err) {
    console.error('Error loading header/footer', err);
  }
}
