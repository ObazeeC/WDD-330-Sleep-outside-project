import { getLocalStorage, setLocalStorage } from "./utils.mjs";

// Build HTML for the product detail view
function productDetailTemplate(product) {
  // Brand can sometimes be an object instead of a simple string.
  // Handle both cases safely.
  let brand = "";

  if (product.Brand) {
    if (typeof product.Brand === "string") {
      brand = product.Brand;
    } else if (typeof product.Brand === "object" && product.Brand.Name) {
      brand = product.Brand.Name;
    }
  }

  const name =
    product.NameWithoutBrand ??
    product.Name ??
    "Product";

  const price = product.FinalPrice ?? product.Price ?? 0;
  const description = product.Description ?? "";
  const image = product.Image ?? "";
  const alt =
    product.Alt ??
    `${brand} ${name}`;
  const id = product.Id ?? "";

  return `
    <section class="product-detail divider">
      <div class="product-detail__image">
        <img src="${image}" alt="Image of ${alt}">
      </div>
      <div class="product-detail__info">
        <h2 class="product__brand">${brand}</h2>
        <h3 class="product__name">${name}</h3>
        <p class="product__price">$${price}</p>
        <p class="product__description">${description}</p>
        <button id="addToCart" class="btn-add-to-cart" data-id="${id}">
          Add to Cart
        </button>
      </div>
    </section>
  `;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // 1. fetch product from dataSource
    this.product = await this.dataSource.findProductById(this.productId);

    if (!this.product) {
      console.error("Product not found for id:", this.productId);
      const main = document.querySelector("main");
      if (main) {
        main.innerHTML = `<p class="error">Sorry, we could not find that product.</p>`;
      }
      return;
    }

    // 2. render product HTML
    this.renderProductDetails();

    // 3. hook up Add to Cart button
    const addToCartButton = document.getElementById("addToCart");
    if (addToCartButton) {
      addToCartButton.addEventListener(
        "click",
        this.addProductToCart.bind(this)
      );
    }
  }

  addProductToCart() {
    let cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
    const main = document.querySelector("main");
    if (!main) return;

    main.innerHTML = productDetailTemplate(this.product);
  }
}
