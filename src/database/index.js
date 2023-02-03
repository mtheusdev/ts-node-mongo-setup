const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URI ?? "")
  .then(() => console.log("Connected to mongodb"))
  .catch((error) =>
    console.log("Error when trying to connect to mongodb: ", error)
  );
