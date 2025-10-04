// src/controllers/authController.js
import Admin from '../models/Admin.js';
import bcrypt from 'bcrypt';
import { createToken } from '../utils/token.js';

// Create default admin on startup
export const createDefaultAdmin = async (req, res) => {
  const defaultEmail = process.env.DEFAULT_EMAIL;
  const defaultPassword = process.env.DEFAULT_PASSWORD;

  try {
    const existingAdmin = await Admin.findOne({ email: defaultEmail });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);
      const admin = new Admin({
        email: defaultEmail,
        password: hashedPassword,
      });
      await admin.save();

      console.log('✅ Default admin created');
    } else {
      console.log('✅ Admin already exists');
    }
  } catch (error) {
    console.error('Error creating default admin:', error.message);
    res.status(500).json({ error: 'Failed to create default admin' });
  }
};

// Admin login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: 'Invalid email' });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(401).json({ message: 'Invalid password' });

    const token = createToken(admin._id);
    res.status(200).json({ email, token });
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).json({ error: 'Login failed' });
  }
};
