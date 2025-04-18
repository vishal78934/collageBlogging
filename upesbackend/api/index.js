const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;

// Load environment variables early
dotenv.config();

// Routes
const authRoute = require("../routes/auth");
const userRoute = require("../routes/users");
const postRoute = require("../routes/posts");
const commentRoute = require("../routes/comments");

// Connect to database before starting server
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Database is connected successfully!");
  } catch (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1); // stop server if DB fails
  }
};

// Middlewares
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.get("/test", (req, res) => {
  res.send("backend succesfully working brother");
});

// API Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);

// Image Upload

// Start the server only after DB is connected
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 App is running on port ${PORT}`);
  });
});
