import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cartItems, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    houseNo: '',
    street: '',
    landmark: '',
    city: '',
    state: '',
    pinCode: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, send data to backend here.
    clearCart();
    navigate('/order-success');
  };

  const deliveryCharge = 0;
  const grandTotal = subtotal + deliveryCharge;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 bg-[#FFF8E7]">
      <h1 className="text-3xl font-bold text-[#7B1E2B] mb-8">Checkout</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-[#7B1E2B] mb-4">Customer Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" name="fullName" placeholder="Full Name" required onChange={handleChange} className="p-3 rounded-lg border border-gray-200" />
              <input type="tel" name="mobile" placeholder="Mobile Number" required onChange={handleChange} className="p-3 rounded-lg border border-gray-200" />
              <input type="email" name="email" placeholder="Email Address" required onChange={handleChange} className="p-3 rounded-lg border border-gray-200 col-span-1 sm:col-span-2" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-[#7B1E2B] mb-4">Delivery Address</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" name="houseNo" placeholder="House/Flat No." required onChange={handleChange} className="p-3 rounded-lg border border-gray-200" />
              <input type="text" name="street" placeholder="Street / Area" required onChange={handleChange} className="p-3 rounded-lg border border-gray-200" />
              <input type="text" name="landmark" placeholder="Landmark (Optional)" onChange={handleChange} className="p-3 rounded-lg border border-gray-200 col-span-1 sm:col-span-2" />
              <input type="text" name="city" placeholder="City" required onChange={handleChange} className="p-3 rounded-lg border border-gray-200" />
              <input type="text" name="state" placeholder="State" required onChange={handleChange} className="p-3 rounded-lg border border-gray-200" />
              <input type="text" name="pinCode" placeholder="PIN Code" required onChange={handleChange} className="p-3 rounded-lg border border-gray-200" />
            </div>
          </div>
        </div>

        {/* Order Summary & Payment */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold text-[#7B1E2B] mb-4">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.variant.weight}`} className="flex justify-between text-sm">
                  <span>{item.name} ({item.variant.weight}) x {item.quantity}</span>
                  <span className="font-medium text-[#7B1E2B]">₹{item.variant.price * item.quantity}</span>
                </div>
              ))}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between"><span>Subtotal</span><span className="font-medium">₹{subtotal}</span></div>
                <div className="flex justify-between"><span>Delivery</span><span className="font-medium text-green-600">FREE</span></div>
                <div className="flex justify-between font-bold text-lg"><span>Total</span><span className="text-[#7B1E2B]">₹{grandTotal}</span></div>
              </div>
            </div>
            
            <div className="bg-[#FFF8E7] p-4 rounded-lg mb-6 border border-[#D4AF37]/20">
              <label className="flex items-center gap-3 font-semibold text-[#7B1E2B]">
                <input type="radio" checked readOnly className="accent-[#7B1E2B]" /> Cash on Delivery (COD)
              </label>
              <p className="text-xs text-gray-500 mt-2">Currently we accept Cash on Delivery only.</p>
            </div>
            
            <button type="submit" className="w-full bg-[#7B1E2B] text-white py-3 rounded-lg font-bold hover:bg-[#5a1620] transition">
              Place Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
