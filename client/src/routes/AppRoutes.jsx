import React from "react";
import { Routes, Route } from "react-router-dom";

// Layouts
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
import Gallery from "../pages/Gallery";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import Wishlist from "../pages/Wishlist";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminCustomers from "../pages/admin/Customers";
import AdminGallery from "../pages/admin/Gallery";
import AdminOrders from "../pages/admin/Orders";
import ProductForm from "../pages/admin/ProductForm";
import AdminProducts from "../pages/admin/Products";
import AdminReviews from "../pages/admin/Reviews";
import AdminSettings from "../pages/admin/Settings";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ================= CUSTOMER ROUTES ================= */}

      <Route element={<MainLayout />}>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Products */}
        <Route path="products" element={<Products />} />

        {/* Category Products */}
        <Route
          path="products/category/:category"
          element={<Products />}
        />

        {/* Product Details */}
        <Route
          path="products/:id"
          element={<ProductDetails />}
        />

        {/* Cart & Checkout */}
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />

        {/* Order */}
        <Route
          path="order-success"
          element={<OrderSuccess />}
        />

        <Route
          path="orders/:id"
          element={<OrderDetails />}
        />

        {/* Other Pages */}
        <Route path="about" element={<About />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="contact" element={<Contact />} />

        {/* Authentication */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path="forgot-password"
          element={<ForgotPassword />}
        />

        {/* User */}
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="profile" element={<Profile />} />

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* ================= ADMIN ROUTES ================= */}

      <Route path="/admin" element={<AdminLayout />}>
        {/* Dashboard */}
        <Route
          index
          element={<AdminDashboard />}
        />

        <Route
          path="dashboard"
          element={<AdminDashboard />}
        />

        {/* Products */}
        <Route
          path="products"
          element={<AdminProducts />}
        />

        {/* Add Product */}
        <Route
          path="products/add"
          element={<ProductForm />}
        />

        {/* Edit Product */}
        <Route
          path="products/edit/:id"
          element={<ProductForm />}
        />

        {/* Orders */}
        <Route
          path="orders"
          element={<AdminOrders />}
        />

        {/* Gallery */}
        <Route
          path="gallery"
          element={<AdminGallery />}
        />

        {/* Reviews */}
        <Route
          path="reviews"
          element={<AdminReviews />}
        />

        {/* Customers */}
        <Route
          path="customers"
          element={<AdminCustomers />}
        />

        {/* Settings */}
        <Route
          path="settings"
          element={<AdminSettings />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;