// Load necessary packages
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Import custom modules
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/task.routes.js'; // ✅ NEW: Task route added
import auditRoutes from './routes/audit.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';






dotenv.config(); // Load environment variables from .env

const app = express();

// Connect to MongoDB using Mongoose
connectDB();

// Apply global middlewares
app.use(cors());             // Allow requests from frontend domains (like Vercel)
app.use(express.json());     // Parse JSON request bodies

// Route definitions
app.use('/api/auth', authRoutes);   // All authentication routes: /login, /signup
app.use('/api/tasks', taskRoutes);  // ✅ All task routes: CRUD, filtering, etc.

app.use('/api/audit', auditRoutes);

app.use('/api/analytics', analyticsRoutes);

// Root route (for health check)
app.get('/', (req, res) => {
  res.send('🚀 API is running...');
});

// Start Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
