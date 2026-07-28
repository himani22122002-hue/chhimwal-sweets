import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout'; // Import AdminLayout
import Home from '../pages/Home';
// ... other imports

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import Products from '../pages/admin/Products';

// ... (other admin page imports)

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        {/* ... other customer routes */}
      </Route>

      {/* Admin Routes */}
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<Products />} />
      </Route>

      <Route path="login" element={<Login />} />
      {/* ... */}
    </Routes>
  );
}