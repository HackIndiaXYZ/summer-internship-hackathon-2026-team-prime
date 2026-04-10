require("dotenv").config(); // load .env first

const express = require("express");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const patientRoutes = require("./routes/patient");
const recordRoutes = require("./routes/record");

const app = express();

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => res.render("home"));
app.get("/dashboard", (req, res) => res.render("dashboard"));
app.get("/about", (req, res) => res.render("about"));

app.use("/auth", authRoutes);
app.use("/patient", patientRoutes);
app.use("/record", recordRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));