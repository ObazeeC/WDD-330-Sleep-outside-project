const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export default class ProductData {
  constructor() {}

  // Get a list of products for a specific category from the API
  async getData(category) {
    if (!category) {
      throw new Error('Category is required to fetch products.');
    }
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    // API returns an object with a Result property containing the list
    return data.Result;
  }

  // Find a single product by id from the API
  async findProductById(id) {
    if (!id) {
      throw new Error('Product id is required.');
    }
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
}
