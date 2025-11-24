import {
  getLocalStorage,
  setLocalStorage,
  alertMessage,
  loadHeaderFooter
} from "./utils.mjs";

// Load header/footer
loadHeaderFooter();

// Render Cart Items
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  const listElement = document.querySelector("#cart-items-list");
  const countDisplay = document.querySelector("#cart-count");
  const subtotalDisplay = document.querySelector("#cart-subtotal");

  // If cart empty
  if (cartItems.length === 0) {
    listElement.innerHTML = "<p>Your cart is empty.</p>";
    countDisplay.textContent = "0";
    subtotalDisplay.textContent = "$0.00";
    return;
  }

  // Render items
  const html = cartItems.map((item) => cartItemTemplate(item)).join("");
  listElement.innerHTML = html;

  // Update summary
  let subtotal = 0;
  let itemCount = 0;

  cartItems.forEach((item) => {
    subtotal += item.FinalPrice * item.Quantity;
    itemCount += item.Quantity;
  });

  subtotalDisplay.textContent = `$${subtotal.toFixed(2)}`;
  countDisplay.textContent = itemCount;
}

// Cart Card Template
function cartItemTemplate(item) {
  return `
    <div class="cart-card divider">
      <a class="cart-card__image" href="/product_pages/?product=${item.Id}">
        <img src="${item.Image}" alt="${item.NameWithoutBrand}" />
      </a>

      <div class="cart-card__info">
        <h2 class="card__name">${item.NameWithoutBrand}</h2>
        <p class="cart-card__color">${item.Colors ? item.Colors[0].ColorName : ""}</p>
        <p class="cart-card__quantity">qty: ${item.Quantity}</p>
        <p class="cart-card__price">$${item.FinalPrice}</p>
      </div>
    </div>
  `;
}

// Checkout Button → Go to checkout form
const checkoutButton = document.querySelector("#checkoutButton");
if (checkoutButton) {
  checkoutButton.addEventListener("click", () => {
    window.location.assign("/checkout/index.html");
  });
}

// Initial Render
renderCartContents();
