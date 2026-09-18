

const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();
console.log("JWT SECRET EXISTS:", !!process.env.JWT_SECRET);


const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const tripRoutes = require("./routes/tripRoutes");


const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });


app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
app.get("/", (req, res) => {
  res.send("backend is running");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});