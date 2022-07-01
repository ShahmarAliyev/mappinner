const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Databse Connected");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(8800, () => {
  4;
  console.log("Server Started");
});
