import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      >
        <motion.div 
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="bg-[#FFF8E7] rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-[#7B1E2B]">Order Details - {order.id}</h2>
            <button onClick={onClose} className="text-[#7B1E2B] hover:text-[#D4AF37]">✕</button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm mb-6">
            <div>
              <h3 className="font-semibold text-[#7B1E2B]">Customer</h3>
              <p>{order.customer.name}</p>
              <p>{order.customer.phone}</p>
              <p className="text-gray-600">{order.customer.address}</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#7B1E2B]">Summary</h3>
              <p>Payment: {order.paymentMethod}</p>
              <p>Date: {order.date}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-[#7B1E2B] mb-2">Items</h3>
            {order.products.map(p => (
              <div key={p.id} className="flex justify-between py-1 border-b border-[#D4AF37]/20">
                <span>{p.qty}x {p.name}</span>
                <span>₹{p.price * p.qty}</span>
              </div>
            ))}
            <div className="mt-2 text-right font-bold">
              <p>Subtotal: ₹{order.subtotal}</p>
              <p>Delivery Fee: ₹{order.deliveryFee}</p>
              <p className="text-lg">Total: ₹{order.total}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OrderDetailsModal;
