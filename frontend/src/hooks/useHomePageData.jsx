import { useEffect, useState } from 'react';
import api from '../lib/axios';
import { useCoffeeContext } from './useCoffeeContext';
import toast from 'react-hot-toast';

export const useHomePageData = () => {
  const { dispatch } = useCoffeeContext();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coffeeRes, categoryRes] = await Promise.all([
          api.get('/coffees'),
          api.get('/categories'),
        ]);
        dispatch({ type: 'SET_COFFEES', payload: coffeeRes.data });
        setCategories(categoryRes.data);
      } catch (error) {
        toast.error('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  return { categories, loading };
};
