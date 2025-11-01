import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  //  setLocalStorage("so-cart", product); this was just overwriting new items added
  //correct code below to add multiple items

  // Get existing cart or empty array
  const cart = JSON.parse(localStorage.getItem("so-cart")) || [];

  // add new item to it
  cart.push(product);

  // save updated cart
  localStorage.setItem("so-cart", JSON.stringify(cart));
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
