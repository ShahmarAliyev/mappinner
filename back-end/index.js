const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

const pinRouter = require("./routes/pin.router.js");

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Databse Connected");
  })
  .catch((e) => {
    console.log(e);
  });

app.use("/api/pins/", pinRouter);

app.listen(8800, () => {
  console.log("Server Started");
});
