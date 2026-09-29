import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  LayoutGrid,
  Package,
  ShoppingCart,
  Users,
  Star,
  AlertTriangle,
  Plus,
  UploadCloud,
  MessageSquare,
} from "lucide-react";

import { ProductService } from "../../services/ProductService";
import { getOrders } from "../../services/OrderService";
import { ReviewService } from "../../services/ReviewService";
import { getCustomers } from "../../services/CustomerService";

const AdminDashboard = () => {
  const [data, setData] = useState({
    products: [],
    orders: [],
    reviews: [],
    customers: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const [productsResult, ordersResult, reviewsResult, customersResult] =
          await Promise.all([
            Promise.resolve(ProductService.getProducts()),
            Promise.resolve(getOrders()),
            Promise.resolve(ReviewService.getReviews()),
            Promise.resolve(getCustomers()),
          ]);

        /*
          APIs/services may return:
          - array
          - { data: array }
          - { data: { data: array } }
          - Axios response
        */

        const extractArray = (result) => {
          if (Array.isArray(result)) {
            return result;
          }

          if (Array.isArray(result?.data)) {
            return result.data;
          }

          if (Array.isArray(result?.data?.data)) {
            return result.data.data;
          }

          if (Array.isArray(result?.products)) {
            return result.products;
          }

          if (Array.isArray(result?.orders)) {
            return result.orders;
          }

          if (Array.isArray(result?.reviews)) {
            return result.reviews;
          }

          if (Array.isArray(result?.customers)) {
            return result.customers;
          }

          return [];
        };

        const products = extractArray(productsResult);
        const orders = extractArray(ordersResult);
        const reviews = extractArray(reviewsResult);
        const customers = extractArray(customersResult);

        setData({
          products,
          orders,
          reviews,
          customers,
        });
      } catch (err) {
        console.error("Dashboard loading error:", err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF8E7] flex items-center justify-center">
        <p className="text-[#7B1E2B] font-semibold text-lg">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FFF8E7] p-8">
        <div className="bg-white rounded-3xl shadow-md p-8 text-center">
          <p className="text-red-600 font-semibold mb-4">{error}</p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="bg-[#7B1E2B] text-white px-6 py-3 rounded-xl"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // -----------------------------
  // Dashboard calculations
  // -----------------------------

  const getOrderTotal = (order) => {
    return Number(
      order?.total ??
        order?.totalAmount ??
        order?.grandTotal ??
        order?.amount ??
        0
    );
  };

  const getOrderDate = (order) => {
    return order?.createdAt || order?.date || order?.orderDate || null;
  };

  const getOrderStatus = (order) => {
    return String(order?.status || "").toLowerCase();
  };

  const totalRevenue = data.orders.reduce(
    (sum, order) => sum + getOrderTotal(order),
    0
  );

  const totalOrders = data.orders.length;

  const totalProducts = data.products.length;

  const totalCustomers = data.customers.length;

  const pendingOrders = data.orders.filter((order) => {
    const status = getOrderStatus(order);

    return (
      status === "pending" ||
      status === "processing" ||
      status === "confirmed"
    );
  }).length;

  const deliveredOrders = data.orders.filter((order) => {
    return getOrderStatus(order) === "delivered";
  }).length;

  const totalReviews = data.reviews.length;

  const ratingSum = data.reviews.reduce(
    (sum, review) => sum + Number(review?.rating || 0),
    0
  );

  const avgRating =
    totalReviews > 0 ? (ratingSum / totalReviews).toFixed(1) : "0.0";

  // -----------------------------
  // Low stock
  // -----------------------------

  const lowStockProducts = data.products
    .filter((product) => Number(product?.stock || 0) < 10)
    .slice(0, 5);

  // -----------------------------
  // Recent orders
  // -----------------------------

  const recentOrders = [...data.orders]
    .sort(
      (a, b) =>
        new Date(getOrderDate(b) || 0) -
        new Date(getOrderDate(a) || 0)
    )
    .slice(0, 5);

  // -----------------------------
  // Recent reviews
  // -----------------------------

  const recentReviews = [...data.reviews]
    .sort(
      (a, b) =>
        new Date(b?.createdAt || b?.date || 0) -
        new Date(a?.createdAt || a?.date || 0)
    )
    .slice(0, 5);

  // -----------------------------
  // Top selling products
  // -----------------------------

  const topSellingProducts = [...data.products]
    .sort(
      (a, b) =>
        Number(b?.sold || b?.salesCount || 0) -
        Number(a?.sold || a?.salesCount || 0)
    )
    .slice(0, 5);

  // -----------------------------
  // Monthly sales
  // -----------------------------

  const monthlySalesMap = {};

  data.orders.forEach((order) => {
    const date = getOrderDate(order);

    if (!date) return;

    const month = new Date(date).toLocaleString("en-IN", {
      month: "short",
    });

    if (!monthlySalesMap[month]) {
      monthlySalesMap[month] = 0;
    }

    monthlySalesMap[month] += getOrderTotal(order);
  });

  const salesData = Object.entries(monthlySalesMap).map(
    ([month, sales]) => ({
      month,
      sales,
    })
  );

  // -----------------------------
  // Order status chart
  // -----------------------------

  const statusData = [
    {
      name: "Pending",
      value: pendingOrders,
    },
    {
      name: "Delivered",
      value: deliveredOrders,
    },
  ];

  // -----------------------------
  // Customer name helper
  // -----------------------------

  const getCustomerName = (order) => {
    return (
      order?.user?.fullName ||
      order?.customer?.name ||
      order?.customer?.fullName ||
      order?.userName ||
      "Customer"
    );
  };

  return (
    <div className="p-6 bg-[#FFF8E7] min-h-screen text-[#7B1E2B]">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* ================= METRICS ================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: "Total Revenue",
            value: `₹${totalRevenue.toLocaleString("en-IN")}`,
            icon: ShoppingCart,
          },
          {
            label: "Orders",
            value: totalOrders,
            icon: LayoutGrid,
          },
          {
            label: "Products",
            value: totalProducts,
            icon: Package,
          },
          {
            label: "Customers",
            value: totalCustomers,
            icon: Users,
          },
          {
            label: "Pending",
            value: pendingOrders,
            icon: AlertTriangle,
          },
          {
            label: "Delivered",
            value: deliveredOrders,
            icon: Package,
          },
          {
            label: "Reviews",
            value: totalReviews,
            icon: MessageSquare,
          },
          {
            label: "Avg Rating",
            value: avgRating,
            icon: Star,
          },
        ].map((metric, index) => {
          const Icon = metric.icon;

          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-3xl shadow-md border-b-4 border-[#D4AF37]"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500">{metric.label}</span>

                <Icon className="w-5 h-5 text-[#D4AF37]" />
              </div>

              <p className="text-2xl font-bold">{metric.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* ================= CHARTS ================= */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Sales */}
        <div className="bg-white p-6 rounded-3xl shadow-md">
          <h2 className="text-xl font-bold mb-4">Monthly Sales</h2>

          {salesData.length === 0 ? (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              No sales data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip
                  formatter={(value) => [
                    `₹${Number(value).toLocaleString("en-IN")}`,
                    "Sales",
                  ]}
                />

                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#7B1E2B"
                  fill="#7B1E2B"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Order Status */}
        <div className="bg-white p-6 rounded-3xl shadow-md">
          <h2 className="text-xl font-bold mb-4">Order Status</h2>

          {totalOrders === 0 ? (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              No orders available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                >
                  <Cell fill="#D4AF37" />
                  <Cell fill="#7B1E2B" />
                </Pie>

                <Tooltip />

                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* ================= ACTIVITY LISTS ================= */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-3xl shadow-md">
          <h2 className="text-xl font-bold mb-4">Recent Orders</h2>

          {recentOrders.length === 0 ? (
            <p className="text-gray-500">No orders yet.</p>
          ) : (
            recentOrders.map((order, index) => (
              <div
                key={order?.id || index}
                className="py-3 border-b last:border-b-0"
              >
                <p className="font-semibold">
                  {order?.orderNumber || order?.id || `Order ${index + 1}`}
                </p>

                <p className="text-sm text-gray-500">
                  {getCustomerName(order)} • ₹
                  {getOrderTotal(order).toLocaleString("en-IN")}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Low Stock */}
        <div className="bg-white p-6 rounded-3xl shadow-md">
          <h2 className="text-xl font-bold mb-4">Low Stock Products</h2>

          {lowStockProducts.length === 0 ? (
            <p className="text-gray-500">No low-stock products.</p>
          ) : (
            lowStockProducts.map((product, index) => (
              <div
                key={product?.id || index}
                className="py-3 border-b last:border-b-0"
              >
                <p className="font-semibold">
                  {product?.name || "Unnamed Product"}
                </p>

                <p className="text-sm text-red-500">
                  {product?.stock || 0} left
                </p>
              </div>
            ))
          )}
        </div>

        {/* Top Selling */}
        <div className="bg-white p-6 rounded-3xl shadow-md">
          <h2 className="text-xl font-bold mb-4">Top Selling Products</h2>

          {topSellingProducts.length === 0 ? (
            <p className="text-gray-500">No product data available.</p>
          ) : (
            topSellingProducts.map((product, index) => (
              <div
                key={product?.id || index}
                className="py-3 border-b last:border-b-0"
              >
                <p className="font-semibold">
                  {product?.name || "Unnamed Product"}
                </p>

                <p className="text-sm text-gray-500">
                  Sold: {product?.sold || product?.salesCount || 0}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Recent Reviews */}
        <div className="bg-white p-6 rounded-3xl shadow-md">
          <h2 className="text-xl font-bold mb-4">Recent Reviews</h2>

          {recentReviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
          ) : (
            recentReviews.map((review, index) => (
              <div
                key={review?.id || index}
                className="py-3 border-b last:border-b-0"
              >
                <p className="font-semibold">
                  {review?.customer ||
                    review?.user?.fullName ||
                    "Customer"}
                </p>

                <p className="text-sm text-gray-500">
                  Rating: {review?.rating || 0} ⭐
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ================= QUICK ACTIONS ================= */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Add Product",
            icon: Plus,
          },
          {
            label: "View Orders",
            icon: ShoppingCart,
          },
          {
            label: "Upload Image",
            icon: UploadCloud,
          },
          {
            label: "Manage Customers",
            icon: Users,
          },
        ].map((action, index) => {
          const Icon = action.icon;

          return (
            <motion.button
              key={index}
              type="button"
              whileHover={{ scale: 1.05 }}
              className="bg-[#7B1E2B] text-white p-4 rounded-xl flex items-center justify-center gap-2"
            >
              <Icon className="w-5 h-5" />

              {action.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboard;