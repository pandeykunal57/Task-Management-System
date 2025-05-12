import express from 'express';
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
} from '../controllers/task.controller.js';

import { authenticateUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

// All routes below require the user to be authenticated
router.use(authenticateUser);

/**
 * @route   POST /api/tasks
 * @desc    Create a new task
 */
router.post('/', createTask);

/**
 * @route   GET /api/tasks
 * @desc    Get all tasks for current user
 */
router.get('/', getAllTasks);

/**
 * @route   GET /api/tasks/:id
 * @desc    Get a specific task by ID
 */
router.get('/:id', getTaskById);

/**
 * @route   PUT /api/tasks/:id
 * @desc    Update a specific task
 */
router.put('/:id', updateTask);

/**
 * @route   DELETE /api/tasks/:id
 * @desc    Delete a specific task
 */
router.delete('/:id', deleteTask);

export default router;
