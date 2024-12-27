const express = require("express");

const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const { validateEditProfileData } = require("../utils/validate");

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("Error:" + error.message);
  }
});
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    validateEditProfileData(req);
    if (!validateEditProfileData(req))
      throw new Error("Something you are edithing which is not allowed");

    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });
    await loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName}, your profile updated succesfully`,
      data: loggedInUser,
    });
  } catch (error) {
    res.status(400).send("Error: " + error);
  }
});

module.exports = profileRouter;
