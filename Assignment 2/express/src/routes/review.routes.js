module.exports = (express, app) => {
    const controller = require("../controllers/review.controller.js");
    const router = express.Router();
  
    // Get all reviews
    router.get('/', controller.getAllReviews);
    // Add a review
    router.post('/add', controller.addReview);
  
    // Get reviews for a product
    router.get('/product/:product_name', controller.getReviewsForProduct);
  
    // Update a review
    router.put('/update/:email/:product_name', controller.updateReview);
  
    // Delete a review
    router.delete('/delete/:email/:product_name', controller.deleteReview);

    // Get reviews for a user
    router.get('/user/:email', controller.getReviewsForUser);
  
    // Add routes to server
    app.use("/api/reviews", router);
  };
  