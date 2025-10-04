import { useState, useEffect, useRef } from 'react';
import { useAuthContext } from './useAuthContext';
import { useCoffeeContext } from './useCoffeeContext';
import api from '../lib/axios';
import toast from 'react-hot-toast';

export const useCoffeeForm = (setCoffeeCount) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const fileInputRef = useRef();

  const { admin } = useAuthContext();
  const { dispatch } = useCoffeeContext();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories', {
          headers: { Authorization: `Bearer ${admin.token}` },
        });
        setCategories(res.data);
      } catch {
        toast.error('Failed to load categories');
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('category', category);
      if (image) formData.append('image', image);

      const res = await api.post('/coffees', formData, {
        headers: {
          Authorization: `Bearer ${admin.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      dispatch({ type: 'ADD_COFFEE', payload: res.data });

      setName('');
      setPrice('');
      setDescription('');
      setImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // reset file input
      }
      setCategory('');
      setCoffeeCount((prev) => prev + 1);

      toast.success('Coffee added successfully!');
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Failed to add coffee.');
    }
  };

  return {
    name,
    setName,
    price,
    setPrice,
    description,
    setDescription,
    image,
    setImage,
    category,
    setCategory,
    categories,
    handleSubmit,
    fileInputRef,
  };
};
