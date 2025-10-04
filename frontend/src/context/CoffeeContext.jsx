import { createContext, useReducer } from 'react';

export const CoffeeContext = createContext();

export const coffeeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_COFFEES':
      return { coffees: action.payload };
    case 'ADD_COFFEE':
      return { coffees: [action.payload, ...state.coffees] };
    case 'UPDATE_COFFEE':
      return {
        coffees: state.coffees.map((c) =>
          c._id === action.payload._id ? action.payload : c
        ),
      };
    case 'DELETE_COFFEE':
      return {
        coffees: state.coffees.filter((c) => c._id !== action.payload),
      };
    default:
      return state;
  }
};

export const CoffeeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(coffeeReducer, {
    coffees: [],
  });

  return (
    <CoffeeContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CoffeeContext.Provider>
  );
};
