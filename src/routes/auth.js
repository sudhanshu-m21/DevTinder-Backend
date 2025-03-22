const express = require("express");
const authRouter = express.Router();
const { validateSignUp } = require("../utils/validate");
const User = require("../models/user");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUp(req);

    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    const saveUser = await user.save();
    const token = await saveUser.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    res.json({ message: "user added", data: saveUser });
  } catch (error) {
    res.status(400).send("Error:" + error.message);
  }
});
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) throw new Error("Invalid Credential");
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send(user);
    } else throw new Error("Invalid Credential");
  } catch (error) {
    res.status(400).send("Error:" + error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logged out!!");
});

module.exports = authRouter;
