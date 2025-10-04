import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useCoffeeContext } from './useCoffeeContext';
import api from '../lib/axios';
import toast from 'react-hot-toast';

export const useCoffeeActions = (setCoffeeCount) => {
  const { admin } = useAuthContext();
  const { dispatch } = useCoffeeContext();

  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (coffee) => {
    setSelectedCoffee(coffee);
    setIsModalOpen(true);
  };

  const handleDelete = async (coffee) => {
    if (!window.confirm(`Delete ${coffee.name}?`)) return;

    try {
      await api.delete(`/coffees/${coffee._id}`, {
        headers: { Authorization: `Bearer ${admin.token}` },
      });

      dispatch({ type: 'DELETE_COFFEE', payload: coffee._id });
      setCoffeeCount((prev) => prev - 1);
      toast.success('Coffee deleted successfully');
    } catch (error) {
      toast.error('Failed to delete coffee');
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCoffee(null);
  };

  const handleSave = async (id, formData) => {
    try {
      const res = await api.put(`/coffees/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${admin.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      dispatch({ type: 'UPDATE_COFFEE', payload: res.data });
      toast.success('Coffee updated successfully');
      handleModalClose();
    } catch (error) {
      toast.error('Failed to update coffee');
    }
  };

  return {
    selectedCoffee,
    isModalOpen,
    handleEdit,
    handleDelete,
    handleModalClose,
    handleSave,
  };
};
