import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Toaster } from 'react-hot-toast';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { CoffeeContextProvider } from './context/CoffeeContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <CoffeeContextProvider>
        <App />
        <Toaster />
      </CoffeeContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
