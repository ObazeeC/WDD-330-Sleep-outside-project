import { renderListWithTemplate } from './utils.mjs';

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    try {
      const products = await this.dataSource.getData(this.category);
      this.renderList(products);
    } catch (err) {
      console.error('Error loading products', err);
      if (this.listElement) {
        this.listElement.innerHTML = '<li>Sorry, we could not load products at this time.</li>';
      }
    }
  }

  renderList(products) {
    const template = document.getElementById('product-card-template');
    if (!template || !this.listElement) return;

    renderListWithTemplate(
      template,
      this.listElement,
      products,
      (fragment, product) => this.prepareTemplate(fragment, product),
    );
  }

  prepareTemplate(fragment, product) {
    const link = fragment.querySelector('a');
    const img = fragment.querySelector('img');
    const brand = fragment.querySelector('.card__brand');
    const name = fragment.querySelector('.card__name');
    const price = fragment.querySelector('.product-card__price');

    if (link) {
      link.href = `/product_pages/index.html?product=${product.Id}`;
    }
    if (img) {
      const images = product.Images || {};
      img.src = images.PrimaryMedium || product.Image || '';
      img.alt = product.NameWithoutBrand || product.Name || 'Camping product';
    }
    if (brand) {
      // Brand might be a string or object depending on the data source
      brand.textContent = product.Brand?.Name || product.Brand || '';
    }
    if (name) {
      name.textContent = product.NameWithoutBrand || product.Name || '';
    }
    if (price) {
      const value = product.FinalPrice;
      const formatted =
        typeof value === 'number' ? value.toFixed(2) : value || '';
      price.textContent = `$${formatted}`;
    }
  }
}
