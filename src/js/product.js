import { getLocalStorage, setLocalStorage } from './utils.mjs';
import ProductData from './ProductData.mjs';

const dataSource = new ProductData('tents');

/*
To actually add products to a cart, you’ll want to:

Retrieve the existing cart from localStorage.

Parse it into an array (if it exists).

Add the new product to that array.

Save the updated array back into localStorage.

*/
function addProductToCart(product) {
  // retrieve the existing cart from local storage and parse it into an array if it already exist or create a new array
  //const cart = JSON.parse(localStorage.getItem('so-cart')) || [];  // We use the JSON.parse when retrieving from local storage
  const cart = getLocalStorage('so-cart') || [];

  // Add new product
  cart.push(product);

  // Save the updated cart back to localStorage
  //localStorage.setItem('so-cart', JSON.stringify(cart)); // Local storage only stores strings, so we need the JSON.stringify method when saving
  setLocalStorage('so-cart', cart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);
