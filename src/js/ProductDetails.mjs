import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource, element) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.element = element;
    this.product = null;
  }

  async init() {
    // get the product data from the server
    this.product = await this.dataSource.findProductById(this.productId);

    if (!this.product) return;

    // render details to the page
    this.renderProductDetails();

    // wire up the Add to Cart button
    const addToCartButton = document.querySelector("#add-to-cart");
    addToCartButton.dataset.id = this.product.Id;
    addToCartButton.addEventListener("click", () => this.addToCart());
  }

  renderProductDetails() {
    const p = this.product;

    // BRAND: sometimes an object. Safely convert to a string.
    let brandText = "";
    if (p.Brand) {
      // if Brand has a Name property, use it; otherwise fall back to string
      brandText = p.Brand.Name ?? String(p.Brand);
    }

    document.querySelector("#p-brand").textContent = brandText;

    // NAME
    document.querySelector("#p-name").textContent =
      p.NameWithoutBrand ?? p.Name ?? "";

    // COLOR: to avoid [object Object], keep it simple / optional
    let colorText = "";
    if (Array.isArray(p.Colors)) {
      colorText = p.Colors
        .map((c) => c.ColorName ?? String(c))
        .join(", ");
    } else if (p.Colors) {
      colorText = String(p.Colors);
    }
    document.querySelector("#p-color").textContent = colorText;

    // DESCRIPTION: this is HTML, so we use innerHTML instead of textContent
    const description =
      p.DescriptionHtmlSimple ?? p.Description ?? "";
    document.querySelector("#p-description").innerHTML = description;

    // PRICE
    document.querySelector("#p-price").textContent = `$${p.FinalPrice}`;

    // IMAGE
    const img = document.querySelector("#p-image");
    img.src = p.Images.PrimaryMedium;
    img.alt = p.Name;
  }

  addToCart() {
    const cartKey = "so-cart";
    const currentCart = getLocalStorage(cartKey) || [];
    currentCart.push(this.product);
    setLocalStorage(cartKey, currentCart);
  }
}
