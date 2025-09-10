import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import classRoutes from "./routes/classes.js";
import transactionRoutes from "./routes/transactions.js";
import taskRoutes from "./routes/tasks.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/classes", classRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/tasks", taskRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));
