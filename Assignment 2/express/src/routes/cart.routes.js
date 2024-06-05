module.exports = (express, app) => {
    const controller = require("../controllers/cart.controller.js");
    const router = express.Router();

    // GET fetch cart items
    router.get('/', controller.getCartItems);

    // POST add a product to the cart
    router.post('/add', controller.addToCart);

    // DELETE remove a product from the cart
    router.delete('/remove/:name', controller.removeFromCart);

    // POST clear the cart
    router.post('/clear', controller.clearCart);

    // Add routes to server
    app.use("/api/cart", router);
};
