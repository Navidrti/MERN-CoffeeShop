import { useState, useEffect, useCallback } from 'react';
import api from '../lib/axios';
import { useAuthContext } from './useAuthContext';
import toast from 'react-hot-toast';

export const useAdminManager = () => {
  const { admin } = useAuthContext();
  const defaultEmail = import.meta.env.VITE_DEFAULT_EMAIL;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingAdmin, setEditingAdmin] = useState(null);
  const [editEmail, setEditEmail] = useState('');
  const [editPassword, setEditPassword] = useState('');

  const fetchAdmins = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/admins', {
        headers: { Authorization: `Bearer ${admin.token}` },
      });
      setAdmins(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch admins');
    } finally {
      setLoading(false);
    }
  }, [admin.token]);

  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    try {
      await api.post(
        '/admins',
        { email, password },
        { headers: { Authorization: `Bearer ${admin.token}` } }
      );
      toast.success('Admin added successfully');
      setEmail('');
      setPassword('');
      fetchAdmins();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add admin');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admins/${id}`, {
        headers: { Authorization: `Bearer ${admin.token}` },
      });
      toast.success('Admin deleted');
      fetchAdmins();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Cannot delete admin');
    }
  };

  const handleEdit = (admin) => {
    setEditingAdmin(admin);
    setEditEmail(admin.email);
    setEditPassword('');
  };

  const handleUpdateAdmin = async (e) => {
    e.preventDefault();
    try {
      await api.put(
        `/admins/${editingAdmin._id}`,
        { email: editEmail, password: editPassword },
        { headers: { Authorization: `Bearer ${admin.token}` } }
      );
      toast.success('Admin updated successfully');
      setEditingAdmin(null);
      setEditEmail('');
      setEditPassword('');
      fetchAdmins();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    editEmail,
    setEditEmail,
    editPassword,
    setEditPassword,
    admins,
    loading,
    editingAdmin,
    setEditingAdmin,
    defaultEmail,
    handleAddAdmin,
    handleDelete,
    handleEdit,
    handleUpdateAdmin,
  };
};
