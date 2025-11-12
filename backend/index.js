import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("✅ Todo App Backend Running Publicly!");
});


app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 Server is live on PORT ${PORT}`)
);
