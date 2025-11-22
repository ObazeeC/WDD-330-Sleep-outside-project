import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

// data source for tents
const dataSource = new ProductData('tents');

// the <ul class="product-list"> in index.html
const listElement = document.querySelector('.product-list');

// create and initialize the product list
const productList = new ProductList('tents', dataSource, listElement);
productList.init();
