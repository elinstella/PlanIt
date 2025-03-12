import { Request, Response } from 'express';
import { Task } from '../models/Task';

// Hämta alla uppgifter
export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Serverfel', error });
    }
};

// Skapa en ny uppgift
export const createTask = async (req: Request, res: Response) => {
    try {
        const { title } = req.body;
        const newTask = new Task({ title });
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
        const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: 'Fel vid uppdatering', error });
    }
};

// Ta bort en uppgift
export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Task.findByIdAndDelete(id);
        res.json({ message: 'Uppgift raderad' });
    } catch (error) {
        res.status(400).json({ message: 'Fel vid radering', error });
    }
};
