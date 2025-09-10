import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// GET all tasks for a user
router.get("/", async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ message: "Email is required" });
  try {
    const tasks = await Task.find({ userEmail: email }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new task
router.post("/", async (req, res) => {
  const { userEmail, subject, topic, priority, deadline, day, time } = req.body;
  if (!userEmail || !subject || !topic || !deadline) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const task = new Task({
      userEmail,
      subject,
      topic,
      priority,
      deadline,
      day,
      time,
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a task by ID
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Optional: UPDATE a task
router.put("/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
