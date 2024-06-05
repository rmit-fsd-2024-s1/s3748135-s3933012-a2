module.exports = (express, app) => {
    const controller = require("../controllers/product.controller.js");
    const router = express.Router();

    // GET all products
    router.get('/', controller.allProducts);

    // GET a single product by name
    router.get('/products/:name', controller.oneProduct);

    // POST create a new product
    router.post('/', controller.createProduct);

    // Add routes to server.
    app.use("/api/products", router);

}