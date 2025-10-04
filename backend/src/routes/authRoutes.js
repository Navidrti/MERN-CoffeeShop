// src/routes/authRoutes.js
import express from 'express';
import { createDefaultAdmin, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', createDefaultAdmin);
router.post('/login', login);

export default router;
