import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true }, // associate class with user
    subject: { type: String, required: true },
    time: { type: String, required: true },
    day: { type: String, required: true },
    instructor: { type: String },
    color: { type: String, default: "#3b82f6" },
  },
  { timestamps: true }
);

export default mongoose.models.Class || mongoose.model("Class", classSchema);
