const express = require("express");
const UserController = require("../controllers/UserController");
const { authMiddleware } = require("../middleware/index");

const userRoutes = express.Router();

userRoutes.post("/", authMiddleware, UserController.createUser);
// userRoutes.get("/:id", middlewareAuth, UserController.getUser);
// userRoutes.get("/", middlewareAuth, UserController.getUsers);
// userRoutes.post("/login", UserController.loginUser);
userRoutes.get("/test", UserController.test);

module.exports = userRoutes;
