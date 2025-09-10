import express from "express";
import Class from "../models/Class.js";

const router = express.Router();

// GET all classes for a user
router.get("/", async (req, res) => {
  const userEmail = req.query.email;
  if (!userEmail) return res.status(400).json({ message: "Email required" });

  try {
    const classes = await Class.find({ userEmail });
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE a new class
router.post("/", async (req, res) => {
  const { userEmail, subject, time, day, instructor, color } = req.body;
  if (!userEmail) return res.status(400).json({ message: "Email required" });

  const newClass = new Class({
    userEmail,
    subject,
    time,
    day,
    instructor,
    color,
  });
  try {
    const savedClass = await newClass.save();
    res.status(201).json(savedClass);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a class
router.put("/:id", async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedClass)
      return res.status(404).json({ message: "Class not found" });
    res.json(updatedClass);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a class
router.delete("/:id", async (req, res) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    if (!deletedClass)
      return res.status(404).json({ message: "Class not found" });
    res.json({ message: "Class deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
