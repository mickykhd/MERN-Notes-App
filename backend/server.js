const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("express-async-errors");

dotenv.config();

const routes = require("./routes/noteRoute");
const authRoutes = require("./routes/authRoute");
const authenticateUser = require("./middleware/authentication");

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", authenticateUser, routes);

const start = () => {
  try {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log("Connected to MongoDB"))
      .catch((error) => console.log(error.message));
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
