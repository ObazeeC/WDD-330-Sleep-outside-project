// src/js/ProductList.mjs

// use the shared render helper from utils
import { renderListWithTemplate } from './utils.mjs';

// Template for a single product card
function productCardTemplate(product) {
  // make sure we always get a readable brand string
  const brand =
    typeof product.Brand === 'string'
      ? product.Brand
      : product.Brand?.Name ?? 'Unknown Brand';

  return `
    <li class="product-card">
      <a href="product_pages/index.html?product=${product.Id}">
        <img
          src="${product.Image}"
          alt="${product.NameWithoutBrand}"
        />
        <h3 class="card__brand">${brand}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
  `;
}

// Class that builds the product list on the home page
export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // get all products for this category from the JSON file
    const allProducts = await this.dataSource.getData();

    // keep only products that actually have an image,
    // then take the first 4 for "Top Products"
    const topWithImages = allProducts
      .filter((product) => product.Image && product.Image.trim() !== '')
      .slice(0, 4);

    // render them into the UL
    this.renderList(topWithImages);
  }

  renderList(list) {
    // use the shared helper to build the list
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
