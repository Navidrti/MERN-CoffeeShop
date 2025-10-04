// src/controllers/adminController.js
import Admin from '../models/Admin.js';
import bcrypt from 'bcrypt';

// Get count of all admins
export const getAdminCount = async (req, res) => {
  try {
    const count = await Admin.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: 'Failed to count admins' });
  }
};

// Get all admins (excluding passwords)
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({}, { password: 0 });
    const defaultEmail = process.env.DEFAULT_EMAIL;

    const withRoles = admins.map((admin) => ({
      ...admin.toObject(),
      isDefaultAdmin: admin.email === defaultEmail,
    }));

    res.status(200).json(withRoles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch admins' });
  }
};

// Create a new admin
export const createAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ email, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin created' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create admin' });
  }
};

// Delete an admin (not allowed for default admin)
export const deleteAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await Admin.findById(id);
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    if (admin.email === process.env.DEFAULT_EMAIL) {
      return res
        .status(403)
        .json({ message: 'Default admin cannot be deleted' });
    }

    await Admin.findByIdAndDelete(id);
    res.status(200).json({ message: 'Admin deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete admin' });
  }
};

// Update admin (only allowed by default admin)
export const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;

  try {
    const requestingAdmin = await Admin.findById(req.user._id);
    if (requestingAdmin.email !== process.env.DEFAULT_EMAIL) {
      return res
        .status(403)
        .json({ message: 'Only default admin can update admins' });
    }

    const updateFields = { email };
    if (password) {
      updateFields.password = await bcrypt.hash(password, 10);
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(id, updateFields, {
      new: true,
    });
    if (!updatedAdmin)
      return res.status(404).json({ message: 'Admin not found' });

    res.status(200).json(updatedAdmin);
  } catch (error) {
    console.error('Error updating admin:', error);
    res.status(500).json({ message: 'Failed to update admin' });
  }
};
