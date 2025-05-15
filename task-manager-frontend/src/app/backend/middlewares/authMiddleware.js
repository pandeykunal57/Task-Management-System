import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

/**
 * Middleware to authenticate a user using JWT.
 * If token is valid, user data is attached to req.user
 */
export const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // JWT payload contains userId and role now
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by decoded.userId
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid user' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('JWT verification failed:', error.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};

/**
 * Middleware to restrict access based on user role
 * @param  {...string} allowedRoles - e.g. ('admin', 'manager')
 */
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied: insufficient role' });
    }
    next();
  };
};
