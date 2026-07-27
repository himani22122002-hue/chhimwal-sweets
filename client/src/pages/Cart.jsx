import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import EmptyCart from '../components/cart/EmptyCart';

const Cart = () => {
  const { cartItems } = useCart();

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#7B1E2B] mb-8">Your Shopping Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <AnimatePresence>
              {cartItems.map((item) => (
                <CartItem
                  key={`${item.id}-${item.variant.weight}`}
                  item={item}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="md:col-span-1">
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default Cart;
