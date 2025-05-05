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

router.get('/', getTasks);
router.get('/trash', getTrashedTasks); 
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.put('/restore/:id', restoreTask);
router.delete('/permanent/:id', deleteTaskPermanently);
router.delete('/trash/empty', emptyTrash);


export default router;
