import jwt from 'jsonwebtoken';

// Generate JWT token including userId and role
const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

export default generateToken;
