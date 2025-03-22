const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("email not valid");
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 4,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender invalid");
        }
      },
      //validate function only run when new user added not on update
      //for that we have to update our patch call and add one more validation
    },
    age: {
      type: Number,
      min: 18,
    },
    about: {
      type: String,
      default: "this is default about of user",
    },
  },
  {
    timestamps: true,
  }
);
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "Dev@hello123", {
    expiresIn: "2h",
  });
  return token;
};
userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordValid;
};
const User = mongoose.model("User", userSchema);
module.exports = User;
