const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

userRouter.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res.status(200).json(user._id);
  } catch (error) {
    res.status(500).json(error);
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    if (!user) {
      res.status(400).json("Wrong Username or Password");
    }
    const validPassword = bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      res.status(400).json("Wrong Username or Password");
    }

    res.status(200).json({ _id: user._id, username: user.username });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = userRouter;
