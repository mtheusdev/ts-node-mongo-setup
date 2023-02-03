const express = require("express");
const UserController = require("../controllers/UserController");

const userRoutes = express.Router();

// userRoutes.post("/", UserController.createUser);
// userRoutes.get("/:id", UserController.getUser);
// userRoutes.get("/", UserController.getUsers);
// userRoutes.post("/login", UserController.loginUser);
userRoutes.get("/hello", UserController.hello);

module.exports = userRoutes;
