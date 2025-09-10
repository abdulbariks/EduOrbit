import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true }, // To associate tasks with users
    subject: { type: String, required: true },
    topic: { type: String, required: true },
    priority: { type: String, default: "Medium" },
    deadline: { type: String, required: true },
    day: { type: String },
    time: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
