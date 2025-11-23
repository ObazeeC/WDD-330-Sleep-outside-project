// File: src/js/checkout.js
import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

// use the same key you use for the cart
const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
myCheckout.init();

// Listen for the button click and add validation
document
  .querySelector("#checkoutSubmit")
  .addEventListener("click", (e) => {
    e.preventDefault(); // stop the form from doing a normal GET submit

    const myForm = document.forms[0];

    // Run HTML5 validation
    const isValid = myForm.checkValidity();
    myForm.reportValidity();

    if (isValid) {
      // call our CheckoutProcess.checkout with the form
      myCheckout.checkout(myForm);
    }
  });
