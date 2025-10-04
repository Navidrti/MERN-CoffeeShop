import { BrowserRouter, Route, Routes } from 'react-router';

import HomePage from './pages/HomePage';
import Login from './pages/Login';
import DashboardLayout from './components/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import ProtectedRoute from './components/ProtectedRoute';
import AddAdminPage from './pages/AddAdminPage';
import AddCategoryPage from './pages/AddCategoryPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="add-admin" element={<AddAdminPage />} />
            <Route path="add-category" element={<AddCategoryPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
