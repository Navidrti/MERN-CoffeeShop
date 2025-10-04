import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import { connectDB } from './src/config/db.js';

import authRoutes from './src/routes/authRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';
import coffeeRoutes from './src/routes/coffeeRoutes.js';
import categoryRoutes from './src/routes/categoryRoutes.js';

import { createDefaultAdmin } from './src/controllers/authController.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
  app.use(cors({ origin: 'http://localhost:5173' }));
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/coffees', coffeeRoutes);
app.use('/api/categories', categoryRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
  });
}

// DB + Server start
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
      createDefaultAdmin(); // Create default admin on startup
    });
  })
  .catch((err) => console.error('❌ DB connection error:', err));
