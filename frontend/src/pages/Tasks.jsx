import React, { useState, useEffect } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [editing, setEditing] = useState(null);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.put(`/tasks/${editing._id}`, form);
        setEditing(null);
      } else {
        await api.post("/tasks", form);
      }
      setForm({ title: "", description: "" });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const handleToggle = async (task) => {
    const newStatus = task.status === "pending" ? "complete" : "pending";
    await api.put(`/tasks/${task._id}`, { status: newStatus });
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <div className="flex justify-between items-center mb-6">
       <h1 className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 drop-shadow-md">
  📝 My Tasks
</h1>
        <button onClick={logout} className="btn btn-secondary">Logout</button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-5 rounded-xl shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-3">
          {editing ? "✏️ Edit Task" : "➕ Add New Task"}
        </h2>
        <div className="space-y-2">
          <input
            className="input"
            placeholder="Task Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <textarea
            className="input"
            placeholder="Task Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <button className="btn btn-primary w-full">
            {editing ? "Update Task" : "Add Task"}
          </button>
        </div>
      </form>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-gray-600 text-center">No tasks yet. Add your first one!</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className={`p-4 rounded-xl shadow-md bg-white flex justify-between items-start border-l-4 ${
                task.status === "complete" ? "border-green-500" : "border-yellow-400"
              }`}
            >
              <div>
                <h3
                  className={`text-lg font-semibold ${
                    task.status === "complete" ? "line-through text-gray-500" : ""
                  }`}
                >
                  {task.title}
                </h3>
                <p className="text-gray-600 text-sm">{task.description}</p>
                <p className="text-xs mt-1">
                  Status:{" "}
                  <span
                    className={`font-medium ${
                      task.status === "complete" ? "text-green-600" : "text-yellow-600"
                    }`}
                  >
                    {task.status}
                  </span>
                </p>
              </div>

              <div className="flex gap-2 mt-1">
                <button onClick={() => handleToggle(task)} className="btn btn-secondary">
                  Toggle
                </button>
                <button
                  onClick={() => {
                    setEditing(task);
                    setForm({ title: task.title, description: task.description });
                  }}
                  className="btn btn-primary"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="btn bg-red-500 text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
