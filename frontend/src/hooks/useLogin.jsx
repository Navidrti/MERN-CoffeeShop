import { useState } from 'react';
import api from '../lib/axios';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router';

export const useLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await api.post('/auth/login', { email, password });

      localStorage.setItem('user', JSON.stringify(res.data));
      dispatch({ type: 'LOGIN', payload: res.data });
      navigate('/admin');
    } catch (err) {
      if (err.response && err.response.data) {
        // Backend sent a structured error
        setError(err.response.data.message || err.response.data.error);
      } else {
        // Fallback
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
