// src/routes/adminRoutes.js
import express from 'express';
import {
  getAdminCount,
  getAllAdmins,
  createAdmin,
  deleteAdmin,
  updateAdmin,
} from '../controllers/adminController.js';
import requireAuth from '../middleware/requireAuth.js';
import requireDefaultAdmin from '../middleware/requireDefaultAdmin.js';

const router = express.Router();

// 📊 Stats
router.get('/count', requireAuth, getAdminCount);

// 👤 Admin management (only by default admin)
router.get('/', requireAuth, requireDefaultAdmin, getAllAdmins);
router.post('/', requireAuth, requireDefaultAdmin, createAdmin);
router.delete('/:id', requireAuth, requireDefaultAdmin, deleteAdmin);
router.put('/:id', requireAuth, requireDefaultAdmin, updateAdmin);

export default router;
