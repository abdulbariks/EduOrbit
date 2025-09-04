import React, { useState } from "react";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const ClassScheduleTracker = () => {
  const [classes, setClasses] = useState([]);
  const [formData, setFormData] = useState({
    subject: "",
    time: "",
    day: "Monday",
    instructor: "",
    color: "#3b82f6", // default blue
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updated = [...classes];
      updated[editingIndex] = formData;
      setClasses(updated);
      setEditingIndex(null);
    } else {
      setClasses([...classes, formData]);
    }
    setFormData({
      subject: "",
      time: "",
      day: "Monday",
      instructor: "",
      color: "#3b82f6",
    });
  };

  const handleEdit = (index) => {
    setFormData(classes[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    setClasses(classes.filter((_, i) => i !== index));
  };

  return (
    <div className="w-11/12 mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-4xl text-center font-bold mb-4">
        📅 Class Schedule Tracker
      </h2>

      {/* Form */}
      <form
        onSubmit={handleAddOrUpdate}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
      >
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <select
          name="day"
          value={formData.day}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          {daysOfWeek.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="instructor"
          placeholder="Instructor"
          value={formData.instructor}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="color"
          name="color"
          value={formData.color}
          onChange={handleChange}
          className="p-2 border rounded h-10"
        />
        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {editingIndex !== null ? "Update Class" : "Add Class"}
        </button>
      </form>

      {/* List */}
      <div>
        {classes.length === 0 ? (
          <p className="text-gray-500 text-center">No classes added yet.</p>
        ) : (
          <ul className="space-y-3">
            {classes.map((cls, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-3 rounded-lg shadow"
                style={{ borderLeft: `8px solid ${cls.color}` }}
              >
                <div>
                  <h3 className="font-bold text-lg">{cls.subject}</h3>
                  <p className="text-sm text-gray-600">
                    {cls.day} • {cls.time} • {cls.instructor}
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ClassScheduleTracker;
