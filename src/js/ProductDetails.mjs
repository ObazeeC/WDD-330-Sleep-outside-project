import { setLocalStorage, getLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = null;
    this.dataSource = dataSource;
  }

  async init() {
    try {
      this.product = await this.dataSource.findProductById(this.productId);
      this.renderProductDetails();
    } catch (err) {
      console.error('Error loading product details', err);
    }
  }

  addToCart() {
    const key = 'so-cart';
    const cart = getLocalStorage(key) || [];
    cart.push(this.product);
    setLocalStorage(key, cart);
  }

  renderProductDetails() {
    if (!this.product) return;
    const product = this.product;

    // Update page title
    if (product.Name) {
      document.title = `Sleep Outside | ${product.Name}`;
    }

    const nameElement = document.getElementById('productName');
    if (nameElement) {
      nameElement.textContent = product.NameWithoutBrand || product.Name || '';
    }

    const imageElement = document.getElementById('productImage');
    if (imageElement) {
      const images = product.Images || {};
      imageElement.src =
        images.PrimaryLarge || images.PrimaryMedium || product.Image || '';
      imageElement.alt =
        product.NameWithoutBrand || product.Name || 'Camping product';
    }

    const priceElement = document.getElementById('productPrice');
    if (priceElement) {
      const value = product.FinalPrice;
      const formatted =
        typeof value === 'number' ? value.toFixed(2) : value || '';
      priceElement.textContent = `$${formatted}`;
    }

    const colorElement = document.getElementById('productColor');
    if (colorElement) {
      colorElement.textContent =
        product.Colors && product.Colors.length > 0
          ? product.Colors[0].ColorName
          : 'N/A';
    }

    const descriptionElement = document.getElementById('productDescription');
    if (descriptionElement) {
      descriptionElement.innerHTML = product.DescriptionHtmlSimple || '';
    }

    const addToCartButton = document.getElementById('addToCart');
    if (addToCartButton) {
      addToCartButton.dataset.id = product.Id;
      addToCartButton.addEventListener('click', () => this.addToCart());
    }
  }
}
