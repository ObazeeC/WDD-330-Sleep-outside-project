const baseURL = import.meta.env.VITE_SERVER_URL;

// Convert the response body to JSON first, then decide what to do.
// If the response is NOT ok, throw a custom error object so the caller
// (CheckoutProcess) can show a useful message to the user.
async function convertToJson(res) {
  // Parse the body once (whether ok or not)
  const jsonResponse = await res.json();

  if (res.ok) {
    // Happy path: just return the parsed JSON
    return jsonResponse;
  }

  // Unhappy path: send the body back in a custom error object
  // so the caller can read jsonResponse.message, errors, etc.
  throw {
    name: "servicesError",
    message: jsonResponse,
  };
}

export default class ExternalServices {
  constructor() {
    // If you ever need to store category or other info, you can use
    // properties here. For now we don't need anything.
    // this.category = category;
    // this.path = `../public/json/${this.category}.json`;
  }

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    // API returns an object with Result array
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    // API returns an object with Result array, grab first element
    return data.Result;
  }

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    // Let convertToJson either return the success JSON
    // or throw { name: 'servicesError', message: jsonResponse }
    const response = await fetch(`${baseURL}checkout/`, options);
    return convertToJson(response);
  }
}
