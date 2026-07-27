import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="bg-gray-100 p-6 rounded-full mb-6">
        <ShoppingBag size={64} className="text-[#D4AF37]" />
      </div>
      <h2 className="text-2xl font-bold text-[#7B1E2B] mb-2">Your cart is empty</h2>
      <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
      <Link
        to="/products"
        className="bg-[#7B1E2B] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#601722] transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default EmptyCart;
