// Dashboard/hooks/useDashboardData.js
import { useState, useEffect } from 'react';
import api from '../lib/axios';
import { useAuthContext } from './useAuthContext';
import { useCoffeeContext } from './useCoffeeContext';
import toast from 'react-hot-toast';

export const useDashboardData = () => {
  const { admin } = useAuthContext();
  const { dispatch } = useCoffeeContext();

  const [coffeeCount, setCoffeeCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [loadingCounts, setLoadingCounts] = useState(true);
  const [loadingCoffees, setLoadingCoffees] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coffeesRes, adminsRes] = await Promise.all([
          api.get('/coffees'),
          api.get('/admins/count', {
            headers: { Authorization: `Bearer ${admin.token}` },
          }),
        ]);

        dispatch({ type: 'SET_COFFEES', payload: coffeesRes.data });
        setCoffeeCount(coffeesRes.data.length);
        setAdminCount(adminsRes.data.count);
      } catch (error) {
        toast.error('Error fetching dashboard data');
      } finally {
        setLoadingCounts(false);
        setLoadingCoffees(false);
      }
    };

    if (admin?.token) {
      fetchData();
    }
  }, [admin, dispatch]);

  return {
    coffeeCount,
    adminCount,
    loadingCounts,
    loadingCoffees,
    setCoffeeCount,
  };
};
