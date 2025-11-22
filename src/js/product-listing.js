import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();

const categoryParam = getParam('category');
// default to tents if no category provided
const category = categoryParam || 'tents';

// create an instance of the ProductData class.
const dataSource = new ProductData();
// then get the element you want the product list to render in
const listElement = document.querySelector('.product-list');
// then create an instance of the ProductList class and send it the correct information.
const myList = new ProductList(category, dataSource, listElement);
// finally call the init method to show the products
myList.init();

// Update the title to include the category
const titleElement = document.getElementById('categoryTitle');
if (titleElement && category) {
  const label = category.replace('-', ' ');
  const pretty =
    label.charAt(0).toUpperCase() + label.slice(1);
  titleElement.textContent = `Top Products: ${pretty}`;
}
