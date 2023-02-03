const dotenv = require("dotenv");

dotenv.config({
  path: "./.env",
});

console.log(process.env.MONGO_URI);

require("express-async-errors");
const express = require("express");
const routes = require("./routes");
const { middlewareError } = require("./middleware/index");
// require("./database");

const app = express();

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(middlewareError);

module.exports = app;
