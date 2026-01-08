const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/cart");
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("DB Connection Error:", error);
  }
};

module.exports = connectDB;
