import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  priority: String,
  dueDate: String,
  dueTime: String,
  category: String,
  location: String,
  note: String,
  completed: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date }, 
});

export const Task = mongoose.model("Task", taskSchema);
