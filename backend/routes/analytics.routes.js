// backend/routes/analytics.routes.js

import express from 'express';
import Task from '../models/task.model.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @route   GET /api/analytics
 * @desc    Get basic task analytics for logged-in user
 * @access  Private
 */
router.get('/', authenticateUser, async (req, res) => {
  try {
    const userId = req.user._id;

    // Total tasks created by user
    const createdCount = await Task.countDocuments({ createdBy: userId });

    // Assigned to user
    const assignedCount = await Task.countDocuments({ assignedTo: userId });

    // Completed tasks (created or assigned)
    const completedCount = await Task.countDocuments({
      $or: [{ createdBy: userId }, { assignedTo: userId }],
      status: 'completed',
    });

    // Overdue tasks
    const today = new Date();
    const overdueCount = await Task.countDocuments({
      $or: [{ createdBy: userId }, { assignedTo: userId }],
      dueDate: { $lt: today },
      status: { $ne: 'completed' },
    });

    res.status(200).json({
      createdCount,
      assignedCount,
      completedCount,
      overdueCount,
    });
  } catch (err) {
    console.error('Error fetching analytics:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
