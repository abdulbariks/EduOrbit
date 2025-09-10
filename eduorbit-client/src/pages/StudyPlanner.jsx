import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

const StudyPlanner = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    subject: "",
    topic: "",
    priority: "Medium",
    deadline: "",
    day: "",
    time: "",
  });

  // Backend API URL
  const API_URL = "http://localhost:5000/api/tasks";

  // Fetch tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get(`${API_URL}?email=${user.email}`);
        setTasks(data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
    if (user?.email) fetchTasks();
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!form.subject || !form.topic || !form.deadline) return;

    try {
      const { data } = await axios.post(API_URL, {
        ...form,
        userEmail: user.email,
      });
      setTasks([data, ...tasks]); // add new task to the top
      setForm({
        subject: "",
        topic: "",
        priority: "Medium",
        deadline: "",
        day: "",
        time: "",
      });
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const priorityColors = {
    High: "bg-red-100 text-red-700 border border-red-400",
    Medium: "bg-yellow-100 text-yellow-700 border border-yellow-400",
    Low: "bg-green-100 text-green-700 border border-green-400",
  };

  return (
    <div className="w-11/12 mx-auto p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-4xl font-bold text-center mb-4">📚 Study Planner</h2>

      {/* Add Task Form */}
      <form
        onSubmit={addTask}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
      >
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="topic"
          placeholder="Topic"
          value={form.topic}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="day"
          placeholder="Day (e.g. Monday)"
          value={form.day}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          ➕ Add Task
        </button>
      </form>

      {/* Task List */}
      <div>
        {tasks.length === 0 ? (
          <p className="text-4xl text-center text-gray-600">
            No study tasks added yet.
          </p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task._id}
                className={`p-4 rounded-lg flex justify-between items-center shadow ${
                  priorityColors[task.priority]
                }`}
              >
                <div>
                  <h3 className="font-bold text-lg">
                    {task.subject} – {task.topic}
                  </h3>
                  <p className="text-sm">
                    📅 {task.day || "Any day"} | 🕒 {task.time || "Any time"}
                  </p>
                  <p className="text-sm">⏳ Deadline: {task.deadline}</p>
                  <p className="text-sm">🔥 Priority: {task.priority}</p>
                </div>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StudyPlanner;
