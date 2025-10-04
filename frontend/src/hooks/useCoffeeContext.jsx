import { useContext } from 'react';
import { CoffeeContext } from '../context/CoffeeContext';

export const useCoffeeContext = () => {
  const context = useContext(CoffeeContext);

  if (!context) {
    throw Error(
      'useCoffeeContext must be used inside an CoffeeContextProvider'
    );
  }
  return context;
};
