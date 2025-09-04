import React, { useState } from "react";

const StudyPlanner = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    subject: "",
    topic: "",
    priority: "Medium",
    deadline: "",
    day: "",
    time: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!form.subject || !form.topic || !form.deadline) return;
    setTasks([...tasks, { ...form, id: Date.now() }]);
    setForm({
      subject: "",
      topic: "",
      priority: "Medium",
      deadline: "",
      day: "",
      time: "",
    });
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
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
                key={task.id}
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
                  onClick={() => deleteTask(task.id)}
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
