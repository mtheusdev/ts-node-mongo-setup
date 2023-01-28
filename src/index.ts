import * as dotenv from "dotenv";
dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? "./.env.production"
      : "./.env.development",
});

import "express-async-errors";
import express from "express";
import routes from "./routes";
import { middlewareError } from "./middleware/index";
import mongoose from "mongoose";

mongoose.set("strictQuery", true);
mongoose.connect(process.env.ENV_MONGO_URL as string);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(middlewareError);

try {
  app.listen(process.env.ENV_SERVER_PORT, () => {
    console.log(`Server started on port ${process.env.ENV_SERVER_PORT}`);
  });
} catch (error) {
  console.log("Error on start server: ", error);
}
