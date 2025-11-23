import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

// load header and footer
loadHeaderFooter();

// get the product id from the query string (?product=XXXX)
const productId = getParam("product");

// set up our data source and details manager
const dataSource = new ExternalServices();
const element = document.querySelector(".product-detail");

// ProductDetails will handle rendering the product information
const product = new ProductDetails(productId, dataSource, element);

// initialize the product detail page
product.init();
