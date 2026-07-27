import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const CartSummary = () => {
  const { subtotal, clearCart } = useCart();
  const deliveryCharge = 0; // Free delivery for now
  const grandTotal = subtotal + deliveryCharge;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-[#7B1E2B] mb-4">Order Summary</h2>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-[#7B1E2B]">₹{subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Delivery</span>
          <span className="font-medium text-green-600">
            {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
          </span>
        </div>
        <div className="border-t pt-3 mt-3 flex justify-between font-bold text-lg">
          <span className="text-[#7B1E2B]">Total</span>
          <span className="text-[#7B1E2B]">₹{grandTotal}</span>
        </div>
      </div>
      <div className="mt-6 space-y-3">
        <Link 
          to="/checkout"
          className="block w-full text-center bg-[#7B1E2B] text-white py-3 rounded-lg font-semibold hover:bg-[#601722] transition"
        >
          Proceed to Checkout
        </Link>
        <button
          onClick={clearCart}
          className="w-full bg-gray-100 text-[#7B1E2B] py-2 rounded-lg font-medium hover:bg-gray-200 transition"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
