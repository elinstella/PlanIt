import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    priority: { type: String, default: "Medium" },
    dueDate: { type: String },
    dueTime: { type: String },
    category: { type: String, default: "General" },
    location: { type: String }, // 👈 Lägg till detta
    completed: { type: Boolean, default: false } // 👈 Redan korrekt
  },
  { timestamps: true }
);

export const Task = mongoose.model('Task', TaskSchema);
