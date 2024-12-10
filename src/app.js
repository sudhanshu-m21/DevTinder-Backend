const express = require("express");
// require("./config/database");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
app.post("/signup", async (req, res) => {
  // creating new instance of user model
  const user = new User({
    firstName: "Sudhanshu",
    lastName: "Mishra",
    emailID: "abc@gmail.com",
  });
  await user.save();
  res.send("user added");
});

connectDB
  .then(() => {
    console.log("DB connected");
    app.listen(3000, () => {
      console.log("server started");
    });
  })
  .catch((err) => {
    console.error("DB cannot connected");
  });
