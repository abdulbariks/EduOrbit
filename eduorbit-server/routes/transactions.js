import express from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();

// GET all transactions for a user
router.get("/", async (req, res) => {
  const userEmail = req.query.email;
  if (!userEmail) return res.status(400).json({ message: "Email required" });

  try {
    const transactions = await Transaction.find({ userEmail });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE a new transaction
router.post("/", async (req, res) => {
  const { userEmail, type, description, amount } = req.body;
  if (!userEmail) return res.status(400).json({ message: "Email required" });

  try {
    const newTransaction = new Transaction({
      userEmail,
      type,
      description,
      amount,
    });
    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a transaction
router.put("/:id", async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTransaction)
      return res.status(404).json({ message: "Transaction not found" });
    res.json(updatedTransaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a transaction
router.delete("/:id", async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(
      req.params.id
    );
    if (!deletedTransaction)
      return res.status(404).json({ message: "Transaction not found" });
    res.json({ message: "Transaction deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
