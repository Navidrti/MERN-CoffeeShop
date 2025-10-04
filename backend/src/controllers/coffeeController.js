// src/controllers/coffeeController.js
import Coffee from '../models/Coffee.js';
import fs from 'fs';

// Get one coffee by ID (with category populated)
export const getCoffee = async (req, res) => {
  const { id } = req.params;
  try {
    const coffee = await Coffee.findById(id).populate('category', 'name');
    if (!coffee) return res.status(404).json({ message: 'Coffee not found' });

    res.status(200).json(coffee);
  } catch (error) {
    console.error('Error in getCoffee controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create new coffee
export const createCoffee = async (req, res) => {
  const { name, price, description, category } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const coffee = new Coffee({
      name,
      price,
      description,
      image,
      category,
    });

    const savedCoffee = await coffee.save();
    await savedCoffee.populate('category');

    res.status(201).json(savedCoffee);
  } catch (error) {
    console.error('Error in createCoffee controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update coffee by ID
export const updateCoffee = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, category } = req.body;

  try {
    const coffee = await Coffee.findById(id);
    if (!coffee) return res.status(404).json({ message: 'Coffee not found' });

    if (req.file && coffee.image) {
      fs.unlink(`.${coffee.image}`, (err) => {
        if (err) console.error('Error deleting old image:', err);
      });
    }

    const updatedCoffee = await Coffee.findByIdAndUpdate(
      id,
      {
        name,
        price,
        description,
        category,
        image: req.file ? `/uploads/${req.file.filename}` : coffee.image,
      },
      { new: true }
    ).populate('category');

    res.status(200).json(updatedCoffee);
  } catch (error) {
    console.error('Error in updateCoffee controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete coffee
export const deleteCoffee = async (req, res) => {
  const { id } = req.params;

  try {
    const coffee = await Coffee.findByIdAndDelete(id);
    if (!coffee) return res.status(404).json({ message: 'Coffee not found' });

    if (coffee.image) {
      fs.unlink(`.${coffee.image}`, (err) => {
        if (err) console.error('Error deleting image:', err);
      });
    }

    res.status(200).json({ message: 'Coffee deleted successfully' });
  } catch (error) {
    console.error('Error in deleteCoffee controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
