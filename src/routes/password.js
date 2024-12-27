const express = require("express");
const passwordRouter = express.Router();
const { isValidObjectId } = require("mongoose");
const { userAuth } = require("../middleware/auth");
const validator = require("validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");

passwordRouter.patch("/profile/changePassword", userAuth, async (req, res) => {
  try {
    const { emailId, password, newPassword } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) throw new Error("Invalid Credential");
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) throw new Error("Invalid credential");
    if (validator.isStrongPassword(newPassword))
      throw new Error("Enter a strong password");
    const passwordHash = await bcrypt.hash(newPassword, 10);
    user.password = passwordHash;
    await user.save();
    res.send(`${user.firstName}, your password is updated`);
  } catch (error) {
    console.log("Error: " + error);
  }
});

module.exports = passwordRouter;
