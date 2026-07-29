import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { LayoutGrid, Package, ShoppingCart, Users, Star, AlertTriangle, Plus, UploadCloud, MessageSquare } from 'lucide-react';
import { ProductService } from '../../services/ProductService';
import { getOrders } from '../../services/OrderService';
import { ReviewService } from '../../services/ReviewService';
import { getCustomers } from '../../services/CustomerService';

const AdminDashboard = () => {
  const [data, setData] = useState({ products: [], orders: [], reviews: [], customers: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setData({
      products: ProductService.getProducts(),
      orders: getOrders(),
      reviews: ReviewService.getReviews(),
      customers: getCustomers()
    });
    setLoading(false);
  }, []);

  if (loading) return <div className="text-center p-10">Loading Dashboard...</div>;

  const totalRevenue = data.orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrders = data.orders.length;
  const totalProducts = data.products.length;
  const totalCustomers = data.customers.length;
  const pendingOrders = data.orders.filter(o => o.status === 'Pending').length;
  const deliveredOrders = data.orders.filter(o => o.status === 'Delivered').length;
  const totalReviews = data.reviews.length;
  const avgRating = (data.reviews.reduce((sum, r) => sum + r.rating, 0) / (totalReviews || 1)).toFixed(1);

  const lowStockProducts = data.products.filter(p => (p.stock || 0) < 10).slice(0, 5);
  const recentOrders = [...data.orders].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
  const recentReviews = [...data.reviews].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
  // Simple top selling: sort by quantity in products (needs stock adjustment logic if available, but assuming stock=sold for simplicity)
  const topSellingProducts = [...data.products].sort((a, b) => (b.sold || 0) - (a.sold || 0)).slice(0, 5);

  return (
    <div className="p-6 bg-[#FFF8E7] min-h-screen text-[#7B1E2B]">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Revenue', value: `₹${totalRevenue}`, icon: ShoppingCart },
          { label: 'Orders', value: totalOrders, icon: LayoutGrid },
          { label: 'Products', value: totalProducts, icon: Package },
          { label: 'Customers', value: totalCustomers, icon: Users },
          { label: 'Pending', value: pendingOrders, icon: AlertTriangle },
          { label: 'Delivered', value: deliveredOrders, icon: Package },
          { label: 'Reviews', value: totalReviews, icon: MessageSquare },
          { label: 'Avg Rating', value: avgRating, icon: Star },
        ].map((m, i) => (
          <motion.div key={i} whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-3xl shadow-md border-b-4 border-[#D4AF37]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500">{m.label}</span>
              <m.icon className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <p className="text-2xl font-bold">{m.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-3xl shadow-md">
          <h2 className="text-xl font-bold mb-4">Monthly Sales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data.orders}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="total" stroke="#7B1E2B" fill="#7B1E2B" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-md">
          <h2 className="text-xl font-bold mb-4">Order Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={[{name: 'Pending', value: pendingOrders}, {name: 'Delivered', value: deliveredOrders}]} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80}>
                <Cell fill="#D4AF37" />
                <Cell fill="#7B1E2B" />
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Activity Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {[
          { title: 'Recent Orders', data: recentOrders, render: (o) => `${o.id} - ${o.customer.name}` },
          { title: 'Low Stock Products', data: lowStockProducts, render: (p) => `${p.name} (${p.stock} left)` },
          { title: 'Top Selling', data: topSellingProducts, render: (p) => p.name },
          { title: 'Recent Reviews', data: recentReviews, render: (r) => `${r.customer}: ${r.rating}*` },
        ].map((list, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl shadow-md">
            <h2 className="text-xl font-bold mb-4">{list.title}</h2>
            {list.data.map((item, j) => (
              <div key={j} className="py-2 border-b">{list.render(item)}</div>
            ))}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Add Product', icon: Plus },
          { label: 'View Orders', icon: ShoppingCart },
          { label: 'Upload Image', icon: UploadCloud },
          { label: 'Manage Customers', icon: Users },
        ].map((a, i) => (
          <motion.button key={i} whileHover={{ scale: 1.05 }} className="bg-[#7B1E2B] text-white p-4 rounded-xl flex items-center justify-center gap-2">
            <a.icon className="w-5 h-5" />
            {a.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
