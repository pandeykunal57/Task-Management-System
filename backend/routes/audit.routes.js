// backend/routes/audit.routes.js

import express from 'express';
import AuditLog from '../models/auditLog.model.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @route   GET /api/audit
 * @desc    Get all audit logs (protected - for admins or internal use)
 * @access  Private
 */
router.get('/', authenticateUser, async (req, res) => {
  try {
    const logs = await AuditLog.find()
      .populate('user', 'name email') // Optionally include user details
      .sort({ createdAt: -1 }); // Newest logs first

    res.status(200).json(logs);
  } catch (error) {
    console.error('Error fetching audit logs:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
