// src/controllers/publicCoffeeController.js
import Coffee from '../models/Coffee.js';

export const getCoffees = async (req, res) => {
  try {
    const coffees = await Coffee.find()
      .populate('category')
      .sort({ createdAt: -1 });

    res.status(200).json(coffees);
  } catch (error) {
    console.error('Error in getCoffees controller', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
