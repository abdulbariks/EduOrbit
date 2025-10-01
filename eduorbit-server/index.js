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
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://illustrious-brioche-ffeb97.netlify.app",
    ], // your frontend URLs
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running 🚀" });
});
app.use("/api/classes", classRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/tasks", taskRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));

export default app;
