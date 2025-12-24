const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://npcitdev_db_user:wFrl9HofmsmMT94O@cluster0.qk7r4wp.mongodb.net/?appName=Cluster0", {
      autoIndex: true,
    });

    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
