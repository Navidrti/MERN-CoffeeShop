// src/routes/coffeeRoutes.js
import express from 'express';
import {
  getCoffee,
  createCoffee,
  updateCoffee,
  deleteCoffee,
} from '../controllers/coffeeController.js';
import { getCoffees } from '../controllers/publicCoffeeController.js';
import { upload } from '../middleware/upload.js';
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router();

// Public (homepage)
router.get('/', getCoffees);

// Admin operations
router.get('/:id', requireAuth, getCoffee);
router.post('/', requireAuth, upload.single('image'), createCoffee);
router.put('/:id', requireAuth, upload.single('image'), updateCoffee);
router.delete('/:id', requireAuth, deleteCoffee);

export default router;
