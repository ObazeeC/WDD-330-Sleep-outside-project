import { loadHeaderFooter } from './utils.mjs';

// Load shared header + footer
loadHeaderFooter();

// Read the category from the URL: ?category=tents
const params = new URLSearchParams(window.location.search);
const category = params.get('category') || 'tents';

// Elements on the page
const listElement = document.getElementById('product-list');
const titleElement = document.getElementById('category-title');

init();

async function init() {
  try {
    titleElement.textContent = 'Products – ' + formatCategoryName(category);

    const products = await getProductsForCategory(category);
    renderProductList(products);
  } catch (err) {
    listElement.innerHTML =
      '<li>Sorry, we could not load products for this category.</li>';
  }
}

// Turn "sleeping-bags" → "Sleeping Bags"
function formatCategoryName(cat) {
  return cat
    .replace(/-/g, ' ')
    .replace(/\b\w/g, function (c) {
      return c.toUpperCase();
    });
}

// Fetch products from /json/<category>.json
async function getProductsForCategory(cat) {
  const response = await fetch('/json/' + cat + '.json');
  if (!response.ok) {
    throw new Error('Failed to load /json/' + cat + '.json');
  }
  return response.json();
}

// Build one product card
function productCardTemplate(product) {
  const brand =
    typeof product.Brand === 'string'
      ? product.Brand
      : product.Brand && product.Brand.Name
      ? product.Brand.Name
      : '';

  const name = product.NameWithoutBrand || product.Name || '';
  const price =
    product.FinalPrice !== undefined
      ? product.FinalPrice
      : product.SuggestedRetailPrice !== undefined
      ? product.SuggestedRetailPrice
      : '';
  const image = product.Image || '';
  const altText = name || 'Product image';

  return (
    '<li class="product-card">' +
    '<a href="#">' +
    '<img src="' +
    image +
    '" alt="' +
    altText +
    '" />' +
    '<h3 class="card__brand">' +
    brand +
    '</h3>' +
    '<h2 class="card__name">' +
    name +
    '</h2>' +
    '<p class="product-card__price">$' +
    price +
    '</p>' +
    '</a>' +
    '</li>'
  );
}

// Render many products
function renderProductList(products) {
  listElement.innerHTML = '';
  products.forEach(function (product) {
    listElement.insertAdjacentHTML(
      'beforeend',
      productCardTemplate(product)
    );
  });
}
