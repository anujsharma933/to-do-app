import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController.js';

router.get('/', auth, getTasks);
router.post('/', auth, createTask);
router.put('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);

export default router;
