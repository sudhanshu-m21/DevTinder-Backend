const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://smmishra9793:3cKVtsTpLZjTLIOu@cluster0.e53cf.mongodb.net/devTinder"
  );
};
module.exports = connectDB();
