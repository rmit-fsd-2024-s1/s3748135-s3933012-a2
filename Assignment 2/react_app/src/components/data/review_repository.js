import axios from "axios";

const API_HOST = "http://localhost:4000";


// Fetch all reviews
async function fetchAllReviews() {
  const response = await axios.get(API_HOST + "/api/reviews");
  return response.data;
}

// Fetch reviews for a specific product by product name
async function fetchReviewsForProduct(productName) {
  const response = await axios.get(API_HOST + `/api/products/${productName}/reviews`);
  return response.data;
}

// Fetch reviews by a specific user
async function fetchReviewsByUser(email) {
  const response = await axios.get(API_HOST + `/api/users/${email}/reviews`);
  return response.data;
}

// Create a new review
async function createReview(review) {
  const response = await axios.post(API_HOST + "/api/reviews/add", review);
  return response.data;
}

// Update a review
async function updateReview(email, productName, review) {
  const response = await axios.put(API_HOST + `/api/reviews/${email}/${productName}`, review);
  return response.data;
}

// Delete a review
async function deleteReview(email, product_name) {
    const response = await axios.delete(API_HOST + `/api/reviews/delete/${email}/${product_name}`);
    return response.data;
}

export {
  fetchAllReviews,
  fetchReviewsForProduct,
  fetchReviewsByUser,
  createReview,
  updateReview,
  deleteReview
};
