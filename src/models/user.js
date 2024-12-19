const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const validator = require("validator");
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
      default: "this is default aabout of user",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
