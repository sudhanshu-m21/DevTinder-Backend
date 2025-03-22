const express = require("express");
require("dotenv").config();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const changePasswordRouter = require("./routes/password");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", changePasswordRouter);
app.use("/", userRouter);
connectDB
  .then(() => {
    console.log("DB connected");
    app.listen(process.env.PORT, () => {
      console.log("server started");
    });
  })
  .catch((err) => {
    console.error("DB cannot connected");
  });
