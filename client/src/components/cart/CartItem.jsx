import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrease = () => {
    updateQuantity(item.id, item.variant.weight, item.quantity + 1);
  };

  const handleDecrease = () => {
    updateQuantity(item.id, item.variant.weight, item.quantity - 1);
  };

  const handleRemove = () => {
    removeFromCart(item.id, item.variant.weight);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex items-center gap-4 p-4 border-b border-gray-200"
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-lg text-[#7B1E2B]">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.variant.weight}</p>
        <p className="font-medium text-[#7B1E2B]">₹{item.variant.price}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={handleDecrease}
          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          <Minus size={16} />
        </button>
        <span className="w-8 text-center font-medium">{item.quantity}</span>
        <button
          onClick={handleIncrease}
          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          <Plus size={16} />
        </button>
      </div>
      <div className="text-right w-20">
        <p className="font-semibold text-[#7B1E2B]">₹{item.variant.price * item.quantity}</p>
        <button
          onClick={handleRemove}
          className="text-red-500 hover:text-red-700 mt-2"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default CartItem;
