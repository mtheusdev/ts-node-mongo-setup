const express = require("express");
const UserRoutes = require("./user.routes");

const routes = express.Router();

routes.use("/user", UserRoutes);

module.exports = routes;
