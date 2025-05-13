import express from 'express';
import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} from '../controllers/task.controller.js';
import { authenticateUser } from '../middlewares/authMiddleware.js'; // ✅ Use correct import for authentication
import { logAction } from '../middlewares/audit.middleware.js'; // ✅ Import the audit log middleware

const router = express.Router();

// @route   POST /api/tasks
// @desc    Create new task
// @access  Private
router.post(
  '/',
  authenticateUser, // ✅ Authentication middleware
  createTask, // ✅ Task creation logic
  logAction('CREATE_TASK', 'User created a new task') // ✅ Log after creation
);

// @route   GET /api/tasks
// @desc    Get all tasks for the user
// @access  Private
router.get('/', authenticateUser, getAllTasks); // ✅ Authentication middleware, no logging needed

// @route   PUT /api/tasks/:id
// @desc    Update a task
// @access  Private
router.put(
  '/:id',
  authenticateUser, // ✅ Authentication middleware
  updateTask, // ✅ Task update logic
  logAction('UPDATE_TASK', 'User updated a task') // ✅ Log after update
);

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete(
  '/:id',
  authenticateUser, // ✅ Authentication middleware
  deleteTask, // ✅ Task deletion logic
  logAction('DELETE_TASK', 'User deleted a task') // ✅ Log after deletion
);

export default router;
