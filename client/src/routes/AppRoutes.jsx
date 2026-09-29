import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

// Customer Pages
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import OrderSuccess from "../pages/OrderSuccess";
import OrderDetails from "../pages/OrderDetails";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Gallery from "../pages/Gallery";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import Wishlist from "../pages/Wishlist";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProducts from "../pages/admin/Products";
import ProductForm from "../pages/admin/ProductForm";
import Orders from "../pages/admin/Orders";
import AdminGallery from "../pages/admin/Gallery";
import Reviews from "../pages/admin/Reviews";
import Customers from "../pages/admin/Customers";
import Settings from "../pages/admin/Settings";

export default function AppRoutes() {
  return (
    <Routes>

      {/* ================= CUSTOMER ROUTES ================= */}
      <Route path="/" element={<MainLayout />}>

        <Route index element={<Home />} />

        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetails />} />

        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="order-success" element={<OrderSuccess />} />

        {/* Order Details */}
        <Route path="orders/:id" element={<OrderDetails />} />

        <Route path="about" element={<About />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="contact" element={<Contact />} />

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />

        <Route path="wishlist" element={<Wishlist />} />

        {/* User Profile */}
        <Route path="profile" element={<Profile />} />

        {/* Customer 404 */}
        <Route path="*" element={<NotFound />} />

      </Route>


      {/* ================= ADMIN ROUTES ================= */}
      <Route path="/admin" element={<AdminLayout />}>

        <Route index element={<AdminDashboard />} />

        <Route path="products" element={<AdminProducts />} />
        <Route path="products/add" element={<ProductForm />} />
        <Route path="products/edit/:id" element={<ProductForm />} />

        <Route path="orders" element={<Orders />} />

        <Route path="gallery" element={<AdminGallery />} />

        <Route path="reviews" element={<Reviews />} />

        <Route path="customers" element={<Customers />} />

        <Route path="settings" element={<Settings />} />

      </Route>

    </Routes>
  );
}