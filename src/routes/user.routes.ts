import express from "express";
import UserController from "@/controllers/UserController";

const userRoutes = express.Router();

userRoutes.post("/", UserController.createUser);
// userRoutes.get("/:id", UserController.getUser);
// userRoutes.get("/", UserController.getUsers);
userRoutes.post("/login", UserController.loginUser);

export default userRoutes;
