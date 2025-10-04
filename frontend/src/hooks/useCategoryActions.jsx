import { useState, useCallback, useEffect } from 'react';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import { useAuthContext } from './useAuthContext';

export const useCategoryActions = () => {
  const { admin } = useAuthContext();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/categories', {
        headers: { Authorization: `Bearer ${admin.token}` },
      });
      setCategories(res.data);
    } catch {
      toast.error('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  }, [admin.token]);

  const addCategory = useCallback(
    async (name, reset) => {
      try {
        await api.post(
          '/categories',
          { name },
          { headers: { Authorization: `Bearer ${admin.token}` } }
        );
        toast.success('Category added');
        reset();
        fetchCategories();
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to add category');
      }
    },
    [admin.token, fetchCategories]
  );

  const deleteCategory = useCallback(
    async (id) => {
      try {
        await api.delete(`/categories/${id}`, {
          headers: { Authorization: `Bearer ${admin.token}` },
        });
        toast.success('Category deleted');
        fetchCategories();
      } catch (err) {
        toast.error(err.response?.data?.message || 'Delete failed');
      }
    },
    [admin.token, fetchCategories]
  );

  const updateCategory = useCallback(
    async (id, name, close) => {
      try {
        await api.put(
          `/categories/${id}`,
          { name },
          { headers: { Authorization: `Bearer ${admin.token}` } }
        );
        toast.success('Category updated');
        close();
        fetchCategories();
      } catch (err) {
        toast.error(err.response?.data?.message || 'Update failed');
      }
    },
    [admin.token, fetchCategories]
  );

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    editingCategory,
    setEditingCategory,
    fetchCategories,
    addCategory,
    deleteCategory,
    updateCategory,
  };
};
