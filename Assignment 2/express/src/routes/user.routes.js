module.exports = (express, app) => {
  const controller = require("../controllers/user.controller.js");
  const router = express.Router();

  // Select all users.
  router.get("/", controller.all);

  // Select a single user with id.
  router.get("/select/:id", controller.one);

  // Select one user from the database if username and password are a match.
  router.get("/login", controller.login);

  // Create a new user.
  router.post("/", controller.create);

  // Update user's name and/or password.
  router.put("/:email", controller.update);

  // Delete a user by email.
  router.delete("/:email", controller.deleteUser);

  // Add routes to server.
  app.use("/api/users", router);
};
