const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      required: true,
      min: 3,
      max: 60,
    },
    desc: {
      type: String,
      require: true,
      min: 3,
    },
    rating: {
      type: Number,
      require: true,
      min: 0,
      max: 5,
    },
    lat: {
      type: Number,
      require: true,
    },
    long: {
      require: true,
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pin", PinSchema);
