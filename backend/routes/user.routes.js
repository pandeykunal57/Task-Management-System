import express from 'express';
import {
  registerUser,
  loginUser,
  getMe,
} from '../controllers/user.controller.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected route: Get current user profile
router.get('/me', authenticateUser, getMe);

export default router;
