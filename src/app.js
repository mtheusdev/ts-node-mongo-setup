const dotenv = require("dotenv");

if (process.env.STAGE !== "cloud") {
  dotenv.config({
    path: "./.env",
  });
}

require("express-async-errors");
const express = require("express");
const routes = require("./routes");
const { errorMiddleware } = require("./middleware/index");
require("./database");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(errorMiddleware);

module.exports = app;
