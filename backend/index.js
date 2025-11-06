import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB Connected"))
  .catch((err) => console.log(" DB Connection Error:", err));

app.get("/", (req, res) => {
  res.send(" Todo App Backend Running!");
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
