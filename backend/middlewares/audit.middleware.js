// backend/middlewares/audit.middleware.js

import AuditLog from '../models/auditLog.model.js';

/**
 * Middleware to log user actions in the database
 * 
 * @param {string} action - The type of action performed (e.g., CREATE_TASK)
 * @param {string} details - Optional extra information about the action
 */
export const logAction = (action, details = '') => {
  return async (req, res, next) => {
    try {
      if (req.user && req.user.id) {
        // Create a new audit log entry in the database
        await AuditLog.create({
          user: req.user.id,
          action,
          details,
        });
      }
    } catch (error) {
      console.error('Audit logging error:', error.message);
      // Don't block request even if logging fails
    }

    next();
  };
};
