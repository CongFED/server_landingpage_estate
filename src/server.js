require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const Property = require("./models/Property");

const app = express();

// Middleware
app.use(express.json());

// Connect MongoDB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.post("/property", async (req, res) => {
  try {
    const property = await Property.create(req.body);
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
const PORT = process.env.PORT || 5000;
const propertyRoutes = require("./routes/property.routes");

app.use("/api/properties", propertyRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
