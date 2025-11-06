import ProductData from './ProductData.mjs';
import { getParam } from './utils.mjs';
import ProductDetails from './ProductDetails.mjs';

const dataSource = new ProductData('tents');
const productId = getParam('product')

const product = new ProductDetails(productId,dataSource);
product.init();

//async function addToCartHandler(e) {
 // e?.preventDefault?.();
 // const id = e?.target?.dataset?.id;
 // if (!id) return console.warn('Missing data-id on Add to Cart button');

//   const product = await dataSource.findProductById(id);
//  if (!product) return console.warn('No product found for id:', id);

//   addProductToCart(product);
// }

// document
 //  .getElementById('addToCart')
 //  ?.addEventListener('click', addToCartHandler);

