import { Request, Response } from 'express';
import { Task } from '../../models/task/Task';

// Hämta alla aktiva uppgifter
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({ deleted: false });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Serverfel', error });
  }
};

// Hämta uppgifter i papperskorgen
export const getTrashedTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({ deleted: true });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Serverfel vid hämtning av papperskorg', error });
  }
};

// Skapa en ny uppgift
export const createTask = async (req: Request, res: Response) => {
  try {


    console.log("📨 Mottaget från frontend:", req.body); // 👈 Lägg till här

    const {
      title,
      description,
      priority,
      dueDate,
      dueTime,
      category,
      location,
      note, // ✅ Lagt till notering
    } = req.body;

    const newTask = new Task({
      title,
      description,
      priority,
      dueDate,
      dueTime,
      category,
      location,
      note, // ✅ Sparas nu
    });

    console.log("🧾 Uppgift som sparas:", newTask); // 👈 Lägg till här


    await newTask.save();
    res.json(newTask);
  } catch (error) {
    res.status(400).json({ message: 'Fel vid skapande av uppgift', error });
  }
};

// Uppdatera en uppgift
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: 'Fel vid uppdatering', error });
  }
};

// Flytta till papperskorg (soft delete)
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndUpdate(id, {
      deleted: true,
      deletedAt: new Date(),
    });
    res.json({ message: 'Flyttad till papperskorgen' });
  } catch (error) {
    res.status(400).json({ message: 'Fel vid radering', error });
  }
};

// Återställ från papperskorgen
export const restoreTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const restored = await Task.findByIdAndUpdate(id, { deleted: false }, { new: true });
    res.json(restored);
  } catch (error) {
    res.status(400).json({ message: 'Kunde inte återställa uppgift', error });
  }
};

// Permanent radera från DB
export const deleteTaskPermanently = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: 'Uppgift permanent borttagen' });
  } catch (error) {
    res.status(400).json({ message: 'Kunde inte ta bort uppgiften permanent', error });
  }
};

// Töm hela papperskorgen
export const emptyTrash = async (_: Request, res: Response) => {
  try {
    await Task.deleteMany({ deleted: true });
    res.json({ message: 'Papperskorgen tömd' });
  } catch (error) {
    res.status(500).json({ message: 'Kunde inte tömma papperskorgen', error });
  }
};
