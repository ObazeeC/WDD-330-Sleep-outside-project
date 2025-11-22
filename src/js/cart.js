import { getLocalStorage } from './utils.mjs';
import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart') || [];
  const listElement = document.querySelector('.product-list');
  if (!listElement) return;

  if (cartItems.length === 0) {
    listElement.innerHTML = '<li>Your cart is empty.</li>';
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  listElement.innerHTML = htmlItems.join('');
}

function cartItemTemplate(item) {
  const imageSrc =
    (item.Images && (item.Images.PrimaryMedium || item.Images.PrimaryLarge)) ||
    item.Image ||
    '';
  const color =
    item.Colors && item.Colors.length > 0
      ? item.Colors[0].ColorName
      : 'N/A';

  const newItem = `<li class="cart-card divider">
  <a href="/product_pages/index.html?product=${item.Id}" class="cart-card__image">
    <img
      src="${imageSrc}"
      alt="${item.Name || ''}"
    />
  </a>
  <a href="/product_pages/index.html?product=${item.Id}">
    <h2 class="card__name">${item.Name || ''}</h2>
  </a>
  <p class="cart-card__color">${color}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
