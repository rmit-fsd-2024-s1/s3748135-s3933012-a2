import axios from "axios";

const API_HOST = "http://localhost:4000";


// Fetch all products
async function fetchAllProducts() {
  const response = await axios.get(API_HOST + "/api/products");
  return response.data;
}

// Fetch a single product by name
async function fetchProductByName(name) {
  const response = await axios.get(API_HOST + `/api/products/${name}`);
  return response.data;
}

// Create a new product
async function createProduct(product) {
  const response = await axios.post(API_HOST + "/api/products", product);
  return response.data;
}


export {
  fetchAllProducts,
  fetchProductByName,
  createProduct
};
