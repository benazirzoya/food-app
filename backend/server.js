const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Custom CORS middleware to guarantee preflight options requests pass cleanly from any local IP
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

const localDb = require("./config/localDb");

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");
  localDb.useLocalFallback = false;
})
.catch((err) => {
  console.log("MongoDB Atlas selection failed. Whitelist issue detected! Falling back to local file DB ⚙️");
  localDb.useLocalFallback = true;
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/orders", require("./routes/orderRoutes"));

// Listen on all network interfaces to resolve local IP connectivity (e.g. mobile testing)
app.listen(5000, "0.0.0.0", () => {
  console.log("Server Running on port 5000");
});