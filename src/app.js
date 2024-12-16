const express = require("express");
// require("./config/database");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
app.use(express.json());
app.post("/signup", async (req, res) => {
  // creating new instance of user model
  // console.log(req.body);
  const user = new User(req.body);
  try {
    await user.save();
    res.send("user added");
  } catch (error) {
    res.status(400).send(error.message);
  }
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
