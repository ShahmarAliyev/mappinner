const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const cors = require("cors");
const pinRouter = require("./routes/pin.router.js");
const userRouter = require("./routes/user.router.js");

app.use(express.json());
app.use(cors());
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Databse Connected");
  })
  .catch((e) => {
    console.log(e);
  });

app.use("/api/pins/", pinRouter);
app.use("/api/users/", userRouter);

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

app.listen(process.env.PORT || 8800, () => {
  console.log("Server Started");
});
