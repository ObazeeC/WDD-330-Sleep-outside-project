import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

console.log("product-listing.js loaded");

loadHeaderFooter();

const category = getParam("category");
console.log("category from URL:", category);

const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
console.log("list element found?", !!element);

const listing = new ProductList(category, dataSource, element);
console.log("listing object created:", listing);

listing.init();
console.log("listing.init() called");
