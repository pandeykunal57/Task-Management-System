// src/app/backend/routes/task.routes.js

import express from 'express';
import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} from '../controllers/task.controller.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';
import { logAction } from '../middlewares/audit.middleware.js';

const router = express.Router();

// Create new task
router.post(
  '/',
  authenticateUser,
  createTask,
  logAction('CREATE_TASK', 'User created a new task')
);

// Get all tasks
router.get('/', authenticateUser, getAllTasks);

// Update a task
router.put(
  '/:id',
  authenticateUser,
  updateTask,
  logAction('UPDATE_TASK', 'User updated a task')
);

// Delete a task
router.delete(
  '/:id',
  authenticateUser,
  deleteTask,
  logAction('DELETE_TASK', 'User deleted a task')
);

export default router;
