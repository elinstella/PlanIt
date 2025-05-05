import { Request, Response } from 'express';
import { Task } from '../../models/task/Task';

// Get all active tasks
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({ deleted: false });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get tasks in the trash (soft-deleted)
export const getTrashedTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({ deleted: true });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching trash', error });
  }
};

// Create a new task
export const createTask = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      priority,
      dueDate,
      dueTime,
      category,
      location,
      note, 
    } = req.body;

    const newTask = new Task({
      title,
      description,
      priority,
      dueDate,
      dueTime,
      category,
      location,
      note, 
    });


    await newTask.save();
    res.json(newTask);
  } catch (error) {
    res.status(400).json({ message: 'Error creating task', error });
  }
};

// Update a task
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: 'Error updating task', error });
  }
};

// Move task to trash (soft delete)
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndUpdate(id, {
      deleted: true,
      deletedAt: new Date(),
    });
    res.json({ message: 'Moved to trash' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting task', error });
  }
};

// Restore task from trash
export const restoreTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const restored = await Task.findByIdAndUpdate(id, { deleted: false }, { new: true });
    res.json(restored);
  } catch (error) {
    res.status(400).json({ message: 'Could not restore task', error });
  }
};

// Permanently delete task from DB
export const deleteTaskPermanently = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: 'Task permanently deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Could not permanently delete task', error });
  }
};

// Empty the entire trash
export const emptyTrash = async (_: Request, res: Response) => {
  try {
    await Task.deleteMany({ deleted: true });
    res.json({ message: 'Trash emptied' });
  } catch (error) {
    res.status(500).json({ message: 'Could not empty the trash', error });
  }
};
