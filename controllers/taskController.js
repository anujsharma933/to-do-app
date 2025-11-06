const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  const task = new Task({ title, description, user: req.user.id });
  await task.save();
  res.status(201).json(task);
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOneAndUpdate(
    { _id: id, user: req.user.id },
    req.body,
    { new: true }
  );
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  await Task.findOneAndDelete({ _id: id, user: req.user.id });
  res.json({ message: 'Task deleted' });
};
