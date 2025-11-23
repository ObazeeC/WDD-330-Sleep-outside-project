// src/js/ProductDetails.mjs
import ExternalServices from "./ExternalServices.mjs";
import { getLocalStorage, setLocalStorage, alertMessage } from "./utils.mjs";

const cartKey = "so-cart";

export default class ProductDetails {
  constructor(productId, dataSource, element) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.element = element;
    this.product = null;
  }

  async init() {
    // 1. get product from API
    this.product = await this.dataSource.findProductById(this.productId);

    // 2. render it
    this.renderProductDetails();

    // 3. hook up add-to-cart button
    const addToCartButton = document.querySelector("#add-to-cart");
    if (addToCartButton) {
      addToCartButton.addEventListener("click", () => this.addToCart());
    }
  }

  renderProductDetails() {
    const p = this.product;

    // BRAND: sometimes an object, sometimes a string
    let brandText = "";
    if (p.Brand) {
      if (typeof p.Brand === "string") {
        brandText = p.Brand;
      } else if (typeof p.Brand.Name === "string") {
        brandText = p.Brand.Name;
      }
    } else if (p.BrandName) {
      brandText = p.BrandName;
    }

    // COLOR: first color name, if it exists
    let colorText = "";
    if (p.Colors && p.Colors.length > 0) {
      colorText = p.Colors[0].ColorName || "";
    }

    document.querySelector("#p-brand").textContent = brandText || p.NameWithoutBrand;
    document.querySelector("#p-name").textContent = p.NameWithoutBrand;
    document.querySelector("#p-color").textContent = colorText;
    document.querySelector("#p-description").innerHTML = p.DescriptionHtmlSimple;
    document.querySelector("#p-price").textContent = `$${p.FinalPrice}`;
    const img = document.querySelector("#p-image");
    img.src = p.Images.PrimaryMedium;
    img.alt = p.Name;
  }

  addToCart() {
    // read current cart
    const currentCart = getLocalStorage(cartKey) || [];

    // push a *copy* with Quantity = 1
    const productToStore = { ...this.product, Quantity: 1 };
    currentCart.push(productToStore);

    // save back to LS
    setLocalStorage(cartKey, currentCart);

    // quick dev check
    console.log("Cart now has", currentCart.length, "items");

    // show alert
    alertMessage("Item added to cart!", false);
  }
}
