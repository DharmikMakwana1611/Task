const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use("/users", userRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
