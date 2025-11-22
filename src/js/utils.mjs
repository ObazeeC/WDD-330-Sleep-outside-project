// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// ----------------------
// Week 3 additions
// ----------------------

// Load a template from /partials
export async function loadTemplate(path) {
  const html = await fetch(path);
  return await html.text();
}

// Render a single template (not a list)
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;

  // callback is optional (for cart count, animation, etc.)
  if (callback) {
    callback(data);
  }
}

// Load both header and footer into the page
export async function loadHeaderFooter() {
  // 1. load the HTML for header and footer
  const header = await loadTemplate("/partials/header.html");
  const footer = await loadTemplate("/partials/footer.html");

  // 2. find the placeholders
  const headerElement = document.getElementById("main-header");
  const footerElement = document.getElementById("main-footer");

  // 3. render them
  renderWithTemplate(header, headerElement);
  renderWithTemplate(footer, footerElement);
}
