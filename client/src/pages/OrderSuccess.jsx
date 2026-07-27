import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ShoppingBag, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 bg-[#FFF8E7]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
      >
        <div className="flex justify-center mb-6">
          <CheckCircle size={80} className="text-[#D4AF37]" />
        </div>
        <h1 className="text-3xl font-bold text-[#7B1E2B] mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for shopping with Chhimwal Sweets. <br />
          Your order has been confirmed and is being processed.
        </p>
        
        <div className="bg-[#FFF8E7] p-4 rounded-xl mb-8 border border-[#7B1E2B]/10">
          <p className="font-semibold text-[#7B1E2B]">Payment Method: Cash on Delivery (COD)</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/products"
            className="flex items-center gap-2 bg-[#7B1E2B] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#5a1620] transition"
          >
            <ShoppingBag size={18} /> Continue Shopping
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 bg-[#D4AF37] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#b8952b] transition"
          >
            <Home size={18} /> Go to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
