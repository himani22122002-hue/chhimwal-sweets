import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Trash2, Edit } from 'lucide-react';

const CustomerTable = ({ customers, onView, onStatusChange, onDelete, selectedCustomers, toggleSelectCustomer, toggleSelectAll }) => {
  return (
    <div className="overflow-x-auto bg-[#FFF8E7] rounded-lg shadow">
      <table className="w-full text-left">
        <thead className="bg-[#7B1E2B] text-[#FFF8E7]">
          <tr>
            <th className="p-3"><input type="checkbox" onChange={toggleSelectAll} checked={selectedCustomers.length === customers.length && customers.length > 0} /></th>
            <th className="p-3">Photo</th>
            <th className="p-3">Name</th>
            <th className="p-3">Mobile</th>
            <th className="p-3">Email</th>
            <th className="p-3">Orders</th>
            <th className="p-3">Spent</th>
            <th className="p-3">Date</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody className="text-[#7B1E2B]">
          {customers.map((c) => (
            <motion.tr key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-b border-[#D4AF37]/20 hover:bg-[#D4AF37]/10">
              <td className="p-3"><input type="checkbox" checked={selectedCustomers.includes(c.id)} onChange={() => toggleSelectCustomer(c.id)} /></td>
              <td className="p-3"><div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#FFF8E7] font-bold">{c.name[0]}</div></td>
              <td className="p-3 font-medium">{c.name}</td>
              <td className="p-3">{c.mobile}</td>
              <td className="p-3">{c.email}</td>
              <td className="p-3">{c.orders}</td>
              <td className="p-3">₹{c.spent}</td>
              <td className="p-3">{c.date}</td>
              <td className="p-3">
                <span className={`px-2 py-1 rounded text-xs ${c.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {c.status}
                </span>
              </td>
              <td className="p-3 flex gap-2">
                <button onClick={() => onView(c)} className="text-[#D4AF37] hover:text-[#7B1E2B]"><Eye size={18} /></button>
                <button onClick={() => onStatusChange(c.id, c.status === 'Active' ? 'Blocked' : 'Active')} className="text-[#7B1E2B] hover:text-[#D4AF37]"><Edit size={18} /></button>
                <button onClick={() => onDelete(c.id)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
