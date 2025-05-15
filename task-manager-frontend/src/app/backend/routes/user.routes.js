import express from 'express';
import {
  registerUser,
  loginUser,
  getMe,
  getAllUsers,
  deleteUser,
} from '../controllers/user.controller.js';
import { authenticateUser, authorizeRoles } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/me', authenticateUser, getMe);

// Admin-only routes
router.get('/', authenticateUser, authorizeRoles('admin'), getAllUsers);
router.delete('/:id', authenticateUser, authorizeRoles('admin'), deleteUser);

export default router;
