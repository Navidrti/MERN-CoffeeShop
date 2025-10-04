// src/routes/categoryRoutes.js
import express from 'express';
import {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router();

router.get('/', getAllCategories);
router.post('/', requireAuth, createCategory);
router.put('/:id', requireAuth, updateCategory);
router.delete('/:id', requireAuth, deleteCategory);

export default router;
