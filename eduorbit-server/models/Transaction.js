import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true }, // associate transaction with user
    type: { type: String, enum: ["income", "expense"], required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
