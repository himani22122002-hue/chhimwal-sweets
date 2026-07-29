import React from 'react';
import { motion } from 'framer-motion';

const STATUS_COLORS = {
  'Pending': 'bg-yellow-100 text-yellow-800',
  'Confirmed': 'bg-blue-100 text-blue-800',
  'Preparing': 'bg-purple-100 text-purple-800',
  'Out for Delivery': 'bg-orange-100 text-orange-800',
  'Delivered': 'bg-green-100 text-green-800',
  'Cancelled': 'bg-red-100 text-red-800',
};

const OrderTable = ({ orders, onView, onStatusChange, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-[#D4AF37]">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase bg-[#7B1E2B] text-[#FFF8E7]">
          <tr>
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3">Items</th>
            <th className="px-4 py-3">Total</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-[#FFF8E7]">
          {orders.map((order) => (
            <motion.tr 
              key={order.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-b border-[#D4AF37]/20 hover:bg-[#D4AF37]/10"
            >
              <td className="px-4 py-3 font-medium text-[#7B1E2B]">{order.id}</td>
              <td className="px-4 py-3">{order.customer.name}</td>
              <td className="px-4 py-3">{order.customer.phone}</td>
              <td className="px-4 py-3">{order.products.length}</td>
              <td className="px-4 py-3">₹{order.total}</td>
              <td className="px-4 py-3">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[order.status] || 'bg-gray-100'}`}>
                  {order.status}
                </span>
              </td>
              <td className="px-4 py-3 flex gap-2">
                <button onClick={() => onView(order)} className="text-[#7B1E2B] hover:text-[#D4AF37]">View</button>
                <select 
                  value={order.status} 
                  onChange={(e) => onStatusChange(order.id, e.target.value)}
                  className="text-xs bg-transparent border-none focus:ring-0"
                >
                  {Object.keys(STATUS_COLORS).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <button onClick={() => onDelete(order.id)} className="text-red-600 hover:text-red-800">Delete</button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
