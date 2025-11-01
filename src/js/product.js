import { getLocalStorage, setLocalStorage } from './utils.mjs';
import ProductData from './ProductData.mjs';

const dataSource = new ProductData('tents');

function addProductToCart(product) {
  let cart = getLocalStorage('so-cart');

  // Convert anything non-array to a true array
  if (Array.isArray(cart)) {
    // ok
  } else if (cart && typeof cart === 'object') {
    // handles previously-saved object or array-like { "0": {...}, "1": {...} }
    cart = Object.values(cart);
  } else {
    cart = [];
  }

  cart.push(product);
  setLocalStorage('so-cart', cart);
}

async function addToCartHandler(e) {
  e?.preventDefault?.();
  const id = e?.target?.dataset?.id;
  if (!id) return console.warn('Missing data-id on Add to Cart button');

  const product = await dataSource.findProductById(id);
  if (!product) return console.warn('No product found for id:', id);

  addProductToCart(product);
}

document
  .getElementById('addToCart')
  ?.addEventListener('click', addToCartHandler);
