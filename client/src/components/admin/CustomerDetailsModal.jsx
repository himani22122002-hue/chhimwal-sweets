import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const CustomerDetailsModal = ({ customer, onClose }) => {
  if (!customer) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-[#FFF8E7] p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-[#7B1E2B]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-[#7B1E2B]">Customer Details: {customer.name}</h2>
            <button onClick={onClose} className="text-[#7B1E2B]"><X size={24} /></button>
          </div>
          <div className="space-y-4 text-[#7B1E2B]">
            <p><strong>Mobile:</strong> {customer.mobile}</p>
            <p><strong>Email:</strong> {customer.email}</p>
            <p><strong>Total Orders:</strong> {customer.orders}</p>
            <p><strong>Total Spent:</strong> ₹{customer.spent}</p>
            <div className="border-t border-[#D4AF37] pt-4">
              <h3 className="font-bold">Addresses & Wishlist (Demo content)</h3>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CustomerDetailsModal;
