import { renderCategoryWithTemplate } from "./utils.mjs";

function categoryItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="/product_pages/index.html?product=${item.Id}&Category=${item.Category}" class="cart-card__image">
      <img src="${item.Images.PrimaryMedium}" alt="${item.Name}" />
    </a>
    <a href="/product_pages/index.html?product=${item.Id}&category=${item.Category}" class="cart-card__image">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors?.[0]?.ColorName || "No color"}</p>
    <p class="cart-card__quantity">Quantity: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}
categoryProductsDetail;

export default class categoryProductsDetail {
  constructor(dataSource, listElement, category) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = {};
  }

  async init() {
    this.products = await this.dataSource.getData(this.category);

    console.log(this.products);

    this.renderListByCategory(this.products);
  }

  renderListByCategory(products) {
    renderCategoryWithTemplate(
      categoryItemTemplate,
      this.listElement,
      products,
    );
  }
}
