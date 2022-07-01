const pinRouter = require("express").Router();

const Pin = require("../models/Pin");

pinRouter.post("/", async (req, res) => {
  const newPin = new Pin(req.body);

  try {
    const savedPin = await newPin.save();
    res.status(200).json(savedPin);
  } catch (error) {
    res.status(500).json(error);
  }
});

pinRouter.get("/", async (req, res) => {
  try {
    const pins = await Pin.find();
    res.status(200).json(pins);
  } catch (error) {
    res.status(500).json(500);
  }
});

module.exports = pinRouter;
