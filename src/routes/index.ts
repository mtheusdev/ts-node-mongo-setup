import express from "express";
import UserRoutes from "@/routes/user.routes";

const routes = express.Router();

routes.use("/user", UserRoutes);

export default routes;
