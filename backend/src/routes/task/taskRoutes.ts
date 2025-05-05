import express from 'express';
import {
  getTasks,
  getTrashedTasks,
  createTask,
  updateTask,
  deleteTask,
  restoreTask,
  deleteTaskPermanently,
  emptyTrash, 
} from '../../controllers/task/taskController';

const router = express.Router();

// Route to get all active (non-deleted) tasks
router.get('/', getTasks);

// Route to get all tasks that are in the trash (soft deleted)
router.get('/trash', getTrashedTasks); 

// Route to create a new task
router.post('/', createTask);

// Route to update an existing task by its ID
router.put('/:id', updateTask);

// Route to move a task to the trash (soft delete) by its ID
router.delete('/:id', deleteTask);

// Route to restore a task from the trash by its ID
router.put('/restore/:id', restoreTask);

// Route to permanently delete a task from the database by its ID
router.delete('/permanent/:id', deleteTaskPermanently);

// Route to empty the trash (delete all tasks that are marked as deleted)
router.delete('/trash/empty', emptyTrash);

export default router;
