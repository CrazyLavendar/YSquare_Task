const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema({
  //
  name: String,
  password: String,
  role: {
    type: String,
    default: "user",
  },
});

module.exports = mongoose.model("User", userSchema);
