import { renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image ? "/" + item.Image : item.Images.PrimaryMedium}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors?.[0]?.ColorName || "No color"}</p>
    <p class="cart-card__quantity">Quantity: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

export default class ProductsBought {
  constructor(dataSource, cartListElement) {
    this.dataSource = dataSource;
    this.cartListElement = cartListElement;
  }

  init() {
    const cartList = this.dataSource || [];
    if (cartList.length === 0) {
      this.cartListElement.innerHTML = "<p>Your cart is empty.</p>";
    } else {
      this.renderCartList(cartList);
    }
  }

  renderCartList(cartList) {
    renderListWithTemplate(cartItemTemplate, this.cartListElement, cartList);
  }
}
