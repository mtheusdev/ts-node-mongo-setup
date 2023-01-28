import express from "express";
import UserController from "@/controllers/UserController";

const userRoutes = express.Router();

userRoutes.get("/", UserController.getUsers);
userRoutes.get("/:id", UserController.getUser);
userRoutes.post("/", UserController.createUser);
userRoutes.delete("/:id", UserController.deleteUser);
userRoutes.put("/:id", UserController.updateUser);

export default userRoutes;
