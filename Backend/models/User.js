const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  srNo: {
    type: Number,
    required: true,
    unique: true
  },
  Categoty: String,
  Amount: Number,
  Date: Date
});

module.exports = mongoose.model("User", userSchema);
