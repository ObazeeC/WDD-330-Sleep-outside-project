// File: src/js/CheckoutProcess.mjs

import { getLocalStorage, removeLocalStorage, alertMessage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
    this.dataSource = new ExternalServices();
  }

  init() {
    // load cart items from localStorage
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSummary();
    this.calculateOrderTotal();
  }

  // show subtotal + number of items
  calculateItemSummary() {
    this.itemTotal = 0;
    let count = 0;

    this.list.forEach((item) => {
      this.itemTotal += item.FinalPrice * item.Quantity;
      count += item.Quantity;
    });

    const selector = document.querySelector(this.outputSelector);
    if (!selector) return;

    selector.querySelector("#cart-subtotal").textContent =
      `$${this.itemTotal.toFixed(2)}`;
    selector.querySelector("#cart-items").textContent = count;
  }

  // compute tax, shipping, and total
  calculateOrderTotal() {
    this.tax = this.itemTotal * 0.06;

    const totalItems = this.list.reduce(
      (sum, item) => sum + item.Quantity,
      0
    );

    // simple shipping rule: 10 base + 2 per extra item
    this.shipping = totalItems > 0 ? 10 + 2 * (totalItems - 1) : 0;

    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    this.displayOrderTotals();
  }

  // write totals to the DOM
  displayOrderTotals() {
    const selector = document.querySelector(this.outputSelector);
    if (!selector) return;

    selector.querySelector("#tax").textContent =
      `$${this.tax.toFixed(2)}`;
    selector.querySelector("#shipping").textContent =
      `$${this.shipping.toFixed(2)}`;
    selector.querySelector("#order-total").textContent =
      `$${this.orderTotal.toFixed(2)}`;
  }

  // simplify cart items for the API
  packageItems(items) {
    return items.map((item) => {
      return {
        id: item.Id,
        name: item.NameWithoutBrand,
        price: item.FinalPrice,
        quantity: item.Quantity,
      };
    });
  }

  // convert a form into a plain object
  formDataToJSON(formElement) {
    const formData = new FormData(formElement);
    const convertedJSON = {};
    formData.forEach((value, key) => {
      convertedJSON[key] = value;
    });
    return convertedJSON;
  }

  // main checkout method – called from checkout.js
  async checkout() {
    const form = document.forms[0]; // checkout form

    if (!form) {
      alertMessage("Checkout form not found. Please reload the page.");
      return;
    }

    try {
      // make sure totals are up-to-date
      this.calculateItemSummary();
      this.calculateOrderTotal();

      // build order payload
      const order = this.formDataToJSON(form);
      order.orderDate = new Date().toISOString();
      order.orderTotal = this.orderTotal.toFixed(2);
      order.tax = this.tax.toFixed(2);
      order.shipping = this.shipping;
      order.items = this.packageItems(this.list);

      // send to server (this will throw if server responds with error)
      const response = await this.dataSource.checkout(order);
      console.log("Checkout success:", response);

      // ✅ Happy path: clear cart and go to success page
      removeLocalStorage(this.key);
      window.location.assign("/checkout/success.html");
    } catch (err) {
      console.error("Checkout error:", err);

      let messageText = "There was a problem with your order.";

      // our convertToJson throws: { name: 'servicesError', message: jsonResponse }
      if (err && err.message) {
        if (typeof err.message === "string") {
          messageText = err.message;
        } else if (err.message.message) {
          // common format: { message: "details" }
          messageText = err.message.message;
        } else {
          messageText = JSON.stringify(err.message);
        }
      }

      // 😢 Unhappy path: show friendly alert at top of page
      alertMessage(messageText);
    }
  }
}
